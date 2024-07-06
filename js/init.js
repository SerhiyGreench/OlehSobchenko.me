const applicationState = {
  language: 'uk',
  postsCache: null,
};

const applicationConstants = {
  mobileBreakpoint: 950,
  tabletBreakpoint: 1440,
};

const applicationOperations = {
  openPost: path => {},
};

Object.assign(window, {
  applicationState,
  applicationConstants,
  applicationOperations,
});
