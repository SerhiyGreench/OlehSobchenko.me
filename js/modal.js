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

const closePostModal = () => {
  closeModal();

  window.location.assign('/');

  const post = document.getElementById('post-modal');

  const elementsToClean = [
    post.getElementsByClassName('simple-modal-title')[0],
    post.getElementsByClassName('simple-modal-content')[0],
  ];

  for (const element of elementsToClean) {
    if (!element) {
      continue;
    }

    for (const child of element.children) {
      child.remove();
    }
  }
};
