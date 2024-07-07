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
  const localization = window.applicationConstants.localization;

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
  window.localStorage.setItem('language', translateTo);

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

window.addEventListener('DOMContentLoaded', () => {
  if (window.applicationState.language !== 'uk') {
    handleLocalize().then();
  }
});

window.addEventListener('load', async () => {
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
