// app/routes/teams.js

// Team index route
//

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  // Model for route
  //
  model: function() {
    return this.store.find('team');
  },

  // Render template
  //
  renderTemplate: function() {
	  this.render('master-detail');
	  this.render('teams.search-content', {
      into: 'master-detail',
	    outlet: 'banner-content',
	  });
	  this.render('teams.master-ribbon', {
      into: 'master-detail',
	    outlet: 'master-ribbon'
	  });
	  this.render('teams.master-content', {
      into: 'master-detail',
	    outlet: 'master-content'
	  });
	  this.render('teams.index-ribbon', {
      into: 'master-detail',
	    outlet: 'detail-ribbon',
	  });
	  this.render('teams.detail-content', {
      into: 'master-detail',
	    outlet: 'detail-content'
	  });
	}

});
