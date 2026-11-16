import io
import sys
import tarfile
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from build_registry import digest_establishments, digest_fleet

class TestRegistry(unittest.TestCase):
    def test_mattilsynet_removes_no_org_entries_and_deduplicates(self):
        raw = ("Virksomhetsnavn;Poststed;Bedriftsnummer;Produksjonsform;Godkjenningsnummer;Adresse\n"
               "Example Seafood AS;BODØ;123456789;FFPP;N123;Kaia 1\n"
               "Example Seafood AS;BODØ;123456789;FFPP;N123;Kaia 1\n"
               "Private Name;BERGEN;;PP-ST;N1;Home\n"
               + "".join(f'Business {i};OSLO;{100000000+i};FFPP;N{i};\n' for i in range(12)))
        result = digest_establishments(raw.encode())
        self.assertEqual(13, len(result))
        self.assertFalse(any(x['name']=='Private Name' for x in result))
        self.assertTrue(all('НЕ подтверждены' in x['channel'] for x in result))

    def test_fleet_corporate_only(self):
        files={
            'fartoy.csv': 'FARTOY_ID;NAVN;STOERSTE_LENGDE;REGISTRERINGSMERKE\n1000000001;TEST SHIP;24,8;T-12-X\n1000000002;SMALL;4,0;S1\n',
            'juridisk_enhet.csv': 'ENTITET;IDNR;NAVN\nFORETAK;999999999;Seafood Corp AS\nPERSON;11111111111;Private Person\n',
            'fartoy_eier.csv': 'EIET_ENTITET;EIET_IDNR;EIER_ENTITET;EIER_IDNR\nFARTØY;1000000001;FORETAK;999999999\nFARTØY;1000000001;PERSON;11111111111\n',
        }
        buff=io.BytesIO()
        with tarfile.open(fileobj=buff, mode='w') as tar:
            for fname, value in files.items():
                raw=value.encode('utf-8'); info=tarfile.TarInfo(fname); info.size=len(raw);tar.addfile(info, io.BytesIO(raw))
        result=digest_fleet(buff.getvalue())
        self.assertEqual(len(result),1)
        self.assertEqual(result[0]['company'],'Seafood Corp AS')
        self.assertNotIn('Private Person',str(result))

if __name__ == '__main__':unittest.main()