// app/routes/clients/tags.js

// Client tag route
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
	  this.render('clients.tags-ribbon', {
      into: 'master-detail',
	    outlet: 'detail-ribbon',
	  });
	  this.render('clients.tags', {
      into: 'master-detail',
	    outlet: 'detail-content',
	  });
	}

});
