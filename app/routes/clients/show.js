// app/routes/clients/show.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  needs: ['application'],

  beforeModel: function(params) {
    var topRoute = this.controllerFor('application').get('topRoute');
    var topRouteName = topRoute ? topRoute.get('routeName') : '';
    console.debug('topRoute: '+topRouteName);
  },

  model: function(params) {
    return this.store.find('client', params.id);
  },
  
  setupController: function(controller, model) {
    controller.set('model', model);
  },

  renderTemplate: function() {
	  this.render('clients.show-ribbon', {
      into: 'master-detail',
	    outlet: 'detail-ribbon',
	  });
	  this.render('clients.show', {
      into: 'master-detail',
	    outlet: 'detail-content',
	  });
	}


});
