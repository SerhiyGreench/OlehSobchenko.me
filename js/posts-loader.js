/**
 * @typedef {Object} Localization
 * @property {string} uk
 * @property {string} en
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {Localization} name
 */

/**
 * @typedef {Object} Type
 * @property {string} id
 * @property {Localization} name
 * @property {string} [icon]
 */

/**
 * @typedef {Object} LinkItem
 * @property {string} common
 * @property {Localization} [localization]
 */

/**
 * @typedef {Object} PostImage
 * @property {string} [data]
 * @property {LinkItem} [link]
 */

/**
 * @typedef {Object} PostVideo
 * @property {LinkItem} [link]
 * @property {string} [data]
 */

/**
 * @typedef {Object} PostAudio
 * @property {string} [name]
 * @property {string} [description]
 * @property {LinkItem} [link]
 */

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} path
 * @property {Localization} [title]
 * @property {string} [categoryId]
 * @property {string} [typeId]
 * @property {Type} [type]
 * @property {Category} [category]
 * @property {string} [createdAt]
 * @property {string} [happenedAt]
 * @property {Localization} [shortDescription]
 * @property {Localization} [description]
 * @property {Localization} [quote]
 * @property {LinkItem} [link]
 * @property {PostImage} [image]
 * @property {PostVideo} [video]
 * @property {PostAudio} [audio]
 */

/**
 * @typedef {Object} PostRenderOptions
 * @property {HTMLElement} rootElement
 * @property {Post} post
 * @property {'uk' | 'en'} lang
 * @property {boolean} [short]
 */

/**
 * Reads a JSON file and parses its content.
 *
 * @param {string} filePath - The path to the JSON file.
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON
 *   content.
 */
function readJsonFile(filePath) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.responseType = 'json';

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error(`Failed to load JSON file: ${ xhr.statusText }`));
      }
    };

    xhr.onerror =
      () => reject(new Error('Network error occurred while loading JSON file'));
    xhr.send();
  });
}

/**
 * Gets array of post types
 *
 * @returns {Promise<Type[]>}
 */
const getTypes = async () => {
  return readJsonFile('/data/types.json');
}

/**
 * Gets array of post categories
 *
 * @returns {Promise<Category[]>}
 */
const getCategories = async () => {
  return readJsonFile('/data/categories.json');
}

/**
 * Gets array of post categories
 *
 * @returns {Promise<Post[]>}
 */
const getRawPosts = async () => {
  return readJsonFile('/data/posts.json');
}

const getLocalized = (item, lang) => {
  if (item) {
    return item[lang];
  }

  return null;
}

/**
 * Gets array of posts from website data
 *
 * @returns {Promise<Post[]>}
 */
const getPosts = async () => {
  if (window.applicationState.postsCache) {
    return window.applicationState.postsCache;
  }

  const [categories, types, rawPosts] = await Promise.all([
    getCategories(),
    getTypes(),
    getRawPosts(),
  ]);
  const posts = rawPosts.map(post => {
    const category = categories.find(c => c.id === post.categoryId);
    const type = types.find(t => t.id === post.typeId);

    Object.assign(post, { category, type });

    return post;
  });

  window.applicationState.postsCache = posts;

  return posts;
}

