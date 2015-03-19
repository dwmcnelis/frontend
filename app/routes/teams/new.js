// app/routes/teams/new.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	model: function() {
		return this.store.createRecord('team', {});
	},

	renderTemplate: function() {
	  // this.render('teams.new-ribbon', {
   //    into: 'master-detail',
	  //   outlet: 'detail-ribbon',
	  // });
    this.render('teams.new', {
      into: 'master-detail',
      outlet: 'detail-content',
    });
  },

  actions: {
		willTransition: function(transition) {
			if (this.controller.get('needsSaving')) {
				transition.abort();
			} else {
				var team = this.controller.get('model');
				if (Ember.isEmpty(team.id)) {
         	team.destroyRecord();
        }
				// Bubble the `willTransition` action so that
				// parent routes can decide whether or not to abort.
				return true;
			}
		}
	}

});
