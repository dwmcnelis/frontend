/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'frontend',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  // Authentication/Authorization
  ENV['simple-auth'] = {

    authenticationRoute: 'sessions.login',
    routeAfterAuthentication: 'leads',
    routeIfAlreadyAuthenticated: 'leads',
    sessionPropertyName: 'session',
    authorizer: 'simple-auth-authorizer:token',
    session: 'simple-auth-session:main',
    store: 'simple-auth-session-store:local-storage',
    localStorageKey: 'ember_simple_auth:session',
    //crossOriginWhitelist: ['http://localhost:3002'],
    applicationRootUrl: '/'

  };
  ENV['simple-auth-token'] = {

    serverTokenEndpoint: '/api/v1/authorize/',
    identificationField: 'username',
    passwordField: 'password',
    tokenPropertyName: 'token',
    authorizationPrefix: 'Bearer ',
    authorizationHeaderName: 'Authorization',
    headers: {},
    refreshAccessTokens: true,
    serverTokenRefreshEndpoint: '/api/v1/refresh/',
    tokenExpireName: 'exp',
    timeFactor: 1
  };


  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
