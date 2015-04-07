// app/routes/clients/details.js

// Client detail route
//

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  // Model for route
  //
  model: function(params) {
    return this.store.find('client', params.id);
  },
  
  // Setup controller
  //
  setupController: function(controller, model) {
    controller.set('model', model);
  },

  // Render template
  //
  renderTemplate: function() {
	  this.render('clients.details-ribbon', {
      into: 'master-detail',
	    outlet: 'detail-ribbon',
	  });
	  this.render('clients.details', {
      into: 'master-detail',
	    outlet: 'detail-content',
	  });
	}


});
