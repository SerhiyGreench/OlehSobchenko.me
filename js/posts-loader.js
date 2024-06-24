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
  const [categories, types, rawPosts] = await Promise.all([
    getCategories(),
    getTypes(),
    getRawPosts(),
  ]);

  return rawPosts.map(post => {
    const category = categories.find(c => c.id === post.categoryId);
    const type = types.find(t => t.id === post.typeId);

    Object.assign(post, { category, type });

    return post;
  });
}

/**
 * Renders post header
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderHeaderTitle = (options) => {
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
    const typePart = document.createElement('div');

    typePart.innerText = type.name[lang]?.toUpperCase();
    postHeader.appendChild(typePart);
  }

  if (all) {
    const divider = document.createElement('div');

    divider.classList.add('post-header-title-divider');
    postHeader.appendChild(divider);
  }

  if (category) {
    const categoryPart = document.createElement('div');

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
const renderDate = (options) => {
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
const renderImage = (options) => {
  const { rootElement, lang, post } = options;
  const image = post.image

  if (!image) {
    return;
  }

  const imgElement = document.createElement('img');

  if (image.data) {
    imgElement.src = image.data;
  }

  if (image.link) {
    imgElement.src = getLocalized(image.link.localization, lang) ||
      image.link.common;
  }

  imgElement.classList.add('post-image');
  rootElement.appendChild(imgElement);
};

/**
 * Renders post image
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderVideo = (options) => {
  const { rootElement, lang, post } = options;
  const video = post.video;

  if (!video) {
    return;
  }

  const videoContainerElement = document.createElement('div');

  if (video.link && !video.data) {
    const videoElement = document.createElement('video');

    videoElement.src = getLocalized(video.link.localization, lang) ||
      video.link.common;

    rootElement.appendChild(videoElement);
  }

  if (video.data) {
    videoContainerElement.innerHTML = video.data;
  }

  videoContainerElement.classList.add('post-video');
  rootElement.appendChild(videoContainerElement);
};

/**
 * Renders post title
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderTitle = (options) => {
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
 * Renders post description
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderDescription = (options) => {
  const { rootElement, lang, post } = options;
  const description = post.description;

  if (!description) {
    return;
  }

  const descriptionElement = document.createElement('div');

  descriptionElement.innerText = description[lang];
  descriptionElement.classList.add('post-description');
  rootElement.appendChild(descriptionElement);
};

/**
 * Renders post short description
 *
 * @param {PostRenderOptions} options
 * @returns {void}
 */
const renderQuote = (options) => {
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
 * Get array of posts from website data
 *
 * @param {Post} post
 * @param {'uk' | 'en'} lang
 * @returns {HTMLElement}
 */
const createPost = (post, lang = 'uk') => {
  const rootElement = document.createElement('div');
  const headerElement = document.createElement('div');
  const mediaElement = document.createElement('div');
  const bodyElement = document.createElement('div');
  const dividerElement = document.createElement('div');
  const partialOptions = { post, lang };

  rootElement.classList.add('post-container');
  headerElement.classList.add('post-header');
  mediaElement.classList.add('post-media');
  bodyElement.classList.add('post-body');
  dividerElement.classList.add('post-divider');

  const headerOptions = {
    ...partialOptions,
    rootElement: headerElement,
  };
  const mediaOptions = {
    ...partialOptions,
    rootElement: mediaElement,
  };
  const bodyOptions = {
    ...partialOptions,
    rootElement: bodyElement,
  };

  renderHeaderTitle(headerOptions);
  renderDate(headerOptions);
  renderImage(mediaOptions);
  renderVideo(mediaOptions);
  renderTitle(bodyOptions);
  renderDescription(bodyOptions);
  renderQuote(bodyOptions);

  rootElement.append(headerElement, mediaElement, bodyElement, dividerElement);

  return rootElement;
};

const renderPosts = async (containerId, lang = 'uk') => {
  const posts = await getPosts();
  const postElements = posts.map(post => createPost(post, lang));
  const container = document.getElementById(containerId);
  const newPostsElementsContainer = document.createElement('div')

  newPostsElementsContainer.append(...postElements);
  container.replaceChildren(newPostsElementsContainer);
};

const initialPostsRendering = () => {
  window.addEventListener('load', async () => {
    await renderPosts('posts-container');
  });
};

initialPostsRendering();
