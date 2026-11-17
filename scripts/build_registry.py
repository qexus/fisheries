#!/usr/bin/env python3
"""Build public, *non-vacancy* fisheries registry JSON for GitHub Pages.

Sources: Mattilsynet (fishery establishments) and Fiskeridirektoratet
(vessel registry). Only corporate vessel owners (ENTITET=FORETAK) appear.
No CVs, contact histories, or user data are read or exported.
Uses only Python standard library.
"""
from __future__ import annotations

import argparse
import csv
import io
import json
import re
import sys
import tarfile
import time
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

MATTILSYNET = "https://www.mattilsynet.no/godkjente-produkter-og-virksomheter/fisk-og-fiskerivarer-fish-and-fishery-products-virksomheter-som-h%C3%A5ndterer-fiskerivarer-fishery-establishments"
FISHERIDIR = "https://www.fiskeridir.no/registre/fartoyregisteret/uttrekk-fra-fartoyregisteret"
SOURCE_LIMIT_BYTES = 36_000_000


class AnchorParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.href = None
        self.label = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() == 'a':
            self.href = dict(attrs).get('href')
            self.label = []

    def handle_data(self, data):
        if self.href is not None:
            self.label.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == 'a' and self.href is not None:
            self.links.append((self.href, ' '.join(self.label).strip()))
            self.href = None
            self.label = []


def http_bytes(url: str, attempts: int = 2) -> bytes:
    if urlparse(url).scheme != 'https':
        raise ValueError('HTTPS URL required')
    if urlparse(url).hostname not in {
        'www.mattilsynet.no', 'mattilsynet.no', 'mattilsynet-xp7prod.enonic.cloud',
        'www.fiskeridir.no', 'fiskeridir.no', 'register.fiskeridir.no'
    }:
        raise ValueError('Unapproved download host: ' + str(urlparse(url).hostname))
    last_error = None
    for idx in range(attempts):
        try:
            req = Request(url, headers={
                'User-Agent': 'qexus-lab-fisheries/1.1 (+https://github.com/qexus)',
                'Accept': 'text/html,text/csv,application/x-tar,application/octet-stream,*/*'
            })
            with urlopen(req, timeout=35) as response:
                # Ensure redirects have not left the allowed hosts.
                if urlparse(response.geturl()).hostname not in {
                    'www.mattilsynet.no', 'mattilsynet.no', 'mattilsynet-xp7prod.enonic.cloud',
                    'www.fiskeridir.no', 'fiskeridir.no', 'register.fiskeridir.no'
                }:
                    raise ValueError('Unexpected redirect host')
                payload = response.read(SOURCE_LIMIT_BYTES + 1)
                if len(payload) > SOURCE_LIMIT_BYTES:
                    raise ValueError('Download larger than source limit')
                return payload
        except Exception as err:
            last_error = err
            if idx + 1 < attempts:
                time.sleep(2)
    raise RuntimeError(str(last_error))


def discover_download(page_url: str, mode: str) -> str:
    parser = AnchorParser()
    parser.feed(http_bytes(page_url).decode('utf-8', errors='replace'))
    for href, text in parser.links:
        raw = href.lower()
        label = text.lower()
        if mode == 'mat' and ('.csv' in raw or ('last ned' in label and 'csv' in label)):
            found = urljoin(page_url, href)
            if urlparse(found).hostname in ('mattilsynet-xp7prod.enonic.cloud', 'www.mattilsynet.no', 'mattilsynet.no'):
                return found
        if mode == 'fleet' and ('.tar' in raw or ('last' in label and 'tar' in label)):
            found = urljoin(page_url, href)
            if urlparse(found).hostname in ('register.fiskeridir.no', 'www.fiskeridir.no', 'fiskeridir.no'):
                return found
    raise ValueError(f'Could not find a safe {mode} download on official page')


def as_text(raw: bytes) -> str:
    for encoding in ['utf-8-sig', 'utf-16', 'cp1252']:
        try:
            value = raw.decode(encoding)
            if '\x00' not in value[:300]:
                return value
        except UnicodeDecodeError:
            continue
    raise UnicodeError('Cannot decode source as text')


