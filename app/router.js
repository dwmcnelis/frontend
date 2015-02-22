import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL : '/'
});

Router.map(function() {

  // Sessions
  this.route('sessions.login', { path: '/login'});
  this.route('sessions.logout', { path: '/logout'});

  // Leads
  this.resource('leads', { path: '/' }, function() {
    this.route('new');
    this.resource('lead', { path: '/leads/:id' }, function() {
      this.route('edit');
    });
  });

});

export default Router;
