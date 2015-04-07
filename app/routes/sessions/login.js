// app/routes/sessions/login.js

// Session login route
//

import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';
import config from '../../config/environment';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {

	// Invalidate session
	//
  beforeModel: function(transition) {
  	var session = this.get(config['simple-auth'].sessionPropertyName);
  	if (session.isAuthenticated) {
			session.invalidate();
			transition.abort();
		}
  },

  // Model for route
  //
	model: function() {
		return this.store.createRecord('identification', {identification: 'davemcnelis@gmail.com'});
 	},

  // Render template
  //
 	renderTemplate: function() {
	  this.render('full');
	  this.render('sessions.login', {
      into: 'full'
	  });
	}


});
