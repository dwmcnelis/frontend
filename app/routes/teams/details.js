// app/routes/teams/details.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function(params) {
    return this.store.find('team', params.id);
  },
  
  setupController: function(controller, model) {
    controller.set('model', model);
  },

  renderTemplate: function() {
	  this.render('teams.details-ribbon', {
      into: 'master-detail',
	    outlet: 'detail-ribbon',
	  });
	  this.render('teams.details', {
      into: 'master-detail',
	    outlet: 'detail-content',
	  });
	}


});
