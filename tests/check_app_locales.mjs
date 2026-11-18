import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const load = name => fs.readFileSync(new URL('../public/' + name, import.meta.url), 'utf8');
const files = ['data.js', 'import-guard.js', 'app-locale.js', 'legacy-i18n.js', 'app.js'];
const html = load('index.html');
for (let i = 1; i < files.length; i++) {
  const before = html.indexOf('src="' + files[i - 1] + '"');
  assert(before >= 0 && before < html.indexOf('src="' + files[i] + '"'));
}

const expectations = {
  fr: ['Transformation du saumon', 'offres et contacts', 'Ouvrier de production', 'Anglais ou norvégien',
    'registre officiel', 'Longueur', 'Système', 'Champs CSV non reconnus', 'Importation terminée', 'Activité'],
  uk: ['Переробка лосося', 'підприємств у базі', 'Виробничий працівник', 'Англійська або норвезька',
    'офіційного реєстру', 'Довжина', 'Рециркуляційна система', 'Поля CSV не розпізнано', 'Імпорт завершено', 'Вид діяльності']
};

for (const [lang, labels] of Object.entries(expectations)) {
  const location = {pathname: '/fisheries/', search: '?lang=' + lang, hash: ''};
  const window = {location, scrollTo() {}};
  const hooks = new Map(), nodes = new Map(), store = new Map();
  const answers = new Map();
  const document = {
    documentElement: {lang},
    querySelector(selector) { return answers.get(selector) || null; },
    querySelectorAll() { return []; },
    addEventListener(type, handler) { hooks.set(type, handler); },
    getElementById(id) {
      if (!nodes.has(id)) nodes.set(id, {style: {}, classList: {remove() {}}, setAttribute() {}});
      return nodes.get(id);
    }
  };
  const localStorage = {
    getItem(key) { return store.get(key) || null; },
    setItem(key, value) { store.set(key, value); }
  };
  const registry = {
    status: 'updated', generated_at: '2026-11-17T00:00:00Z',
    companies: [{id: 'reg-company', name: 'Fixture A/S', place: 'Ålesund', sector: 'Реестр Mattilsynet',
      profile: 'Рыбопереработка · FFPP · одобрение 42', imported: true}],
    vessels: [{company: 'Fixture Fleet A/S', ship: 'MS Fixture', length: 16,
      profile: 'Флот · рег. M-1 · орг. 42', imported: true}]
  };
  const ctx = vm.createContext({
    document, window, location, localStorage, URL, URLSearchParams,
    setTimeout() {}, clearTimeout() {},
    async fetch() {return {ok: true, async json() { return registry; }};}
  });
  for (const file of files) vm.runInContext(load(file), ctx, {filename: file});
  await new Promise(resolve => setImmediate(resolve));

  const main = () => nodes.get('main').innerHTML;
  const show = view => { window.qexusNavigate(view); return main(); };
  const change = target => hooks.get('change')({target: {dataset: {}, ...target}});
  const csv = content => ({size: content.length, async text() { return content; }});
  const seed = window.QEXUS_DATA;
  const translations = window.QX_APP_I18N[lang];
  for (const [collection, fields] of [['companies',['sector','profile','channel']], ['jobs',['role','language','match','note','deadline']], ['fleets',['ship','profile','status']], ['glossary',['ru','category']]]) {
    for (const item of seed[collection]) {
      for (const field of fields) {
        const source = item[field];
        if (/[А-Яа-яЁё]/.test(source || '') || collection === 'jobs' && ['role','language'].includes(field)) {
          assert(translations[source], `Missing ${lang} translation: ${collection}.${field}: ${source}`);
        }
      }
    }
  }
  assert(main().includes(lang === 'fr' ? 'entreprises dans la base' : labels[1]));
  assert(show('companies').includes(labels[0]));
  assert(main().includes('FFPP') && main().includes('Fixture A/S'));
  assert(main().includes('value="Госреестр (первичный список)"'), 'Company filter key must stay stable');
  await change({id: 'cat', value: 'Реестр Mattilsynet'});
  assert(main().includes('Fixture A/S') && !main().includes('Hofseth'));
  assert(show('jobs').includes(labels[2]) && main().includes(labels[3]));
  assert(main().includes('value="Permit обязателен"'), 'Job filter key must stay stable');
  await change({dataset: {statusKind: 'job', statusKey: '01'}, value: 'Изучаю'});
  assert.equal(JSON.parse(store.get('qexus_fish_status_v1'))['job:01'], 'Изучаю');
  assert(show('fleets').includes(labels[4]) && main().includes(labels[5]) && main().includes('MS Fixture'));
  assert(show('glossary').includes(labels[6].toLocaleLowerCase()));
  assert(main().includes(lang === 'fr' ? '<th>Français</th>' : '<th>Українська</th>'));
  assert(main().includes('<td data-no-translate><b>Production worker</b></td><td data-no-translate>produksjonsmedarbeider</td>'));

  const legacy = window.QX_LEGACY_MODULES[lang];
  assert.equal(legacy.length, 10);
  assert.equal(legacy.reduce((total, lesson) => total + lesson.questions.length, 0), 20);
  legacy.forEach((lesson, index) => {
    const original = seed.modules[index];
    assert.equal(lesson.id, original.id);
    assert.deepEqual(lesson.sources, original.sources);
    assert.equal(parseInt(lesson.duration), parseInt(original.duration));
    assert.equal(lesson.sections.length, original.sections.length);
    assert.equal(lesson.questions.length, original.questions.length);
    assert.notEqual(lesson.title, original.title);
    assert.notEqual(lesson.goal, original.goal);
    assert.notEqual(lesson.practice, original.practice);
    lesson.sections.forEach(([title, paragraph], section) => {
      assert(title.length > 0);
      assert(paragraph !== original.sections[section][1] || lesson.id === 9 && section === 2,
        'Only the English interview exercise may preserve an original paragraph');
    });
    lesson.questions.forEach((question, qIndex) => {
      const oldQuestion = original.questions[qIndex];
      assert.equal(question.answer, oldQuestion.answer);
      assert.equal(question.options.length, oldQuestion.options.length);
      assert.notEqual(question.q, oldQuestion.q);
      assert.notEqual(question.explanation, oldQuestion.explanation);
    });
    if (lang === 'fr') assert(!/[А-Яа-яЁё]/.test(JSON.stringify(lesson)));
  });
  assert(show('course').includes(legacy[0].title));
  assert(main().includes(seed.sources[legacy[0].sources[0]]));
  const firstLesson = legacy[0];
  firstLesson.questions.forEach((question, index) => {
    answers.set(`input[name="q_${firstLesson.id}_${index}"]:checked`, {value: String(question.answer)});
  });
  hooks.get('click')({target: {closest() { return {dataset: {quiz: '1'}}; }}});
  assert(nodes.get('quiz_out_1').innerHTML.includes(firstLesson.questions[0].explanation));
  assert(!nodes.get('quiz_out_1').className.includes('bad'));

  show('import');
  await change({id: 'csvFile', files: [csv('Unknown,Header\nvalue,42')]});
  assert(nodes.get('importReport').textContent.includes(labels[7]));
  await change({id: 'csvFile', files: [csv('Virksomhetsnavn,Bedriftsnummer,Produksjonsform\nImported Fixture,101001010,PP')]});
  assert(nodes.get('toast').textContent.includes(labels[8]));
  assert.equal(JSON.parse(store.get('qexus_fish_imported_companies_v1'))[0].sector, 'Госреестр Mattilsynet');
  assert(show('companies').includes(labels[9]) && main().includes('Imported Fixture'));
  const backup = JSON.stringify({app: 'qexus-fishing', version: 1, companies: [null], vessels: []});
  await change({id: 'restoreFile', files: [csv(backup)]});
  assert.equal(JSON.parse(store.get('qexus_fish_imported_companies_v1'))[0].name, 'Imported Fixture');
  assert(nodes.get('toast').textContent.includes(lang === 'fr' ? 'Impossible de lire' : 'Не вдалося прочитати'));
  for (const file of ['academy-content.js', 'academy.js']) vm.runInContext(load(file), ctx, {filename: file});
  hooks.get('click')({
    target: {closest(selector) { return selector === '[data-qa-view]' ? {dataset: {qaView: 'curriculum'}} : null; }},
    preventDefault() {}
  });
  assert.equal((main().match(/class="qa-legacy"/g) || []).length, 10);
  for (const lesson of legacy) {
    assert(main().includes(lesson.title), 'The Academy must render every localized legacy supplement');
  }
}
console.log('Fisheries Norway display locales, archives, original glossary languages, legacy lessons and quizzes, stable filters and malformed import/restore checked.');
