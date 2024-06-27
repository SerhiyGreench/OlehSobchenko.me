const localStorageThemeKey = 'website_theme';
const savedTheme = localStorage.getItem(localStorageThemeKey);

if (savedTheme === 'dark') {
  const style = document.createElement('style');

  style.setAttribute('data-remove-on-load', true);

  style.appendChild(document.createTextNode(`
         :root {
          --bg-color: #000000;
          --main-color: #FFFFFF;

          --input-placeholder-color: rgba(255, 255, 255, 0.5);

          --gradient-background-color-start: rgba(0, 0, 0, 0);
          --gradient-background-color-end: rgba(0, 0, 0, 1);

          --scrollbar-thumb-color: #646464;
          --scrollbar-thumb-color-hovered: #CCCCCC;

          --display-dark-theme-icon: none;
          --display-light-theme-icon: block;
        }
      `));

  document.head.appendChild(style);
}

const saveThemePreference = () => {
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('website_theme', 'dark');
  } else {
    localStorage.setItem('website_theme', 'kight');
  }
}

window.addEventListener('load', () => {
  document.querySelectorAll(
    '[data-remove-on-load=true]',
  ).forEach(e => {
    e.remove();
  });

  const savedTheme = localStorage.getItem(localStorageThemeKey);

  if (!savedTheme) {
    saveThemePreference();

    return;
  }

  if (savedTheme === 'dark') {
    document.body.classList.toggle('dark-theme')
  }
});

const handleSwitchThemes = () => {
  document.body.classList.toggle('dark-theme');

  saveThemePreference();
};

