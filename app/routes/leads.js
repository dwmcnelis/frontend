// app/routes/leads.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function() {
    return this.store.find('lead');
  },

  renderTemplate: function() {
	  this.render('leads.search', {
	    outlet: 'banner'
	  });
	  this.render('leads.sidebar', {
	    outlet: 'sidebar-main'
	  });
	  this.render('leads.sidebar-ribbon', {
	    outlet: 'sidebar-ribbon'
	  });
	  this.render('leads', {
	    outlet: 'workspace-main'
	  });
	}

});
