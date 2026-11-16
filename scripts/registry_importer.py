#!/usr/bin/env python3
"""qexus lab: convert official Norwegian public TAR/CSV dumps into research tables.
No external services. Reads archive/CSV provided locally. Does not claim vacancies.
"""
from __future__ import annotations
import argparse, csv, io, tarfile, collections
from pathlib import Path

SOURCE='https://www.fiskeridir.no/registre/fartoyregisteret/uttrekk-fra-fartoyregisteret'

def read_csv_bytes(raw: bytes):
    for enc in ('utf-8-sig','iso-8859-1'):
        try: text=raw.decode(enc);break
        except UnicodeDecodeError: pass
    else: raise UnicodeError('Unknown CSV encoding')
    return list(csv.DictReader(io.StringIO(text), delimiter=';'))

def src_files(path: Path):
    if path.is_dir():
        return {k: (path/f'{k}.csv').read_bytes() for k in ('fartoy','juridisk_enhet','fartoy_eier')}
    with tarfile.open(path,'r:*') as tar:
        output={}
        for member in tar.getmembers():
            fn=Path(member.name).name.lower()
            for name in ('fartoy','juridisk_enhet','fartoy_eier'):
                if fn==name+'.csv':
                    f=tar.extractfile(member)
                    if f:output[name]=f.read()
    if set(output)!={'fartoy','juridisk_enhet','fartoy_eier'}:
        raise ValueError('Archive must contain fartoy.csv, juridisk_enhet.csv and fartoy_eier.csv')
    return output

def length_num(v):
    try:return float((v or '').replace(',','.'))
    except ValueError:return 0.0

def main():
    pa=argparse.ArgumentParser(description='Make a vessel-owner business research export from official TAR')
    pa.add_argument('source',type=Path,help='Downloaded frtyweb.tar or unpacked directory')
    pa.add_argument('--min-length',type=float,default=20.0,help='Only vessels at least this many metres (default: 20)')
    pa.add_argument('--out',type=Path,default=Path('qexus_fleet_exports'))
    args=pa.parse_args()
    parts=src_files(args.source)
    vessels=read_csv_bytes(parts['fartoy'])
    entities={x.get('IDNR','').strip():x for x in read_csv_bytes(parts['juridisk_enhet']) if x.get('ENTITET','').strip().upper()=='FORETAK'}
    by_vessel=collections.defaultdict(list)
    for r in read_csv_bytes(parts['fartoy_eier']):
        if r.get('EIET_ENTITET','').strip().upper().startswith('FART') and r.get('EIER_ENTITET','').strip().upper()=='FORETAK':
            by_vessel[r.get('EIET_IDNR','').strip()].append((r.get('EIER_IDNR','').strip(),r.get('EIER_ANDEL','')))
    args.out.mkdir(parents=True,exist_ok=True)
    out=[]
    for v in vessels:
        l=length_num(v.get('STOERSTE_LENGDE'))
        if l<args.min_length:continue
        ident=v.get('FARTOY_ID','').strip()
        owners=by_vessel.get(ident,[])
        if not owners:continue
        for org,share in owners:
            e=entities.get(org)
            if not e:continue
            out.append({'Vessel ID':ident,'Vessel name':v.get('NAVN',''),'Length m':v.get('STOERSTE_LENGDE',''),
                        'Register mark':v.get('REGISTRERINGSMERKE',''),'Company org number':org,
                        'Company name':e.get('NAVN',''),'Company city':e.get('POSTSTED',''),
                        'Owner share':share,'Record type':'OFFICIAL REGISTRY / NOT A JOB',
                        'Source':SOURCE})
    def savecsv(name,data,cols):
        with (args.out/name).open('w',encoding='utf-8-sig',newline='') as f:
            w=csv.DictWriter(f,fieldnames=cols);w.writeheader();w.writerows(data)
    fields=list(out[0].keys()) if out else ['Vessel ID','Vessel name','Length m','Register mark','Company org number','Company name','Company city','Owner share','Record type','Source']
    savecsv('vessels_company_owners.csv',out,fields)
    grouped=collections.defaultdict(list)
    for v in out:grouped[v['Company org number']].append(v)
    owner_rows=[{'Company org number':k,'Company name':v[0]['Company name'],'Company city':v[0]['Company city'],'Vessels ≥ min length':len({x['Vessel ID'] for x in v}),
                 'Recruitment contact':'NOT VERIFIED','Vacancy':'NOT VERIFIED','Source':SOURCE} for k,v in sorted(grouped.items())]
    savecsv('companies_to_enrich.csv',owner_rows,['Company org number','Company name','Company city','Vessels ≥ min length','Recruitment contact','Vacancy','Source'])
    print(f'Processed {len(vessels)} registered vessels, saved {len(out)} vessel/company rows and {len(owner_rows)} corporate owners.')
    print(f'Outputs: {args.out.resolve()}')
    if not out:print('No rows joined. Check source schema and chosen min-length threshold.')

if __name__=='__main__':main()