const localization = {
  uk: {
    "person-full-name": "Олег Собченко",
    "person-name": "ОЛЕГ",
    "person-last-name": "СОБЧЕНКО",
    "biography-title": "БІОГРАФІЯ",
    "person-main-quote": "ХОЧУ ЩОБ ВСІ БУЛИ ЗЛІ, ВЕСЕЛІ І ДОБРЕ ПОЧУВАЛИСЯ",
    "categories-title": "КАТЕГОРІЇ",
    "tags-title": "ТЕГИ",
    "life-title": "ЖИТТЄПИС",
    "search-input-placeholder": "Пошук...",
    "language-title": "МОВА",
    "search-results-title": "Результати",
    "post-link-text": "ВІДКРИТИ ПОСИЛАННЯ",
    "person-main-quote-main-description": "Хочу щоб всі були злі, веселі і добре почувалися",
    "biography-article": `
          <p>Олег Андрійович Собченко (нар. 4 грудня 1973, Корсунь-Шевченківський — пом. 24 січня 2023) — український громадський діяч, військовик. Активіст Євромайдану. Учасник російсько-української війни з 2014, герой оборони Києва у березні 2022, що згідно деяких оцінок був одним з тих, хто врятував Київ від захоплення росіянами.</p>

          <h2>Життєпис до 2022</h2>
          <p>Народився 4 грудня 1973 у Корсунь-Шевченківському Черкаської області, закінчив там школу і надалі проживав. Був підприємцем.

          <p>Олег Собченко був активним членом фонду Героїка, що боровся за увічнення памяті про борців за державність України. Як тесляр і каменяр Олег Собченко впродовж багатьох років безкорисливо працював над відновленням памятників. Згідно спогадів речника Генштабу ЗСУ Андрія Ковальова саме Собченко реалізовував всі масштабні проєкти "Героїки" своїми руками.</p>

          <p>Олег Собченко був учасником багатьох патріотичних вуличних акцій, зокрема Мовного Майдану.</p>

          <p>З початком Революції Гідності став її активістом, був сотником Самооборони Майдану. Під час протистояння з Беркутом у Черкасах отримав чисельні забої. 20 лютого 2019 за заслуги під час Революції Гідності Олег Собченко отримав Орден «За мужність» III ступеня.</p>

          <p>З початком 2014 Російсько-української війни воював до 2016 у складі одного з підрозділів батальйону Азов який з жовтня 2014 став полком «Азов».</p>

          <p>Після повернення після служби в Азові до Корсуня-Шевченківського боровся щоб врятувати річку Рось від забруднення і обміління.</p>

          <h2>Участь у війні з Росією у 2022-23 роках</h2>
          <p>З початком повномасштабного вторгнення у лютому 2022 долучився до 72 омбр ім. Чорних Запорожців оператором-аеророзвідником. На початку березня 2022 року брав участь в битві за Київ: боях у районі Лютіж — Демидів — Козаровичі, в тому числі — за греблю в Козаровичах та за село Мощун.</p>

          <p>3 травня 2022 року за особисту мужність і самовіддані дії, виявлені у захисті державного суверенітету та територіальної цілісності України, вірність військовій присязі Олег Собченко отримав Орден «За мужність» II ступеня.</p>

          <p>Загинув 24 січня 2023 року від отриманих поранень у результаті російського артилерійського обстрілу в м. Вугледар на Донеччині. Похований у м. Корсунь-Шевченківський на Черкащині.</p>

          <h2>Вшанування пам'яті</h2>
          <p>У місті Корсунь-Шевченківський перейменували вулицю 4-ту Гвардійську іменем Олега Собченка.</p>

          <h2>Нагороди</h2>
          <p>
          Орден «За мужність» I ступеня (16 серпня 2023, посмертно) — за особисту мужність, виявлену у захисті державного суверенітету та територіальної цілісності України, самовіддане виконання військового обов’язку
          Орден «За мужність» II ступеня (3 травня 2022) — за особисту мужність і самовіддані дії, виявлені у захисті державного суверенітету та територіальної цілісності України, вірність військовій присязі
          Орден «За мужність» IIІ ступеня (20 лютого 2019) — за громадянську мужність, самовіддане відстоювання конституційних засад демократії, прав і свобод людини, виявлені під час Революції Гідності, плідну громадську та волонтерську діяльність
          Нагрудний знак «Учасник АТО»
          Медаль «За жертовність і любов до України» Української православної церкви Київського патріархату.
          </p>
        `,

    "language": "ENG",
  },
  en: {
    "person-full-name": "Oleh Sobchenko",
    "person-name": "OLEH",
    "person-last-name": "SOBCHENKO",
    "biography-title": "BIOGRAPHY",
    "person-main-quote": "I WANT EVERYONE TO BE ANGRY, CHEERFUL, AND FEEL GOOD",
    "categories-title": "CATEGORIES",
    "tags-title": "TAGS",
    "life-title": "STORY OF LIFE",
    "search-input-placeholder": "Search...",
    "language-title": "LANGUAGE",
    "search-results-title": "Results",
    "post-link-text": "OPEN LINK",
    "person-main-quote-main-description": "I want everyone to be angry, cheerful, and feel good",
    "biography-article": `
          <p>Oleh Andriyovych Sobchenko (born December 4, 1973, Korsun-Shevchenkivskyi – died January 24, 2023) was a Ukrainian public figure and military serviceman. He was an activist of the Euromaidan and a participant in the Russo-Ukrainian War since 2014. He was a hero of the defense of Kyiv in March 2022 and, according to some estimates, was one of those who saved Kyiv from being captured by the Russians.</p>

          <h2>Biography until 2022</h2>
          <p>Oleh Sobchenko was born on December 4, 1973, in Korsun-Shevchenkivskyi, Cherkasy region, where he finished school and continued to live. He was an entrepreneur.</p>

          <p>Oleh Sobchenko was an active member of the Heroika Foundation, which fought to commemorate the memory of those who fought for Ukrainian statehood. As a carpenter and stonemason, Sobchenko worked selflessly for many years on restoring monuments. According to the recollections of the spokesperson for the General Staff of the Armed Forces of Ukraine, Andriy Kovalov, Sobchenko implemented all of Heroika's large-scale projects with his own hands.</p>

          <p>Oleh Sobchenko participated in many patriotic street actions, including the Language Maidan.</p>

          <p>With the start of the Revolution of Dignity, he became an activist and was a centurion of the Maidan Self-Defense. During clashes with the Berkut in Cherkasy, he sustained numerous bruises. On February 20, 2019, for his merits during the Revolution of Dignity, Oleh Sobchenko was awarded the Order "For Courage" III degree.</p>

          <p>With the onset of the Russo-Ukrainian War in 2014, he fought until 2016 as part of one of the Azov battalion units, which became the Azov regiment in October 2014.</p>

          <p>After returning from service in Azov to Korsun-Shevchenkivskyi, he fought to save the Ros River from pollution and shallowing.</p>

          <h2>Participation in the war with Russia in 2022-23</h2>
          <p>With the start of the full-scale invasion in February 2022, he joined the 72nd Mechanized Brigade named after the Black Zaporozhians as a drone operator. In early March 2022, he participated in the Battle of Kyiv, fighting in the area of Lytizh – Demydiv – Kozarovychi, including the battle for the Kozarovychi dam and the village of Moschun.</p>

          <p>On May 3, 2022, for personal courage and selfless actions shown in the defense of the state sovereignty and territorial integrity of Ukraine, and loyalty to the military oath, Oleh Sobchenko was awarded the Order "For Courage" II degree.</p>

          <p>He died on January 24, 2023, from wounds sustained as a result of Russian artillery shelling in Vuhledar, Donetsk region. He was buried in Korsun-Shevchenkivskyi, Cherkasy region.</p>

          <h2>Commemoration</h2>
          <p>In Korsun-Shevchenkivskyi, the 4th Guards Street was renamed in honor of Oleh Sobchenko.</p>

          <h2>Awards</h2>
          <p>
          Order "For Courage" I degree (August 16, 2023, posthumously) — for personal courage shown in the defense of state sovereignty and territorial integrity of Ukraine, and selfless performance of military duty<br>
          Order "For Courage" II degree (May 3, 2022) — for personal courage and selfless actions shown in the defense of state sovereignty and territorial integrity of Ukraine, and loyalty to the military oath<br>
          Order "For Courage" III degree (February 20, 2019) — for civil courage, selfless defense of constitutional principles of democracy, human rights and freedoms shown during the Revolution of Dignity, and fruitful public and volunteer activities<br>
          Badge "Participant of the ATO"<br>
          Medal "For Sacrifice and Love for Ukraine" of the Ukrainian Orthodox Church of the Kyiv Patriarchate
          </p>
        `,

    "language": "УКР",
  },
};

