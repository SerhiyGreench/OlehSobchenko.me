const currentTheme = window.applicationState.theme.get();

if (currentTheme === 'dark') {
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

        blockquote:before {
          background-image: url('data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.275 13.5L6 10.5C5.175 10.5 4.46875 10.2063 3.88125 9.61875C3.29375 9.03125 3 8.325 3 7.5C3 6.675 3.29375 5.96875 3.88125 5.38125C4.46875 4.79375 5.175 4.5 6 4.5C6.825 4.5 7.53125 4.79375 8.11875 5.38125C8.70625 5.96875 9 6.675 9 7.5C9 7.7875 8.96562 8.05313 8.89687 8.29688C8.82812 8.54063 8.725 8.775 8.5875 9L6 13.5H4.275ZM11.025 13.5L12.75 10.5C11.925 10.5 11.2187 10.2063 10.6312 9.61875C10.0437 9.03125 9.75 8.325 9.75 7.5C9.75 6.675 10.0437 5.96875 10.6312 5.38125C11.2187 4.79375 11.925 4.5 12.75 4.5C13.575 4.5 14.2812 4.79375 14.8687 5.38125C15.4562 5.96875 15.75 6.675 15.75 7.5C15.75 7.7875 15.7156 8.05313 15.6469 8.29688C15.5781 8.54063 15.475 8.775 15.3375 9L12.75 13.5H11.025ZM6 8.625C6.3125 8.625 6.57812 8.51563 6.79687 8.29688C7.01562 8.07813 7.125 7.8125 7.125 7.5C7.125 7.1875 7.01562 6.92188 6.79687 6.70313C6.57812 6.48438 6.3125 6.375 6 6.375C5.6875 6.375 5.42187 6.48438 5.20312 6.70313C4.98437 6.92188 4.875 7.1875 4.875 7.5C4.875 7.8125 4.98437 8.07813 5.20312 8.29688C5.42187 8.51563 5.6875 8.625 6 8.625ZM12.75 8.625C13.0625 8.625 13.3281 8.51563 13.5469 8.29688C13.7656 8.07813 13.875 7.8125 13.875 7.5C13.875 7.1875 13.7656 6.92188 13.5469 6.70313C13.3281 6.48438 13.0625 6.375 12.75 6.375C12.4375 6.375 12.1719 6.48438 11.9531 6.70313C11.7344 6.92188 11.625 7.1875 11.625 7.5C11.625 7.8125 11.7344 8.07813 11.9531 8.29688C12.1719 8.51563 12.4375 8.625 12.75 8.625Z" fill="white"/></svg>');
        }
     }
  `));

  document.head.appendChild(style);
}

window.applicationState.theme.subscribe(state => {
  const toggled = document.body.classList.contains('dark-theme');

  if (!toggled && state === 'dark') {
    document.body.classList.toggle('dark-theme');
  }

  if (toggled && state === 'light') {
    document.body.classList.toggle('dark-theme');
  }
});

const handleSwitchThemes = () => {
  const current = window.applicationState.theme.get();

  window.applicationState.theme.set(current === 'dark' ? 'light' : 'dark');
};

const handleLocalize = lang => {
  window.applicationState.language.set(lang);
};

const handleLanguageSelect = lang => {
  handleLocalize(lang);
};

const handleLanguageSwitch = () => {
  const switcher = document.querySelector('#language-switcher');

  if (!switcher) {
    return;
  }

  const lang = switcher.getAttribute('data-translate-to');
  handleLocalize(lang);
};

window.applicationState.language.subscribe(lang => {
  renderLanguageChange(lang);
  translateApplicationTo(lang).then();
});

const translateApplicationTo = async lang => {
  await renderPosts('posts-container', lang);

  const elements = document.querySelectorAll('[data-localization-key]');
  const localization = window.applicationConstants.localization;

  elements.forEach(e => {
    const key = e.getAttribute('data-localization-key');
    const value = localization[lang][key];

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
};

const renderLanguageChange = (lang) => {
  const listLanguageItems = document.getElementsByClassName(
    'full-language-selector',
  );

  for (const list of listLanguageItems || []) {
    for (const element of list.children) {
      const elLang = element.getAttribute('data-language-item');

      if (elLang === lang) {
        element.classList.add('selected');
      } else {
        element.classList.remove('selected');
      }
    }
  }

  const switcher = document.querySelector('#language-switcher');

  if (!switcher) {
    return;
  }

  const alternateLang = lang === 'uk' ? 'en' : 'uk';

  switcher.setAttribute('data-translate-to', alternateLang);
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

window.addEventListener('load', async () => {
  window.applicationState.theme.notify();
  window.applicationState.language.notify();

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

  document.querySelectorAll(
    '[data-remove-on-load=true]',
  ).forEach(e => {
    e.remove();
  });

  document.querySelectorAll('.selector-language-item').forEach(e => {
    e.addEventListener('click', () => {
      handleLanguageSelect(e.getAttribute('data-language-item'));
    });
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