/**
 * Renders post header icon
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderHeaderIcon = options => {
  const { rootElement, post } = options;
  const type = post.type;

  if (!type) {
    return;
  }

  const iconContainer = document.createElement('div');
  const iconSpan = document.createElement('span');
  const iconDoc = new DOMParser().parseFromString(
    type.icon,
    'application/xml',
  );

  iconSpan.appendChild(
    iconSpan.ownerDocument.importNode(
      iconDoc.documentElement,
      true,
    ),
  );
  iconContainer.classList.add('post-header-icon');
  iconContainer.appendChild(iconSpan);
  rootElement.appendChild(iconContainer);
};

/**
 * Renders post header
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderHeaderTitle = options => {
  const { rootElement, lang, post } = options;
  const category = post.category;
  const type = post.type;

  if (!category && !type) {
    return;
  }

  const all = category && type;
  const postHeader = document.createElement('div');

  postHeader.classList.add('post-header-title');

  if (type) {
    const typePart = document.createElement('span');

    typePart.innerText = type.name[lang]?.toUpperCase();
    postHeader.appendChild(typePart);
  }

  if (all) {
    const divider = document.createElement('span');

    divider.classList.add('post-header-title-divider');
    postHeader.appendChild(divider);
  }

  if (category) {
    const categoryPart = document.createElement('span');

    categoryPart.innerText = category.name[lang]?.toUpperCase();
    postHeader.appendChild(categoryPart);
  }

  rootElement.appendChild(postHeader);
};

/**
 * Renders post date
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderDate = options => {
  const { rootElement, post } = options;

  if (!post.happenedAt) {
    return;
  }

  const [date] = post.happenedAt.split('T');
  const postDate = document.createElement('div');

  postDate.classList.add('post-date');
  postDate.innerText = date;
  rootElement.appendChild(postDate);
};

/**
 * Renders post image
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderImage = options => {
  const { rootElement, lang, post } = options;
  const image = post.image

  if (!image) {
    return;
  }

  const imgWrapper = document.createElement('div');
  const imgElement = document.createElement('img');

  if (image.data) {
    imgElement.src = image.data;
  }

  if (image.link) {
    imgElement.src = getLocalized(image.link.localization, lang) ||
      image.link.common;
  }

  imgElement.classList.add('post-image');
  imgWrapper.classList.add('post-image-wrapper');
  imgWrapper.appendChild(imgElement);
  rootElement.appendChild(imgWrapper);
};

/**
 * Renders post image
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderVideo = options => {
  const { rootElement, lang, post } = options;
  const video = post.video;

  if (!video) {
    return;
  }

  const videoContainerElement = document.createElement('div');
  const wrapperElement = document.createElement('div');

  if (video.link && !video.data) {
    const videoElement = document.createElement('video');

    videoElement.src = getLocalized(video.link.localization, lang) ||
      video.link.common;

    wrapperElement.appendChild(videoElement);
  }

  if (video.data) {
    wrapperElement.innerHTML = video.data;
  }

  wrapperElement.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
  });
  videoContainerElement.classList.add('post-video');
  wrapperElement.classList.add('post-video-wrapper');
  videoContainerElement.appendChild(wrapperElement);
  rootElement.appendChild(videoContainerElement);
};

/**
 * Renders post title
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderTitle = options => {
  const { rootElement, lang, post } = options;
  const title = post.title;

  if (!title) {
    return;
  }

  const titleElement = document.createElement('div');

  titleElement.innerText = title[lang]?.toUpperCase();
  titleElement.classList.add('post-title');
  rootElement.appendChild(titleElement);
};

/**
 * Truncates HTML formatted text
 *
 * @param {string} html
 * @param {number} maxCharacters
 * @returns {{truncated: boolean, html: string}}
 */
const truncateHTML = (html, maxCharacters) => {
  const div = document.createElement('div');
  let currentLength = 0;
  let ellipsisAdded = false;

  div.innerHTML = html;

  function truncateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (currentLength + node.length > maxCharacters) {
        node.data = node.data.substring(0, maxCharacters - currentLength)
          + '...';
        ellipsisAdded = true;
      } else {
        currentLength += node.length;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'BLOCKQUOTE') {
        return;
      }

      for (let i = 0; i < node.childNodes.length; i++) {
        if (ellipsisAdded) {
          node.removeChild(node.childNodes[i--]);
        } else {
          truncateNode(node.childNodes[i]);
        }
      }
    }
  }

  truncateNode(div);

  return { truncated: ellipsisAdded, html: div.innerHTML };
};

/**
 * Renders post description
 *
 * @param {PostRenderOptions} options
 * @returns {boolean}
 */
const renderDescription = options => {
  const { rootElement, lang, post } = options;
  const shortDescription = post.shortDescription;
  const description = post.description;

  if (!description && !shortDescription) {
    return false;
  }

  const descriptionContainerElement = document.createElement('div');

  if (shortDescription) {
    const shortDescriptionElement = document.createElement('span');
    const spaceElement = document.createElement('span');

    spaceElement.innerText = ' ';
    shortDescriptionElement.innerHTML = shortDescription[lang];
    descriptionContainerElement.append(shortDescriptionElement, spaceElement);
  }

  if (description) {
    const descriptionElement = document.createElement('span');
    const fullHtml = description[lang];

    const { html, truncated } = options.short
      ? truncateHTML(
        fullHtml,
        window.applicationConstants.maxDescriptionLength,
      )
      : { html: fullHtml, truncated: false }
    ;

    descriptionElement.innerHTML = html;
    descriptionContainerElement.appendChild(descriptionElement);

    descriptionContainerElement.classList.add('post-description');
    rootElement.appendChild(descriptionContainerElement);

    return truncated;
  }

  descriptionContainerElement.classList.add('post-description');
  rootElement.appendChild(descriptionContainerElement);

  return false;
};

