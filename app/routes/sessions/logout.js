// app/routes/sessions/logout.js

import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';
import config from '../../config/environment';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {

  beforeModel: function(transition) {
  	var session = this.get(config['simple-auth'].sessionPropertyName);
  	if (session.isAuthenticated) {
			session.invalidate();
			transition.abort();
		} else {
			transition.abort();
			this.transitionTo('sessions.login');
		}
  }

});
