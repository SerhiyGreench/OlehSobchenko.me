const route = event => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation().then();
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const params = path.split('/').filter(i => i);

  const url = new URL(window.location.href);

  const postId = url.searchParams.get('post');

  console.log(postId);

  if (postId) {
    window.applicationOperations.openPost(postId);

    return;
  }

  const firstParam = params[0];
  const secondParam = params[1];

  if (firstParam === 'post') {
    window.applicationOperations.openPost(secondParam);
  }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation().then();
