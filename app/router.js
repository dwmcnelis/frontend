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

  // Leads
  this.resource('leads', { path: '/leads' }, function() {
    this.route('new');
    this.route("show", { path: "/:id" });
    this.route("edit", { path: "/:id/edit" });
    this.route("summary", { path: "/:id/summary" });
    this.route("details", { path: "/:id/details" });
    this.route("family", { path: "/:id/family" });
    this.route("friends", { path: "/:id/friends" });
    this.route("sports", { path: "/:id/sports" });
  });

});

export default Router;
