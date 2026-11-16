# qexus lab · Fisheries Norway (GitHub Pages edition)

**Free open-registry research + self-study.** A static browser app (Russian interface) with a weekly GitHub Actions Python data pipeline.

The site does **not** apply for jobs, send mail, verify hiring eligibility, or provide maritime certification. Public registry records must not be described as vacancies.

## How it works

- `public/index.html`, `public/styles.css`, `public/app.js`, `public/data.js` — website; works at `https://qexus.github.io/fisheries/` after successful Pages deployment.
- `scripts/build_registry.py` — Python 3 standard-library pipeline that discovers and downloads public official CSV / TAR and writes `public/generated/registry.json`.
- `.github/workflows/deploy.yml` — tests, refreshes data and publishes to GitHub Pages after a push, a manual action, or every Monday 07:17 UTC.
- `tests/test_build_registry.py` — tests for CSV deduplication and vessel-to-**corporate**-owner linkage.
- `scripts/registry_importer.py` — older standalone CLI that converts a locally downloaded fleet TAR into researcher CSV tables; not required for the Pages workflow.

**Privacy:** The public site contains no resumes, job application drafts, saved application histories, or private notes. Locally tracked statuses and study progress stay in your current browser (`localStorage`). They will not sync between devices and can be lost if the browser storage is cleared. Never commit JSON browser backups to GitHub.

## Publish (requires the GitHub account owner)

1. Visit <https://github.com/new>, create a **public** repository named **`fisheries`** under account **`qexus`**. Leave initial README / `.gitignore` / license unchecked (the package contains its own).
2. On Mac, unzip this package. Open **Terminal** in the extracted `qexus_fisheries_pages_ready` folder (or `cd` into it), then:

   ```bash
   git init -b main
   git add .
   git commit -m "Initial qexus Fisheries Pages and automated registry updates"
   git remote add origin https://github.com/qexus/fisheries.git
   git push -u origin main
   ```

   Git may ask you to sign in through your configured GitHub authentication. Do **not** paste passwords or tokens into chat.
3. In that repository open **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open **Actions → Update registries and deploy Pages**. If a run failed before Pages was enabled, press **Run workflow**. Inspect the most recent run for `deploy: success`.
5. Site URL (after successful publication): <https://qexus.github.io/fisheries/>.

GitHub's deploy workflow needs Pages enabled and the repository to allow Actions; a new public repository normally allows this but account policy can differ.

## Running locally

```bash
python3 -m http.server 8000 -d public
# open http://localhost:8000
```

Build data from locally downloaded source archives:

```bash
python3 scripts/build_registry.py \
  --mattilsynet-file /path/to/fishery_establishments.csv \
  --fleet-file /path/to/frtyweb.tar \
  --out public/generated/registry.json
```

For automatic downloads (network required):

```bash
python3 scripts/build_registry.py --out public/generated/registry.json
```

If a source is inaccessible/changes layout, the JSON says `partial` or `unavailable`; no entries will be invented. Source HTML links are discovered afresh on each run, rather than hard-coding attachment UUIDs.

## What gets updated

- Mattilsynet: established fishery-processing facilities with a company organization number. This is **not** a list of job opportunities.
- Fiskeridirektoratet: registered fishing vessels **at least 20 metres** linked to company (`FORETAK`) owners. No individual owner records are exported. This is **not** a list of fishing crews or available jobs.
- Hand-curated starter company names, the old 27 job/career entries and lessons remain from the November 16, 2026 snapshot. Those vacancies do **not** refresh automatically and require manual verification before applications.

Original sources: [Mattilsynet](https://www.mattilsynet.no/godkjente-produkter-og-virksomheter/fisk-og-fiskerivarer-fish-and-fishery-products-virksomheter-som-h%C3%A5ndterer-fiskerivarer-fishery-establishments) and [Fiskeridirektoratet](https://www.fiskeridir.no/registre/fartoyregisteret/uttrekk-fra-fartoyregisteret). Public vessel data are subject to the Norwegian Licence for Open Government Data (NLOD). Credit the government data source and obey its terms.

## Notes

- GitHub Pages serves static files; Python runs in GitHub Actions **before** site publication, not while someone views the website.
- Downloads are limited in size and to an allowlist of official Norwegian domains. If sources change, inspect and update `discover_download()` or the parser.
- Automatic downloads have not been verified end-to-end in this environment; pipeline/logic have been unit-tested locally.
- User-entered JSON backups are never uploaded by the application. Files imported in the browser remain on that device. The URL is public; content and source code of a public repository are also public.