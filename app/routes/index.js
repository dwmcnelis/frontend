// app/routes/index.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

renderTemplate: function() {
	  this.render('index.search', {
	    outlet: 'banner'
	  });
	  this.render('index.sidebar', {
	    outlet: 'sidebar-main'
	  });
	  this.render('index.sidebar-ribbon', {
	    outlet: 'sidebar-ribbon'
	  });
	  this.render('index', {
	    outlet: 'workspace-main'
	  });
	}

});