/**
 * Renders post audio
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderAudio = options => {
  const { rootElement, lang, post } = options;
  const audio = post.audio;

  if (!audio) {
    return;
  }

  const audioContainerElement = document.createElement('div');
  const audioIconElement = document.createElement('div');

  audioIconElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
  `;
  audioIconElement.classList.add('post-audio-icon');
  audioContainerElement.appendChild(audioIconElement);

  if (audio.name || audio.description) {
    const postAudioText = document.createElement('div');

    if (audio.name) {
      const audioNameElement = document.createElement('div');

      audioNameElement.innerText =
        getLocalized(audio.name, lang)?.toUpperCase();
      audioNameElement.classList.add('post-audio-name');
      postAudioText.appendChild(audioNameElement);
    }

    if (audio.description) {
      const audioDescriptionElement = document.createElement('div');

      audioDescriptionElement.innerText = getLocalized(audio.description, lang);
      audioDescriptionElement.classList.add('post-audio-description');
      postAudioText.appendChild(audioDescriptionElement);
    }

    postAudioText.classList.add('post-audio-text');
    audioContainerElement.appendChild(postAudioText);
  }

  audioContainerElement.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
  });
  audioContainerElement.classList.add('post-audio');
  rootElement.appendChild(audioContainerElement);
};

/**
 * Renders post quote
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderQuote = options => {
  const { rootElement, lang, post } = options;
  const quote = post.quote;

  if (!quote) {
    return;
  }

  const quoteElement = document.createElement('div');
  const blockquoteElement = document.createElement('blockquote');

  blockquoteElement.innerText = quote[lang];

  quoteElement.appendChild(blockquoteElement);
  quoteElement.classList.add('post-quote');
  rootElement.appendChild(quoteElement);
};

/**
 * Renders post link
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderLink = options => {
  const { rootElement, lang, post } = options;
  const link = post.link;

  if (!link) {
    return;
  }

  const linkContainerElement = document.createElement('div');
  const url = getLocalized(post.link.localization, lang) ||
    post.link.common;

  linkContainerElement.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();

    window.open(url, '_blank').focus();
  });

  const linkTextElement = document.createElement('div');
  const linkIconElement = document.createElement('div');

  linkTextElement.innerText =
    window.applicationConstants.localization[lang]['post-link-text'];
  linkTextElement.setAttribute('data-localization-key', 'post-link-text');
  linkIconElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
  `;

  linkContainerElement.append(
    linkTextElement,
    linkIconElement,
  );

  linkContainerElement.classList.add('post-link');
  rootElement.appendChild(linkContainerElement);
};

/**
 * Renders post open full button
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderOpenFull = options => {
  const { rootElement, lang } = options;
  const textElement = document.createElement('div');
  const iconElement = document.createElement('div');
  const containerElement = document.createElement('div');

  textElement.innerText =
    window.applicationConstants.localization[lang]['post-open-full'];
  textElement.setAttribute('data-localization-key', 'post-open-full');
  iconElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
  `;

  containerElement.append(textElement, iconElement);
  containerElement.classList.add('post-open-full');
  rootElement.appendChild(containerElement);
};

function renderPostElements(post, lang, short) {
  const headerElement = document.createElement('div');
  const headerTextElement = document.createElement('div');
  const mediaElement = document.createElement('div');
  const bodyElement = document.createElement('div');
  const dividerElement = document.createElement('div');
  const partialOptions = { post, lang, short };

  headerElement.classList.add('post-header');
  mediaElement.classList.add('post-media');
  bodyElement.classList.add('post-body');
  dividerElement.classList.add('post-divider');
  headerTextElement.classList.add('post-header-title-wrapper');

  const headerOptions = {
    ...partialOptions,
    rootElement: headerElement,
  };
  const headerTextOptions = {
    ...partialOptions,
    rootElement: headerTextElement,
  };
  const mediaOptions = {
    ...partialOptions,
    rootElement: mediaElement,
  };
  const bodyOptions = {
    ...partialOptions,
    rootElement: bodyElement,
  };

  headerElement.appendChild(headerTextElement);

  renderHeaderIcon(headerOptions);
  renderHeaderTitle(headerTextOptions);
  renderDate(headerTextOptions);
  renderImage(mediaOptions);
  renderVideo(mediaOptions);
  renderTitle(bodyOptions);
  const shortened = renderDescription(bodyOptions);
  renderQuote(bodyOptions);
  renderAudio(bodyOptions);

  if (shortened) {
    renderOpenFull(bodyOptions);
  }

  renderLink(bodyOptions);

  return {
    headerElement,
    mediaElement,
    bodyElement,
    dividerElement,
  };
}

/**
 * Get array of posts from website data
 *
 * @param {Post} post
 * @param {'uk' | 'en'} [lang]
 * @param {boolean} [short]
 * @returns {HTMLElement}
 */
