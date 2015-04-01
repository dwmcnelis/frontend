import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL : '/'
});

Router.map(function() {

  // Index
  this.route('index', { path: '/'});

  // Sessions
  this.route('sessions.login', { path: '/login'});
  this.route('sessions.logout', { path: '/logout'});

  // Clients
  this.resource('clients', { path: '/clients' }, function() {
    this.route('new');
    this.route("go", { path: "/:id/go" });
    this.route("show", { path: "/:id" });
    this.route("details", { path: "/:id/details" });
    this.route("tags", { path: "/:id/tags" });
  });

  // Teams
  this.resource('teams', { path: '/teams' }, function() {
    this.route('new');
    this.route("show", { path: "/:id" });
    this.route("details", { path: "/:id/details" });
  });

});

export default Router;