def parse_csv(raw: bytes) -> list[dict[str, str]]:
    data = as_text(raw)
    probe = data[:10000]
    try:
        delimiter = csv.Sniffer().sniff(probe, delimiters=';,\t').delimiter
    except csv.Error:
        first = data.splitlines()[0]
        delimiter = ';' if first.count(';') >= first.count(',') else ','
    reader = csv.DictReader(io.StringIO(data), delimiter=delimiter)
    result = []
    for row in reader:
        result.append({(key or '').strip().replace('\ufeff', '').upper(): (val or '').strip() for key, val in row.items()})
    return result


def digest_establishments(raw: bytes) -> list[dict]:
    records = parse_csv(raw)
    if not records or 'VIRKSOMHETSNAVN' not in records[0]:
        raise ValueError('Unrecognized Mattilsynet CSV header: ' + repr(list(records[0]) if records else []))
    seen, output = set(), []
    for row in records:
        name = row.get('VIRKSOMHETSNAVN', '').strip()
        city = row.get('POSTSTED', '').strip()
        org = row.get('BEDRIFTSNUMMER', '').strip()
        approval = row.get('GODKJENNINGSNUMMER', '').strip()
        if not name or not re.fullmatch(r'\d{9}', org):
            # Skip unnamed entries and individual establishments without company organization numbers.
            continue
        key = (org, city.casefold(), approval.casefold())
        if key in seen:
            continue
        seen.add(key)
        output.append({
            'id': 'mat-' + org + '-' + approval.replace(' ', '') + '-' + str(len(output)),
            'key': f'org:{org}:{approval}',
            'name': name[:180],
            'regno': org,
            'place': city[:100],
            'sector': 'Реестр Mattilsynet',
            'profile': ('Рыбопереработка · ' + row.get('PRODUKSJONSFORM', '') +
                        ' · одобрение ' + approval)[:250],
            'link': MATTILSYNET,
            'source': MATTILSYNET,
            'channel': 'Госреестр · вакансии/контакты НЕ подтверждены',
            'imported': True,
        })
    if len(output) < 10:
        raise ValueError('Too few Mattilsynet businesses; source may have changed')
    return sorted(output, key=lambda x: (x['name'].casefold(), x['place'].casefold()))


def read_fleet_tar(raw: bytes) -> dict[str, bytes]:
    found = {}
    with tarfile.open(fileobj=io.BytesIO(raw), mode='r:*') as archive:
        for member in archive.getmembers():
            basename = Path(member.name).name.lower()
            if basename not in {'fartoy.csv', 'juridisk_enhet.csv', 'fartoy_eier.csv'} or not member.isfile():
                continue
            if member.size > SOURCE_LIMIT_BYTES:
                raise ValueError('Oversized registry member')
            handle = archive.extractfile(member)
            if handle:
                found[basename] = handle.read()
    if set(found) != {'fartoy.csv', 'juridisk_enhet.csv', 'fartoy_eier.csv'}:
        raise ValueError('Missing required vessel/company-owner tables')
    return found


def length_m(value: str) -> float:
    try:
        return float(value.replace(',', '.'))
    except (ValueError, AttributeError):
        return 0.0


def digest_fleet(raw: bytes, min_length: float = 20.0) -> list[dict]:
    tables = read_fleet_tar(raw)
    vessels = parse_csv(tables['fartoy.csv'])
    owners = parse_csv(tables['juridisk_enhet.csv'])
    relations = parse_csv(tables['fartoy_eier.csv'])
    if not vessels or not owners or not relations:
        raise ValueError('Vessel register unexpectedly empty')
    companies = {r.get('IDNR', ''): r for r in owners if r.get('ENTITET', '').upper() == 'FORETAK'}
    owned_by = {}
    for link in relations:
        if link.get('EIET_ENTITET', '').upper().startswith('FART') and link.get('EIER_ENTITET', '').upper() == 'FORETAK':
            owned_by.setdefault(link.get('EIET_IDNR', ''), []).append(link.get('EIER_IDNR', ''))
    result, seen = [], set()
    for row in vessels:
        length = length_m(row.get('STOERSTE_LENGDE', ''))
        if length < min_length:
            continue
        vessel_id = row.get('FARTOY_ID', '')
        for company_id in owned_by.get(vessel_id, []):
            owner = companies.get(company_id)
            if not owner or not owner.get('NAVN', ''):
                continue
            key = (vessel_id, company_id)
            if key in seen:
                continue
            seen.add(key)
            result.append({
                'key': 'ship:' + vessel_id + ':org:' + company_id,
                'ship': row.get('NAVN', '')[:100],
                'company': owner.get('NAVN', '')[:100],
                'length': round(length, 2),
                'profile': ('Флот · рег. ' + row.get('REGISTRERINGSMERKE', '') +
                            ' · орг. ' + company_id),
                'source': FISHERIDIR,
                'status': 'Госреестр; открытых вакансий не подтверждает',
                'imported': True,
            })
    if len(result) < 1:
        raise ValueError('No fleet-company matches; schema=' + repr({'vessel_keys':list(vessels[0]),'owner_keys':list(owners[0]),'relation_keys':list(relations[0]),'owner_types':sorted(set(x.get('ENTITET','') for x in owners))[:12],'relation_vessel_types':sorted(set(x.get('EIET_ENTITET','') for x in relations))[:12],'relation_owner_types':sorted(set(x.get('EIER_ENTITET','') for x in relations))[:12]}))
    return sorted(result, key=lambda x: (x['company'].casefold(), x['ship'].casefold()))


