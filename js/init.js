const applicationState = {
  language: 'uk',
  postsCache: null,
};

const applicationConstants = {
  mobileBreakpoint: 950,
  tabletBreakpoint: 1440,
};

const applicationOperations = {
  openPost: () => {},
};

Object.assign(window, {
  applicationState,
  applicationConstants,
  applicationOperations,
});
