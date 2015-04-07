// app/routes/clients/new.js

// Client new route
//

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  // Model for route
  //
	model: function() {
		return this.store.createRecord('client', {});
	},

  // Render template
  //
	renderTemplate: function() {
	  // this.render('clients.new-ribbon', {
   //    into: 'master-detail',
	  //   outlet: 'detail-ribbon',
	  // });
    this.render('clients.new', {
      into: 'master-detail',
      outlet: 'detail-content',
    });
  },

  actions: {
		willTransition: function(transition) {
			if (this.controller.get('needsSaving')) {
				transition.abort();
			} else {
				var client = this.controller.get('model');
				if (Ember.isEmpty(client.id)) {
         	client.destroyRecord();
        }
				// Bubble the `willTransition` action so that
				// parent routes can decide whether or not to abort.
				return true;
			}
		}
	}

});
