// app/routes/leads/new.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	model: function() {
		return this.store.createRecord('lead', {});
	},

	renderTemplate: function() {
	  // this.render('leads.new-ribbon', {
   //    into: 'master-detail',
	  //   outlet: 'detail-ribbon',
	  // });
    this.render('leads.new', {
      into: 'master-detail',
      outlet: 'detail-content',
    });
  },

  actions: {
		willTransition: function(transition) {
			if (this.controller.get('needsSaving')) {
				transition.abort();
			} else {
				var lead = this.controller.get('model');
				if (Ember.isEmpty(lead.id)) {
         	lead.destroyRecord();
        }
				// Bubble the `willTransition` action so that
				// parent routes can decide whether or not to abort.
				return true;
			}
		}
	}

});