const createPost = (post, lang = 'uk', short = true) => {
  const rootElement = document.createElement('div');

  rootElement.classList.add('post-container');
  rootElement.append(...Object.values(renderPostElements(post, lang, short)));
  rootElement.setAttribute('data-post-id', post.id);
  rootElement.addEventListener('click', () => {
    window.history.pushState({}, '', `/post/${ post.path || post.id }`);
    window.applicationOperations.openPost(post.path || post.id);
  });

  return rootElement;
};

const renderMasonry = (items, columnsNumber = 2) => {
  const masonryContainer = document.createElement('div');
  const rowStyles = {
    display: 'flex',
  };
  const columnStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: 100 / columnsNumber + '%',
  };
  const columns = [];

  Object.assign(masonryContainer.style, rowStyles);

  for (let i = 0; i < columnsNumber; i++) {
    const column = document.createElement('div');

    column.classList.add('posts-masonry-column');
    Object.assign(column.style, columnStyles);
    columns.push(column);
    masonryContainer.appendChild(column);
  }

  items.forEach((item, index) => {
    const column = columns[index % columnsNumber];
    const itemElement = document.createElement('div');

    itemElement.appendChild(item);
    column.appendChild(itemElement);
  });

  return masonryContainer;
};

const renderPosts = async (
  containerId,
  lang = 'uk',
  desktop = window.applicationState.isDesktop,
  columns = window.applicationState.isTablet ? 2 : 3,
) => {
  const posts = await getPosts();
  const postElements = posts.map(post => createPost(post, lang));
  const container = document.getElementById(containerId);

  if (desktop) {
    const masonry = renderMasonry(postElements, columns);
    const newPostsElementsContainer = document.createElement('div')

    newPostsElementsContainer.append(masonry);
    container.replaceChildren(newPostsElementsContainer);

    return;
  }

  const newPostsElementsContainer = document.createElement('div')

  newPostsElementsContainer.append(...postElements);
  container.replaceChildren(newPostsElementsContainer);
};

const isDesktop = () => {
  return document.body.clientWidth >
    window.applicationConstants.mobileBreakpoint;
};

const isTablet = () => {
  return document.body.clientWidth <
    window.applicationConstants.tabletBreakpoint;
};

const initialPostsRendering = () => {
  const lang = window.applicationState.language;

  window.addEventListener('load', async () => {
    await renderPosts(
      'posts-container',
      lang,
      isDesktop(),
      isTablet() ? 2 : 3,
    );
  });
};

window.addEventListener('resize', async () => {
  const lang = window.applicationState.language;
  const desktop = isDesktop();
  const tablet = isTablet();

  if (
    window.applicationState.isDesktop === desktop &&
    window.applicationState.isTablet === tablet
  ) {
    return;
  }

  await renderPosts(
    'posts-container',
    lang,
    desktop,
    tablet ? 2 : 3,
  );

  window.applicationState.isDesktop = isDesktop();
  window.applicationState.isTablet = isTablet();
});

initialPostsRendering();

const openPost = async path => {
  const posts = await getPosts();
  const post = posts.find(p => p.path === path || p.id === path);

  if (!post) {
    return;
  }

  const postModal = document.getElementById('post-modal');

  if (!postModal) {
    return;
  }

  const lang = window.applicationState.language;
  const [headerContainer] = postModal.getElementsByClassName(
    'simple-modal-title');
  const [contentContainer] = postModal.getElementsByClassName(
    'simple-modal-content');
  const headerWrapper = document.createElement('div');
  const contentWrapper = document.createElement('div');

  headerWrapper.classList.add('post-modal-header-wrapper');
  contentWrapper.classList.add('post-modal-content-wrapper');

  const {
    headerElement,
    bodyElement,
    mediaElement,
  } = renderPostElements(post, lang);

  headerWrapper.appendChild(headerElement);
  headerContainer.appendChild(headerWrapper);
  contentWrapper.append(mediaElement, bodyElement);
  contentContainer.appendChild(contentWrapper);

  openModal('post-modal');
};

Object.assign(window.applicationOperations, { openPost });
