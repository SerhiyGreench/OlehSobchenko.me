const route = event => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation().then();
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const params = path.split('/').filter(i => i);

  console.log(path);

  const firstParam = params[1];
  const secondParam = params[2];

  console.log(path);
  console.log(window.applicationOperations.openPost.toString());

  if (firstParam === 'post') {
    window.applicationOperations.openPost(secondParam);
  }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation().then();
