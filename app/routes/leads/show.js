// app/routes/lead.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function(params) {
    return this.store.find('lead', params.id);
  },
  
  setupController: function(controller, model) {
    controller.set('model', model);
  },

  renderTemplate: function() {
	  this.render('leads.show-ribbon', {
      into: 'master-detail',
	    outlet: 'detail-ribbon',
	  });
	  this.render('leads.show', {
      into: 'master-detail',
	    outlet: 'detail-content',
	  });
	}


});