const handleLanguageSelect = (lang) => {
  const id = 'language-item-' + lang;
  const element = document.getElementById(id);

  if (!element.classList.contains('selected')) {
    handleLocalize().then();
  }
};

const handleLocalize = async () => {
  const switcher = document.getElementById('language-switcher');

  if (!switcher) {
    return;
  }

  const translateTo = String(
    switcher.getAttribute('data-translate-to'),
  );
  const translateFrom = String(
    switcher.getAttribute('data-translate-from'),
  );

  await renderPosts('posts-container', translateTo);

  const elements = document.querySelectorAll('[data-localization-key]');

  elements.forEach(e => {
    const key = e.getAttribute('data-localization-key');
    const value = localization[translateTo][key];

    if (e.tagName === 'INPUT') {
      e.placeholder = value;

      return;
    }

    if (e.className.includes('rich-article')) {
      const newArticle = document.createElement('span');

      newArticle.innerHTML = value;

      e.replaceChildren(newArticle);

      return;
    }

    e.innerText = value;
  });

  switcher.setAttribute('data-translate-to', translateFrom);
  switcher.setAttribute('data-translate-from', translateTo);

  const idTranslateTo = 'language-item-' + translateTo;
  const idTranslateFrom = 'language-item-' + translateFrom;

  const translateToItem = document.getElementById(idTranslateTo);
  const translateFromItem = document.getElementById(idTranslateFrom);

  window.applicationState.language = translateTo;

  if (translateToItem) {
    translateToItem.classList.add('selected');
  }

  if (translateFromItem) {
    translateFromItem.classList.remove('selected');
  }
};

const handleScrollDownScreenHeight = () => {
  const mainPart = document.getElementById('main-part');
  const clientHeight = mainPart.getBoundingClientRect().height;
  const scrollTop = document.documentElement.scrollTop;

  window.scrollBy({
    top: scrollTop < clientHeight
      ? clientHeight - scrollTop
      : 0
    ,
    left: 0,
    behavior: 'smooth',
  });
};

const openModal = id => {
  const modal = document.getElementById(id);

  modal.classList.add('open');
  document.body.classList.add('simple-modal-open');

  modal.querySelectorAll('[autofocus]').forEach(e => {
    e.focus();
  });
};

const closeModal = () => {
  document.querySelector('.simple-modal.open').classList.remove('open');
  document.body.classList.remove('simple-modal-open');
};

window.addEventListener('load', function () {
  document.addEventListener('click', event => {
    if (event.target.classList.contains('simple-modal')) {
      closeModal();
    }
  });

  document.querySelectorAll('.collapsible-container').forEach(element => {
    for (const title of element.getElementsByClassName('container-title')) {
      title.addEventListener(
        'click',
        () => handleCollapsibleContainer(element.id),
      );
    }
  });
});

const handleCollapsibleContainer = (id) => {
  const modal = document.getElementById(id);

  if (modal.classList.contains('open')) {
    modal.classList.remove('open');

    return;
  }

  modal.classList.add('open');
};

const handlePlay = () => {
  document.body.classList.toggle('playing-state');
};