def main(argv=None):
    parser = argparse.ArgumentParser()
    parser.add_argument('--out', type=Path, default=Path('public/generated/registry.json'))
    parser.add_argument('--mattilsynet-file', type=Path, help='Read manually downloaded official CSV')
    parser.add_argument('--fleet-file', type=Path, help='Read manually downloaded official TAR')
    parser.add_argument('--no-network', action='store_true')
    parser.add_argument('--min-length', type=float, default=20.0)
    args = parser.parse_args(argv)
    previous = {}
    if args.out.exists():
        try:
            previous = json.loads(args.out.read_text(encoding='utf-8'))
        except (ValueError, OSError):
            pass
    state = {
        'status': 'unavailable',
        'generated_at': datetime.now(timezone.utc).isoformat(timespec='seconds'),
        'sources': {'mattilsynet': MATTILSYNET, 'fleet': FISHERIDIR},
        'counts': {}, 'companies': [], 'vessels': [], 'errors': [], 'source_status': {}, 
        'note': 'Companies and vessels are registry entries, NOT vacancies or verified recruitment leads.'
    }
    for label, local_path, landing, file_key, processor in [
        ('mattilsynet', args.mattilsynet_file, MATTILSYNET, 'companies', digest_establishments),
        ('fleet', args.fleet_file, FISHERIDIR, 'vessels', lambda x: digest_fleet(x, args.min_length)),
    ]:
        try:
            if local_path:
                payload = local_path.read_bytes()
            elif args.no_network:
                raise RuntimeError('No local file and network disabled')
            else:
                endpoint = discover_download(landing, 'mat' if label == 'mattilsynet' else 'fleet')
                print(f'{label}: reading {endpoint}', file=sys.stderr)
                payload = http_bytes(endpoint)
            state[file_key] = processor(payload)
            state['counts'][label] = len(state[file_key])
            state['source_status'][label] = 'ok'
        except Exception as exc:
            msg = f'{label}: {type(exc).__name__}: {exc}'
            state['errors'].append(msg)
            state['source_status'][label] = 'unavailable'
            print('WARNING:', msg, file=sys.stderr)
    # A single failed source must not delete its previous published records.
    for label, field in [('mattilsynet', 'companies'), ('fleet', 'vessels')]:
        if state['source_status'].get(label) != 'ok':
            older = previous.get(field, []) if isinstance(previous, dict) else []
            if isinstance(older, list) and older:
                state[field] = older
                state['counts'][label] = len(older)
                state['source_status'][label] = 'stale'
                state['errors'].append(label + ': using previous snapshot; not refreshed today.')
    active = list(state['source_status'].values())
    if active and all(s == 'ok' for s in active):
        state['status'] = 'updated'
    elif any(s == 'ok' for s in active):
        state['status'] = 'partial'
    elif state['companies'] or state['vessels']:
        state['status'] = 'stale'
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(state, ensure_ascii=False, separators=(',', ':')), 'utf-8')
    print(f"Status={state['status']} companies={len(state['companies'])} vessels={len(state['vessels'])} output={args.out}")
    # Fail loudly on source failures; workflow will use a checked-in last successful snapshot if provided.
    return 0 if state['status'] in ('updated', 'partial', 'stale') else 1


if __name__ == '__main__':
    sys.exit(main())