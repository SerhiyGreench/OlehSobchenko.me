const applicationState = {
  language: 'uk',
};

const applicationConstants = {
  mobileBreakpoint: 950,
  tabletBreakpoint: 1440,
};

Object.assign(window, { applicationState, applicationConstants });

const route = (event) => {
  console.log(event);

  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation().then();
};

const routes = {
  404: "404.html",
  "/": "index.html",
};

const handleLocation = async () => {
  const path = window.location.pathname;

  console.log({ path });

  const route = routes[path] || routes["/"];

  document.getElementById("main-page").innerHTML = await fetch(route)
    .then((data) => data.text());
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation().then();
