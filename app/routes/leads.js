// app/routes/leads.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function() {
    return this.store.find('lead');
  },

  renderTemplate: function() {
	  this.render('master-detail');
	  this.render('leads.search-content', {
      into: 'master-detail',
	    outlet: 'banner-content',
	  });
	  this.render('leads.master-ribbon', {
      into: 'master-detail',
	    outlet: 'master-ribbon'
	  });
	  this.render('leads.master-content', {
      into: 'master-detail',
	    outlet: 'master-content'
	  });
	  this.render('leads.index-ribbon', {
      into: 'master-detail',
	    outlet: 'detail-ribbon',
	  });
	  this.render('leads.detail-content', {
      into: 'master-detail',
	    outlet: 'detail-content'
	  });
	}

});
