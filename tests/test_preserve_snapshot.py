import csv
import io
import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from build_registry import main


class PreservePreviousRegistryTests(unittest.TestCase):
    def test_total_source_outage_keeps_previous_snapshot(self):
        with tempfile.TemporaryDirectory() as temp:
            target = Path(temp) / 'registry.json'
            previous = {'companies': [{'name': 'Older Norwegian fishery'}],
                        'vessels': [{'ship': 'Older Vessel'}]}
            target.write_text(json.dumps(previous), encoding='utf-8')
            code = main(['--no-network', '--out', str(target)])
            result = json.loads(target.read_text(encoding='utf-8'))
            self.assertEqual(code, 0)
            self.assertEqual(result['status'], 'stale')
            self.assertEqual(result['source_status']['mattilsynet'], 'stale')
            self.assertEqual(result['source_status']['fleet'], 'stale')
            self.assertEqual(result['companies'], previous['companies'])
            self.assertEqual(result['vessels'], previous['vessels'])

    def test_partial_source_outage_keeps_only_failed_source(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            target = root / 'registry.json'
            previous = {'companies': [{'name': 'Old Company'}],
                        'vessels': [{'ship': 'Saved Vessel'}]}
            target.write_text(json.dumps(previous), encoding='utf-8')
            csv_path = root / 'mat.csv'
            text = io.StringIO()
            writer = csv.writer(text, delimiter=';')
            writer.writerow(['VIRKSOMHETSNAVN', 'POSTSTED', 'BEDRIFTSNUMMER',
                             'GODKJENNINGSNUMMER', 'PRODUKSJONSFORM'])
            for i in range(12):
                writer.writerow(['Fishery ' + str(i), 'Bergen', str(900000000 + i),
                                 'NO-' + str(i), 'fish'])
            csv_path.write_text(text.getvalue(), encoding='utf-8')
            code = main(['--out', str(target), '--no-network',
                         '--mattilsynet-file', str(csv_path)])
            result = json.loads(target.read_text(encoding='utf-8'))
            self.assertEqual(code, 0)
            self.assertEqual(result['status'], 'partial')
            self.assertEqual(result['source_status']['mattilsynet'], 'ok')
            self.assertEqual(result['source_status']['fleet'], 'stale')
            self.assertEqual(len(result['companies']), 12)
            self.assertEqual(result['vessels'], previous['vessels'])


if __name__ == '__main__':
    unittest.main()
