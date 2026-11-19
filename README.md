# Fisheries Norway · QEXUS Lab

Independent public reference and training website for Norway's fisheries, seafood processing, aquaculture and fleets.

Live website: https://qexus.github.io/fisheries/
Languages: Russian, French and Ukrainian (RU/FR/UA selector; technical locale uk).

## Visitor features

- Public processing facilities and business-owned fleet registries, curated employer career links, historical job snapshots and official NAV search.
- Twelve academy lessons, quizzes, safety scenarios and translated standalone guides.
- Candidate journey, browser-only CV and cover-letter drafts, personal application tracker, print, export and restore.
- Regulator/source review dates and clearly labeled historical vacancy status. A registered company is NOT proof of current hiring.

## Privacy and verification

The website is static. Personal CV text, notes, quiz progress and application records exist only in the visitor's browser localStorage. No applications are sent automatically and no visitor account is created. Do not commit personal JSON backups or passport/work-permit documents to this public repository.
Original authorities: Mattilsynet https://www.mattilsynet.no/ ; Fiskeridirektoratet https://www.fiskeridir.no/ ; Arbeidstilsynet https://www.arbeidstilsynet.no/en/ ; NAV https://arbeidsplassen.nav.no/stillinger ; UDI https://www.udi.no/en/.
Qualification costs, job status and immigration requirements must be verified with the relevant authority and employer; this site is not a recruiting service or certification body.

## Publishing and maintenance

- Only public/ is deployed to GitHub Pages. The scripts/, tests/, docs/ and .github/ folders are development sources, not published website assets.
- The Monday registry pipeline uses official public data, status warnings and safe previous-snapshot fallback. Jobs remain historical unless an explicitly authorized distribution source is integrated.
- Root page links the single shared translation module: https://qexus.github.io/shared/site-i18n.js; no duplicate locale copy in this repository.
- GitHub Actions workflows deploy.yml and visual-qa.yml run unit/content/security checks and published-site Chromium/WebKit QA.
- No refresh button for visitors and no private API secrets are used.

## Local checks

    python3 -m unittest discover -s tests -v
    node tests/check_content.mjs
    node tests/check_switch_labels.mjs
    python3 -m http.server 8000 --directory public

See docs/JOBS_FEEDS.md for the optional inactive provider integration and explicit permission requirements. The public site remains https://qexus.github.io/fisheries/.
