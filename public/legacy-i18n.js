/* Localized copy for the ten original Norway modules. Answer indices, IDs and sources come from data.js. */
(() => {
'use strict';
const modules = window.QEXUS_DATA?.modules;
if (!modules) return;
const copy = {
1: {
  fr: ["Panorama du secteur et choix d’un métier", "Introduction",
    "Distinguer la transformation à terre, l’aquaculture et le travail en mer pour choisir une voie réaliste sur les plans financier et juridique.",
    [
      ["Trois marchés distincts", "Les usines de transformation des produits de la mer trient, découpent, emballent et contrôlent la qualité, en utilisant des lignes et des machines qu’il faut nettoyer. Les exploitations aquacoles entretiennent les bassins, les pompes, les capteurs et les systèmes de traitement, et suivent les processus biologiques. La pêche commerciale à bord implique des exigences accrues en matière de sécurité, de météo, de quarts et de documents. Les conditions, la rémunération et les certifications diffèrent entre la terre et la mer."],
      ["Choisir un métier", "Choisissez d’abord selon vos compétences, au-delà du salaire annoncé. L’expérience en usine correspond bien à un poste d’opérateur de production. Un poste technique peut être intéressant, mais peut exiger une qualification officielle, des connaissances en électricité et le norvégien. Sans expérience, accéder à un poste embarqué est souvent plus difficile en raison des conditions d’accès, des risques physiques et des horaires particuliers."],
      ["Vérifier une offre", "Pour chaque poste, notez le nom et le numéro d’enregistrement de l’employeur, les tâches, la langue exigée, le lieu, le taux et le mode de rémunération, les heures et les quarts, le logement, la prise en charge du déplacement, la catégorie de permis de travail, la durée du contrat et les documents exigés. Lorsque la moitié des conditions manquent, la vérification reste incomplète."]
    ],
    "Dans la section des offres, choisissez trois postes différents, en production, en technique et à bord. Expliquez pour chacun en quoi votre expérience correspond ou non.",
    [
      ["Quel secteur utilise le plus les systèmes RAS, les pompes et les capteurs ?", ["Pêche commerciale", "Aquaculture", "Découpe du poisson à terre"], "Un RAS est un système d’aquaculture en recirculation."],
      ["Que signifie à coup sûr l’inscription d’une entreprise au registre Mattilsynet ?", ["Un poste est ouvert", "L’entreprise figure dans le registre public", "Un visa est délivré à tous les candidats étrangers"], "Le registre répertorie les entreprises. Il ne confirme aucune offre d’emploi."]
    ]],
  uk: ["Огляд галузі та вибір професії", "Початок",
    "Розрізняти берегову переробку, аквакультуру й роботу в морі та обрати фінансово й юридично реалістичний шлях.",
    [
      ["Три різні ринки праці", "Рибопереробні заводи сортують, розбирають і пакують рибу, проводять санітарну обробку та контроль якості й працюють із лініями та механізмами. В аквакультурі ферми обслуговують ємності з рибою, насоси, датчики й системи очищення та стежать за біологічними процесами. На промислових суднах вищі вимоги до безпеки, погодних умов, вахт і документів. Робота на березі та на судні відрізняється умовами, оплатою та сертифікацією."],
      ["Як обрати професію", "Спершу оцініть відповідність власним навичкам, а не лише заявлений дохід. Досвід промислового виробництва добре підходить для роботи оператором. Технічна посада може бути цікавішою, але може вимагати офіційної кваліфікації, знання електрообладнання й норвезької. Без досвіду складніше влаштуватися на судно через вимоги допуску, фізичні ризики та особливий графік."],
      ["Перевірка пропозиції", "Для кожної вакансії запишіть назву й реєстраційний номер роботодавця, опис роботи, обов’язкову мову, місце, ставку й систему оплати, години та зміни, житло, хто оплачує переїзд, категорію дозволу на роботу, строк договору й необхідні документи. Якщо половини відомостей бракує, перевірка ще не завершена."]
    ],
    "У розділі вакансій оберіть три різні посади у виробництві, технічній службі й на судні. Поясніть, наскільки ваш досвід відповідає кожній.",
    [
      ["У якому секторі найчастіше працюють із RAS, насосами й датчиками?", ["Промисловий флот", "Аквакультура", "Берегове розбирання риби"], "RAS — рециркуляційна система на рибницьких підприємствах."],
      ["Що точно означає наявність компанії в реєстрі Mattilsynet?", ["Компанія має вакансію", "Підприємство внесено до публічного реєстру", "Усім іноземцям оформлюють візу"], "Реєстр містить відомості про підприємства й не підтверджує вакансій."]
    ]]
},
2: {
  fr: ["Trouver des employeurs sans intermédiaire", "Recherche",
    "Apprendre à constituer et à nettoyer une base personnelle à partir de registres publics.",
    [
      ["Mattilsynet", "Téléchargez le CSV officiel des entreprises du secteur du poisson. Il contient normalement le nom (Virksomhetsnavn), la ville (Poststed), le numéro d’établissement (Bedriftsnummer), l’activité (Produksjonsform) et l’adresse. Une fiche ne confirme aucun recrutement. Vérifiez le numéro et le nom dans les registres de Brønnøysund, puis trouvez le site officiel."],
      ["Fiskeridirektoratet", "L’archive TAR quotidienne de la flotte comprend fartoy.csv, juridisk_enhet.csv, fartoy_eier.csv et d’autres fichiers. Elle permet d’associer les identifiants des navires et des propriétaires. Certains CSV utilisent un point-virgule comme séparateur. Dans Excel, gardez les identifiants sous forme de texte pour conserver les zéros initiaux."],
      ["NAV et vérification manuelle", "Sur NAV, utilisez les mots clés norvégiens produksjonsmedarbeider, produksjonsoperatør, tekniker, driftsoperatør, fiskeindustri et fiskefartøy. Vérifiez la date limite, si l’annonce vient d’un employeur ou d’une agence et si un permis valide est déjà exigé. Envoyez seulement des messages ciblés lorsqu’une démarche légale est possible."],
      ["Qualité des données", "Suivez l’ordre suivant : registre public, site de l’entreprise, canal carrière, offre actuelle, droit d’embaucher un candidat étranger confirmé, puis candidature. Conservez l’URL, la date de vérification, le statut et la source. Évitez d’acheter des listes privées de contacts dont la provenance, la légalité ou l’actualité sont incertaines."]
    ],
    "Téléchargez le CSV de Mattilsynet et ajoutez-le dans Importation. Trouvez cinq entreprises qui ne figuraient pas dans la liste initiale de 50 et repérez leurs pages carrière.",
    [
      ["Quel champ permet de vérifier facilement une entité juridique norvégienne ?", ["Nom du responsable", "Numéro d’organisation", "Couleur du logo"], "Le numéro d’organisation constitue un identifiant plus stable que le nom."],
      ["Un navire de pêche en activité indique-t-il qu’il recrute ?", ["Oui", "Non"], "Le registre identifie le navire sans indiquer ses besoins de recrutement."]
    ]],
  uk: ["Як знаходити роботодавців без посередників", "Пошук",
    "Навчитися створювати й очищати власну базу з відкритих реєстрів.",
    [
      ["Mattilsynet", "Завантажте CSV із переліком рибних підприємств з офіційної сторінки. Зазвичай є назва (Virksomhetsnavn), місто (Poststed), реєстраційний номер підприємства (Bedriftsnummer), вид діяльності (Produksjonsform) та адреса. Запис не підтверджує найму. Звірте номер і назву в Brønnøysundregistrene й знайдіть офіційний сайт."],
      ["Fiskeridirektoratet", "У щоденному архіві TAR для флоту є fartoy.csv, juridisk_enhet.csv, fartoy_eier.csv та інші файли. Вони дають змогу зіставити ідентифікатори судна й власника. У деяких CSV роздільник — крапка з комою. В Excel зберігайте ідентифікатори як текст, щоб не втратити початкові нулі."],
      ["NAV і ручна перевірка", "Шукайте на NAV за норвезькими словами produksjonsmedarbeider, produksjonsoperatør, tekniker, driftsoperatør, fiskeindustri та fiskefartøy. Перевірте термін, хто опублікував оголошення — роботодавець чи агенція — і чи потрібен чинний дозвіл. Надсилайте лише адресні повідомлення, якщо існує реальний законний шлях оформлення."],
      ["Якість даних", "Дотримуйтеся порядку: державний реєстр, сайт компанії, кар’єрний канал, чинна вакансія, підтверджене право найняти іноземного кандидата, готовність податися. Зберігайте URL, дату перевірки, статус і джерело. Не купуйте закриті списки контактів, якщо їхня законність, походження чи актуальність невідомі."]
    ],
    "Завантажте CSV Mattilsynet і додайте його в розділі «Імпорт». Знайдіть п’ять підприємств поза початковим списком із 50 і визначте їхні кар’єрні сторінки.",
    [
      ["Яке поле зручно використовувати для звірки норвезьких юридичних осіб?", ["Ім’я керівника", "Організаційний номер", "Колір логотипа"], "Організаційний номер — стабільніший ідентифікатор за назву."],
      ["Чи означає активне риболовне судно, що в екіпажі є вакансія?", ["Так", "Ні"], "Реєстр описує судно й не повідомляє про потребу в працівниках."]
    ]]
},
3: {
  fr: ["Sécurité à bord", "Travail en mer",
    "Comprendre les dangers de base, les limites de l’autoformation et les qualifications maritimes officielles.",
    [
      ["Formation officielle", "Selon l’autorité maritime norvégienne, les pêcheurs doivent suivre la formation de sécurité de 50 heures ou détenir un certificat STCW Basic Safety Training admissible de moins de huit ans. Des règles de renouvellement et des exceptions s’appliquent. Le certificat médical des gens de mer est généralement exigé, avec des exceptions selon la taille du navire et la zone de navigation. Avant de payer, attendez une offre précise et la confirmation de l’employeur et de l’administration que le document convient."],
      ["Principaux dangers", "Mauvais temps, pont glissant, cordages et câbles sous tension, mécanismes mobiles, équipements frigorifiques et espaces confinés. Ne vous placez pas dans une boucle de câble et ne traversez pas la zone dangereuse du treuil. Appliquez la procédure d’arrêt autorisée avant d’intervenir près de pièces mobiles. En cas d’alarme, suivez les consignes établies."],
      ["Avant le quart", "Repérez le point de rassemblement (muster station), les issues de secours, les alarmes et le lieu de remise des vêtements de flottaison et des EPI. Identifiez le responsable du pont, la procédure pour signaler une anomalie et le niveau d’anglais requis pour comprendre les ordres. Respectez la formation, les procédures locales et les consignes des personnes autorisées."],
      ["Droit d’arrêter le travail", "Si un ordre est ambigu, si la consignation n’est pas confirmée, si une protection manque, si la position du câble paraît dangereuse ou si la météo change, arrêtez et consultez votre responsable. Ce texte de formation ne remplace ni les exercices officiels ni l’accueil de sécurité."]
    ],
    "Préparez une fiche de 12 consignes de sécurité en anglais et indiquez qui doit faire la séance d’information avant le départ en mer.",
    [
      ["Cette leçon en ligne remplace-t-elle un certificat maritime obligatoire ?", ["Oui", "Non"], "Il faut une formation officielle reconnue et les documents applicables."],
      ["Que faire si vous ne comprenez pas un ordre près d’un treuil en marche ?", ["Continuer en devinant", "S’arrêter et demander une précision", "Demander après le quart"], "La sécurité et la confirmation de l’ordre sont prioritaires."]
    ]],
  uk: ["Безпека на судні", "Робота в морі",
    "Розуміти основні небезпеки, межі самостійного навчання й офіційні морські допуски.",
    [
      ["Офіційна підготовка", "За даними норвезького морського відомства, рибалкам потрібен 50-годинний курс безпеки або прийнятний сертифікат STCW Basic Safety Training віком до восьми років. Діють правила поновлення й винятки. Зазвичай також потрібне медичне свідоцтво моряка, проте винятки залежать від розміру судна та району плавання. Перед оплатою дочекайтеся конкретної пропозиції та підтвердження роботодавця й відомства, що документ підходить."],
      ["Основні небезпеки", "Негода, слизька палуба, натягнуті канати й троси, рухомі механізми, холодильне обладнання та замкнені простори. Не стійте в петлі троса й не перетинайте небезпечну зону лебідки. Перед роботою біля рухомих деталей виконайте затверджену процедуру зупинки. Під час тривоги дотримуйтеся встановлених правил."],
      ["Перед зміною", "Дізнайтеся, де місце збору (muster station), аварійні виходи, сигнали тривоги та місця видачі засобів плавучості й ЗІЗ. Уточніть, хто керує роботою на палубі, як повідомляти про несправність та який рівень англійської потрібен для розуміння команд. Виконуйте інструктаж, місцеві процедури й вказівки уповноважених членів екіпажу."],
      ["Правило Stop Work", "Зупиніться й зверніться до старшого, якщо команда незрозуміла, блокування не підтверджено, захист відсутній, положення троса небезпечне або погода змінилася. Навчальний текст не замінює офіційних тренувань і вступного інструктажу."]
    ],
    "Підготуйте картку з 12 командами безпеки англійською та поясніть, хто проводить інструктаж перед виходом у море.",
    [
      ["Чи може цей онлайн-урок замінити обов’язковий морський сертифікат?", ["Так", "Ні"], "Для роботи потрібні визнана офіційна підготовка та відповідні документи."],
      ["Що робити, якщо команда біля ввімкненої лебідки незрозуміла?", ["Продовжувати, покладаючись на здогад", "Зупинитися й перепитати", "Запитати після зміни"], "Найважливіші безпека й підтвердження команди."]
    ]]
},
4: {
  fr: ["Navires et engins de pêche", "Travail en mer",
    "Distinguer les chaluts, palangres, filets, sennes coulissantes et casiers, et comprendre leur vocabulaire.",
    [
      ["Chalut (trawl)", "Grand filet remorqué par un navire. Il existe des chaluts de fond (bottom trawl) et des chaluts pélagiques (midwater ou pelagic trawl). Leur déploiement fait intervenir des treuils, des funes et des éléments qui maintiennent le filet ouvert. Pour débuter, apprenez à quoi ils servent et où sont les zones dangereuses, sans entreprendre seul les manœuvres."],
      ["Palangre (longline)", "Longue ligne principale munie de nombreuses lignes secondaires et d’hameçons. Elle sert à pêcher certaines espèces. Les hameçons, la tension et les équipements en mouvement présentent des risques."],
      ["Filets, sennes et casiers", "Un gillnet est un filet maillant. Une purse seine est une senne coulissante qui encercle un banc. Les pots ou traps sont des casiers servant notamment à pêcher des crustacés. Les engins permis dépendent du type de pêche et des permis."],
      ["Équipement et environnement", "Préparez un glossaire des termes winch, deck crane, conveyor, hydraulic system, freezer hold, bycatch et discard. Les limites de capture, la protection de l’environnement et le traitement des prises accessoires sont importants. Vérifiez les règles propres au navire."]
    ],
    "Pour cinq méthodes de pêche, dessinez un schéma simple indiquant les équipements et les zones dangereuses.",
    [
      ["Quelle méthode utilise plusieurs hameçons sur une longue ligne ?", ["Longline", "Purse seine", "Gillnet"], "Longline signifie palangre."],
      ["Que signifie bycatch ?", ["Prime salariale", "Prises accessoires", "Vague marine"], "Bycatch désigne les prises non ciblées ou accessoires."]
    ]],
  uk: ["Промислові судна та знаряддя лову", "Робота в морі",
    "Розрізняти трал, ярус, сітки, кошільний невід і пастки та розуміти відповідну термінологію.",
    [
      ["Трал (trawl)", "Велика сітка, яку буксирує судно. Є донні трали (bottom trawl) та пелагічні (midwater або pelagic trawl). Для роботи використовують лебідки, ваєри й елементи розкриття трала. Початківцеві варто вивчити призначення знаряддя й небезпечні зони, перш ніж братися за самостійні операції."],
      ["Ярус (longline)", "Довга основна лінія з багатьма повідцями й гачками. Використовується для лову окремих видів риб. Небезпеку становлять гачки, натяг і рухоме обладнання."],
      ["Сітки, невід і пастки", "Gillnet — зяброва сітка. Purse seine — кошільний невід, що оточує косяк. Pots або traps — пастки, наприклад для ракоподібних. Дозволені знаряддя залежать від виду промислу й дозволів."],
      ["Обладнання та довкілля", "Складіть словник термінів winch, deck crane, conveyor, hydraulic system, freezer hold, bycatch і discard. Важливі ліміти вилову, охорона довкілля й правила поводження з приловом. Уточнюйте правила для конкретного судна."]
    ],
    "Намалюйте по одній простій схемі для п’яти методів лову. Підпишіть обладнання й позначте небезпечну робочу зону.",
    [
      ["Як називається лов кількома гачками на довгій лінії?", ["Longline", "Purse seine", "Gillnet"], "Longline — ярусне знаряддя."],
      ["Що означає bycatch?", ["Премія до зарплати", "Прилов", "Морська хвиля"], "Bycatch — ненавмисний або побічний улов."]
    ]]
},
5: {
  fr: ["Transformation du poisson et qualité", "Usine",
    "Connaître les principales étapes de production et les bases de la salubrité alimentaire.",
    [
      ["Chaîne type", "Réception, tri, refroidissement, découpe ou filetage, contrôle qualité, emballage, étiquetage, entreposage puis expédition. La séquence et les exigences varient selon l’usine. Les opérations peuvent être manuelles ou mécanisées."],
      ["Hygiène et HACCP", "La séparation des zones propres et sales, le lavage des mains, l’utilisation correcte des vêtements et des EPI, le nettoyage de l’équipement, le contrôle des températures et la traçabilité des lots sont essentiels. Le système HACCP permet de repérer et de maîtriser les dangers importants pour les aliments. Les opérations suivent des procédures documentées."],
      ["Compétences en production", "Présentez votre expérience industrielle en parlant de sécurité, de cadence, de vérifications régulières du matériel, de discipline de quart et de volonté d’apprendre. Mentionnez le filetage, la certification HACCP ou le travail sur des systèmes frigorifiques seulement si vous en avez l’expérience."],
      ["Questions d’entrevue courantes", "How do you follow safety procedures? Can you work in cold environments? Are you comfortable with repetitive tasks? What will you do if you notice a quality issue? Donnez des réponses précises et honnêtes à partir de votre expérience en production."]
    ],
    "Écrivez cinq phrases en anglais sur votre expérience industrielle et décrivez uniquement les tâches que vous avez réellement accomplies.",
    [
      ["Que faites-vous si vous remarquez un défaut d’emballage ?", ["Le cacher et continuer", "Le signaler et suivre la procédure", "Accélérer la production"], "La procédure qualité prime sur la cadence."],
      ["Que signifie traceability ?", ["Traçabilité du lot", "Vitesse du convoyeur", "Coefficient salarial"], "La traçabilité permet de retrouver l’origine et le parcours d’un produit."]
    ]],
  uk: ["Рибопереробка та якість", "Завод",
    "Дізнатися про типові етапи виробництва й основи харчової безпеки.",
    [
      ["Типовий виробничий ланцюг", "Приймання сировини, сортування, охолодження, розбирання або філетування, контроль якості, пакування, маркування, зберігання й відвантаження. Послідовність і вимоги залежать від підприємства. Операції можуть бути ручними або механізованими."],
      ["Гігієна та HACCP", "Важливо розділяти чисті й брудні зони, мити руки, правильно користуватися одягом і ЗІЗ, чистити обладнання, контролювати температуру й забезпечувати простежуваність партій. HACCP виявляє й контролює суттєві харчові небезпеки. Операції виконують за задокументованими процедурами."],
      ["Виробничі навички", "Описуючи промисловий досвід, розкажіть про дотримання правил безпеки, темп роботи, регулярний огляд обладнання, дисципліну змін і готовність вчитися. Згадуйте філетування, сертифікат HACCP або обслуговування холодильних систем лише за наявності такого досвіду."],
      ["Типові запитання на співбесіді", "How do you follow safety procedures? Can you work in cold environments? Are you comfortable with repetitive tasks? What will you do if you notice a quality issue? Відповідайте конкретно й чесно, спираючись на власний виробничий досвід."]
    ],
    "Напишіть п’ять речень англійською про свій досвід на виробництві. Зазначайте лише обов’язки, які дійсно виконували.",
    [
      ["Що робити, якщо ви помітили дефект упаковки?", ["Приховати й продовжити", "Повідомити й виконати інструкцію", "Збільшити швидкість"], "Процедура якості важливіша за темп."],
      ["Що означає traceability?", ["Простежуваність партії", "Швидкість стрічки", "Коефіцієнт оплати"], "Простежуваність дає змогу встановити походження та шлях продукції."]
    ]]
},
6: {
  fr: ["Aquaculture et RAS : un parcours technique", "Technique",
    "Comprendre le fonctionnement des piscicultures équipées de systèmes automatisés.",
    [
      ["Cycle de vie", "Incubation des œufs, élevage des alevins ou des smolts, transfert à l’étape suivante, suivi de la santé et de la qualité du milieu. Les installations de production de smolts peuvent comporter des ateliers avec pompes, traitement de l’eau et automatismes."],
      ["RAS", "Un Recirculating Aquaculture System fait recirculer l’eau grâce à la filtration mécanique, la biofiltration, l’oxygénation et les pompes. La température et la qualité de l’eau sont surveillées. L’opérateur relève les mesures, suit les procédures et tient les registres."],
      ["Compétences utiles", "Assemblage et diagnostic mécanique de base, rigueur en entretien, compréhension des capteurs et alarmes, maîtrise de l’informatique et respect des listes de contrôle. Les installations électriques, le matériel dangereux et les tâches biologiques peuvent exiger des habilitations et une formation."],
      ["Entrevue", "Apprenez notamment flow rate, dissolved oxygen, alarm, pump, filtration, preventive maintenance, downtime et batch record. Vérifiez à l’avance si le norvégien est nécessaire en situation d’urgence."]
    ],
    "Étudiez une offre de driftsoperatør. Faites un tableau des compétences acquises, des exigences à confirmer et des sujets à étudier.",
    [
      ["Sur quoi repose principalement un RAS ?", ["La recirculation et le traitement de l’eau", "Le soudage sous-marin", "Le chalutage en eau profonde"], "Un RAS maintient un milieu aquatique contrôlé."],
      ["Comment réagir à une alarme de faible taux d’oxygène ?", ["L’ignorer", "Suivre le protocole d’urgence local et avertir le responsable", "Désactiver le capteur"], "Suivez les procédures pour protéger la santé des poissons et la sécurité."]
    ]],
  uk: ["Аквакультура й RAS: шлях для техніка", "Техніка",
    "Зрозуміти роботу рибницьких господарств з автоматизованими системами.",
    [
      ["Життєвий цикл", "Інкубація ікри, вирощування малька або смолта, перехід до наступної стадії та контроль здоров’я і якості середовища. На підприємствах із вирощування смолта можуть бути цехи з насосами, підготовкою води й автоматикою."],
      ["RAS", "Recirculating Aquaculture System — система рециркуляції води з механічною фільтрацією, біофільтрацією, насиченням киснем, насосами й контролем температури та якості води. Оператор стежить за показами, діє за інструкцією та веде журнали."],
      ["Корисні навички", "Складання та базова діагностика механічних вузлів, дисципліна обслуговування, розуміння датчиків і сигналізації, комп’ютерна грамотність і робота за контрольними списками. Для електромонтажу, обслуговування небезпечного обладнання й біологічних процесів можуть знадобитися допуски та навчання."],
      ["Співбесіда", "Корисно вивчити терміни flow rate, dissolved oxygen, alarm, pump, filtration, preventive maintenance, downtime і batch record. Заздалегідь уточніть, чи потрібна норвезька в аварійних ситуаціях."]
    ],
    "Вивчіть одну вакансію driftsoperatør. Складіть таблицю навичок, які вже маєте, вимог, які треба підтвердити, і тем для навчання.",
    [
      ["Що є основою RAS?", ["Рециркуляція та очищення води", "Підводне зварювання", "Глибоководне тралення"], "RAS підтримує контрольоване водне середовище."],
      ["Що робити, якщо спрацювала сигналізація низького рівня кисню?", ["Проігнорувати", "Діяти за місцевим аварійним протоколом і повідомити відповідального", "Вимкнути датчик"], "Дотримуйтеся процедур, щоб захистити рибу та забезпечити безпеку."]
    ]]
},
7: {
  fr: ["Permis de travail et documents", "Documents",
    "Comprendre les démarches officielles pour une personne de citoyenneté ukrainienne qui réside au Canada.",
    [
      ["Règle de base", "Un permis canadien n’autorise pas à travailler en Norvège. Les ressortissants hors UE et EEE doivent généralement obtenir un permis de séjour norvégien autorisant le travail. La démarche dépend de la citoyenneté, du poste, des qualifications et du contrat."],
      ["Travail saisonnier", "L’UDI exige une offre précise à temps plein et un poste saisonnier. L’employeur doit généralement obtenir une confirmation de NAV qu’il ne trouve pas assez de travailleurs en Norvège ou dans l’EEE. Le permis est temporaire et ne mène pas à la résidence permanente. Si votre famille et votre emploi sont au Canada, évaluez le coût du contrat temporaire. Vérifiez toute annonce qui promet un « visa facile de 6 mois »."],
      ["Travailleur qualifié (skilled worker)", "Le poste doit correspondre à la qualification. L’UDI exige généralement au moins trois années de formation professionnelle au deuxième cycle du secondaire, des études supérieures, ou des qualifications particulières attestées par une longue expérience, en principe d’au moins six ans. L’expérience seule ne garantit pas la reconnaissance. Une année d’école professionnelle peut ne pas suffire pour la voie standard. Faites examiner les documents et le poste précis."],
      ["Dossier de candidature", "Préparez le passeport valide, le CV anglais, le diplôme et son supplément si disponible, les attestations d’emploi avec les tâches et les dates, les références, les justificatifs de langue éventuels et les renseignements sur le permis de conduire. Transmettez les données médicales et les copies de passeport uniquement à des organismes vérifiés qui en font une demande légitime."],
      ["Étapes avant toute dépense", "1. Trouvez la catégorie UDI applicable. 2. Vérifiez que l’employeur peut confirmer l’offre. 3. Contrôlez les pièces et les exigences. 4. Réservez ensuite le voyage et payez la formation ou l’examen médical."]
    ],
    "Dressez la liste de vos preuves d’expérience : entreprise, mois et années de début et de fin, intitulé officiel, tâches et personne pouvant délivrer l’attestation.",
    [
      ["Un permis canadien CUAET autorise-t-il à travailler en Norvège ?", ["Oui", "Non"], "Cette autorisation relève du Canada et ne vaut pas en Norvège."],
      ["L’expérience seule garantit-elle un permis de travailleur qualifié ?", ["Oui", "Non"], "L’UDI examine le type et la preuve des qualifications au regard des exigences du poste."]
    ]],
  uk: ["Дозволи на роботу й документи", "Документи",
    "Розібратися в офіційних можливостях для громадян України, які живуть у Канаді.",
    [
      ["Основне правило", "Канадський дозвіл не дає права працювати в Норвегії. Громадянам країн поза ЄС та ЄЕЗ зазвичай потрібен норвезький дозвіл на проживання з правом на роботу. Порядок залежить від громадянства, посади, кваліфікації й умов договору."],
      ["Сезонна робота", "UDI вимагає конкретну пропозицію на повний робочий день і сезонний характер посади. Роботодавцю зазвичай потрібне підтвердження NAV, що бракує працівників із Норвегії або ЄЕЗ. Дозвіл обмежений у часі й не є шляхом до постійного проживання. Якщо маєте сім’ю й роботу в Канаді, окремо оцініть вартість тимчасового договору. Перевіряйте оголошення, які обіцяють «просту візу на 6 місяців»."],
      ["Кваліфікований працівник (skilled worker)", "Робота має відповідати кваліфікації. UDI зазвичай вимагає щонайменше три роки професійної освіти на рівні старшої середньої школи, вищу освіту або спеціальну кваліфікацію, підтверджену великим досвідом, зазвичай від шести років. Сам досвід не гарантує її визнання. Річного навчання в професійному ліцеї може не вистачити для стандартної процедури. Перевірте документи й вимоги конкретної посади."],
      ["Пакет документів", "Підготуйте чинний закордонний паспорт, англомовне резюме, диплом і додаток за наявності, довідки з попередніх місць роботи з обов’язками й датами, рекомендації, підтвердження рівня мови за наявності та відомості про водійське посвідчення. Медичні дані й копії паспорта передавайте лише перевіреним організаціям за законним запитом."],
      ["Порядок перед витратами", "1. Визначте категорію UDI. 2. Уточніть, чи роботодавець підтвердить пропозицію. 3. Перевірте документи й вимоги. 4. Після цього бронюйте поїздку й сплачуйте за навчання або медогляд."]
    ],
    "Зберіть докази професійного досвіду: підприємство, рік і місяць початку й завершення, офіційна посада, обов’язки та хто може видати довідку.",
    [
      ["Чи можна працювати в Норвегії за канадським дозволом CUAET?", ["Так", "Ні"], "Цей дозвіл діє в Канаді й не дає права працювати в Норвегії."],
      ["Чи гарантує сам досвід дозвіл кваліфікованого працівника?", ["Так", "Ні"], "UDI оцінює вид кваліфікації та її документальне підтвердження разом із вимогами посади."]
    ]]
},
8: {
  fr: ["Contrat, salaire et vérification financière", "Contrat",
    "Calculer le salaire de base et reconnaître les offres douteuses.",
    [
      ["Rémunération en usine", "Depuis le 6 novembre 2026, les minima dans les usines de transformation du poisson couvertes sont de 236,09 NOK/h pour le personnel de production et de 252,09 NOK/h pour les travailleurs qualifiés. Ces taux ne s’appliquent pas automatiquement aux fermes aquacoles ni aux postes à bord. Consultez la page officielle pour les règles supplémentaires sur les quarts et les heures supplémentaires."],
      ["Contrat", "En Norvège, tout travailleur a droit à un contrat écrit. Vérifiez le nom et le numéro d’enregistrement de l’employeur, les tâches, le lieu, la durée, les heures, la rémunération, les quarts, les heures supplémentaires, l’indemnité de congés, le logement, le transport, l’assurance, les retenues et les modalités de fin d’emploi."],
      ["Du salaire brut au revenu net", "Le calculateur indique le revenu brut avant impôts et sans tenir compte des interruptions saisonnières, du logement, du transport ni du déménagement. N’anticipez pas les primes et les retenues. Les navires de pêche peuvent utiliser d’autres modes de rémunération. Calculez d’après le contrat précis."],
      ["Éviter la fraude", "Ne payez pas un intermédiaire inconnu pour un « emploi garanti ». Vérifiez le numéro d’organisation dans les registres de Brønnøysund, le domaine de messagerie, le signataire du contrat, les conditions de l’UDI et les preuves de l’offre. N’envoyez ni photo de carte bancaire, ni mot de passe, ni NAS (SIN), ni paiement de visa vers le compte personnel d’un recruteur."]
    ],
    "Ouvrez le calculateur de salaire et comparez une offre de production et un poste qualifié. Notez les frais réels et les informations manquantes au contrat.",
    [
      ["Les 236,09 NOK/h correspondent-ils à un salaire net ?", ["Oui", "Non, avant les retenues"], "Il s’agit du taux minimum brut fixé pour le secteur concerné."],
      ["Quelle condition s’applique à un emploi régulier en Norvège ?", ["Une promesse orale", "Un contrat écrit", "Une avance versée à un inconnu"], "Le contrat écrit est obligatoire."]
    ]],
  uk: ["Договір, зарплата й фінансова перевірка", "Договір",
    "Обчислювати базову оплату й розпізнавати сумнівні пропозиції.",
    [
      ["Оплата на заводі", "З 6 листопада 2026 року на рибопереробних підприємствах, на які поширюються правила, діє мінімум 236,09 NOK за годину для виробничих працівників і 252,09 NOK за годину для кваліфікованих. Ці ставки не поширюються автоматично на рибні ферми й роботу на суднах. На офіційній сторінці є додаткові правила про зміни й надурочні."],
      ["Договір", "У Норвегії всі працівники мають право на письмовий договір. Перевірте назву й реєстраційний номер роботодавця, обов’язки, місце, строк, години, оплату, зміни, надурочні, відпускні, житло, транспорт, страхування, відрахування та умови припинення роботи."],
      ["Валовий і чистий дохід", "Калькулятор показує валовий дохід до сплати податків без урахування сезонних перерв, житла, транспорту й переїзду. Не припускайте наперед, якими будуть доплати та відрахування. На риболовних суднах можуть діяти окремі форми оплати. Розраховуйте за конкретним договором."],
      ["Захист від шахрайства", "Не платіть невідомому посереднику за «гарантовану вакансію». Перевірте організаційний номер у Brønnøysundregistrene, домен корпоративної пошти, підписанта договору, умови UDI й підтвердження вакансії. Не надсилайте фото картки, паролі, SIN або платіж за візу на особистий рахунок рекрутера."]
    ],
    "Відкрийте калькулятор зарплати й порівняйте дві пропозиції: виробничу й кваліфіковану посаду. Запишіть реальні витрати та відомості, яких бракує в договорі.",
    [
      ["236,09 NOK за годину — це чиста зарплата?", ["Так", "Ні, до відрахувань"], "Це встановлена валова мінімальна ставка для відповідного сектору."],
      ["Яка умова звичайного працевлаштування в Норвегії?", ["Усна обіцянка", "Письмовий договір", "Переказ авансу незнайомцю"], "Письмовий договір обов’язковий."]
    ]]
},
9: {
  fr: ["Anglais professionnel : quart et entrevue", "Langue",
    "S’exercer aux expressions et questions de base pour travailler en sécurité.",
    [
      ["Sécurité", "I did not understand the instruction. Could you repeat slowly? — Je n’ai pas compris la consigne. Pouvez-vous répéter lentement ? Is the machine isolated and safe to work on? — La machine est-elle isolée et peut-on y travailler sans danger ? Where is the muster station? — Où est le point de rassemblement ? Stop the line, please. — Arrêtez la ligne, s’il vous plaît."],
      ["Quart technique", "The pump alarm is on. — L’alarme de la pompe s’est déclenchée. Please show me the maintenance checklist. — Montrez-moi la liste de contrôle de l’entretien. I noticed an unusual noise. — J’ai remarqué un bruit inhabituel. I will report this to the supervisor. — Je vais le signaler au responsable."],
      ["Entrevue", "I work in industrial production in Quebec, Canada. I operate equipment and follow safety procedures. I have previous experience in manufacturing in Poland. I am ready to learn seafood-specific processes. I would need the appropriate Norwegian work authorization before starting."],
      ["Décrire son niveau honnêtement", "Évitez de dire « Yes, I am fluent » si l’anglais parlé reste difficile à comprendre. Dites plutôt : My English is basic, and I am improving it. I can learn standard safety instructions, but I need clear communication and training. L’employeur peut exiger un meilleur niveau pour les postes en mer ou en production à risque."]
    ],
    "Enregistrez cinq questions et réponses sur l’expérience, la sécurité, le travail au froid, la langue et les démarches légales. Comparez ensuite l’enregistrement avec le texte.",
    [
      ["Comment demander de répéter une consigne ?", ["I am finished", "Could you repeat that slowly, please?", "I will ignore it"], "Demander une précision évite les erreurs."],
      ["Comment expliquer honnêtement qu’il vous faut un permis ?", ["I already have a Norwegian permit", "I would need Norwegian work authorization", "There are no rules"], "Ne prétendez pas détenir un permis que vous n’avez pas."]
    ]],
  uk: ["Професійна англійська: зміна й співбесіда", "Мова",
    "Відпрацювати основні фрази й запитання для безпечної роботи.",
    [
      ["Безпека", "I did not understand the instruction. Could you repeat slowly? — Я не зрозумів інструкцію. Повторіть повільніше, будь ласка. Is the machine isolated and safe to work on? — Чи обладнання ізольовано й чи безпечно з ним працювати? Where is the muster station? — Де місце збору? Stop the line, please. — Зупиніть лінію, будь ласка."],
      ["Технічна зміна", "The pump alarm is on. — Спрацювала аварійна сигналізація насоса. Please show me the maintenance checklist. — Покажіть, будь ласка, контрольний список для обслуговування. I noticed an unusual noise. — Я помітив незвичний шум. I will report this to the supervisor. — Я повідомлю керівнику."],
      ["Співбесіда", "I work in industrial production in Quebec, Canada. I operate equipment and follow safety procedures. I have previous experience in manufacturing in Poland. I am ready to learn seafood-specific processes. I would need the appropriate Norwegian work authorization before starting."],
      ["Чесна оцінка рівня", "Не кажіть «Yes, I am fluent», якщо ще складно розуміти живу мову. Краще сказати: My English is basic, and I am improving it. I can learn standard safety instructions, but I need clear communication and training. Для роботи в морі або на небезпечному виробництві роботодавець може вимагати вищого рівня."]
    ],
    "Запишіть голосом п’ять запитань і відповідей про досвід, безпеку, роботу в холодному цеху, мову та законне оформлення. Порівняйте запис із текстом.",
    [
      ["Як попросити повторити інструкцію?", ["I am finished", "Could you repeat that slowly, please?", "I will ignore it"], "Уточнення допомагає уникнути помилки."],
      ["Як чесно пояснити, що вам потрібен дозвіл?", ["I already have a Norwegian permit", "I would need Norwegian work authorization", "There are no rules"], "Не заявляйте про дозвіл, якого не маєте."]
    ]]
},
10: {
  fr: ["De la candidature au premier jour", "Mise en pratique",
    "Suivre les étapes de préparation en évitant les paiements prématurés et les envois en masse.",
    [
      ["Établir les priorités", "Commencez par examiner l’employeur et le poste. Privilégiez les offres officielles toujours ouvertes dont les exigences linguistiques sont accessibles et la procédure d’immigration claire. Gardez les fiches sans contact pour poursuivre vos recherches."],
      ["Questions avant d’envoyer le CV", "Si la démarche légale est incertaine, adressez des questions brèves et ciblées aux RH : l’entreprise considère-t-elle les candidats hors EEE, peut-elle confirmer l’offre auprès de l’UDI, et à quelle catégorie de permis s’attend-elle ? Évitez les envois automatiques."],
      ["Suivi des versions", "Notez pour chaque candidature le poste, la date de vérification, la source, la version validée du CV, la date d’envoi, la réponse et l’échéance de relance. Vous conserverez un historique si le contact est interrompu."],
      ["Vérification avant le départ", "Vérifiez le permis, le contrat officiel, le logement, le transport, le budget du premier mois, les coordonnées de l’employeur et, si nécessaire, l’examen médical et les certificats. Avant de quitter votre emploi au Canada, vérifiez le statut de toute votre famille, votre épargne de précaution et les conséquences du déménagement."]
    ],
    "Évaluez votre préparation pour trois entreprises de la base et notez le principal obstacle pour chacune.",
    [
      ["Faut-il envoyer automatiquement son CV à toutes les entreprises du registre ?", ["Oui", "Non, il faut d’abord vérifier"], "Il faut un besoin de recrutement actuel, un profil adapté et une démarche légale."],
      ["Que faire avant d’obtenir le permis de travail ?", ["Démissionner et acheter un billet", "Confirmer d’abord les conditions et documents"], "Cela réduit le risque de dépenses inutiles et de perte de l’emploi actuel."]
    ]],
  uk: ["Від заявки до першого робочого дня", "Практика",
    "Послідовно підготуватися без ризику передчасних платежів і масової розсилки.",
    [
      ["Визначення пріоритетів", "Спершу вивчіть роботодавця й посаду. Надавайте перевагу чинним офіційним вакансіям із доступними мовними вимогами й зрозумілою імміграційною процедурою. Реєстрові записи без контакту залиште для подальшої перевірки."],
      ["Запитання перед надсиланням резюме", "Якщо порядок законного оформлення неясний, зверніться до відділу кадрів із короткими запитаннями. Чи розглядають кандидатів поза ЄЕЗ? Чи готовий роботодавець підтвердити пропозицію в UDI? Яку категорію дозволу очікують? Уникайте автоматичної розсилки."],
      ["Контроль версій", "Для кожної заявки запишіть вакансію, дату перевірки, джерело, узгоджену версію резюме, дату надсилання, відповідь і строк повторного звернення. Якщо зв’язок перерветься, залишиться історія."],
      ["Перевірка перед від’їздом", "Перевірте дозвіл, офіційний договір, план щодо житла, транспорт, бюджет на перший місяць, контакти роботодавця та за потреби медогляд і сертифікати. Перед звільненням у Канаді перевірте статус усієї сім’ї, фінансовий резерв і наслідки переїзду."]
    ],
    "Оцініть готовність для трьох компаній у базі й позначте головну перешкоду для кожної.",
    [
      ["Чи варто автоматично розсилати резюме всім компаніям із реєстру?", ["Так", "Ні, спершу перевірка"], "Потрібні чинна потреба в працівниках, відповідність посаді й законний порядок оформлення."],
      ["Що розумно зробити до отримання дозволу на роботу?", ["Звільнитися й купити квиток", "Спершу підтвердити умови й документи"], "Це зменшує ризик зайвих витрат і втрати теперішньої роботи."]
    ]]
}
};

window.QX_LEGACY_MODULES = Object.fromEntries(['fr', 'uk'].map(lang => [
  lang,
  modules.map(source => {
    const [title, level, goal, sections, practice, questions] = copy[source.id][lang];
    return {
      ...source,
      title, level, goal, sections, practice,
      duration: source.duration.replace(' минут', lang === 'fr' ? ' min' : ' хв'),
      questions: source.questions.map((original, index) => {
        const [q, options, explanation] = questions[index];
        return {...original, q, options, explanation};
      })
    };
  })
]));
})();
