// app/routes/clients.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function() {
    return this.store.find('client');
  },

  renderTemplate: function() {
	  this.render('master-detail');
	  this.render('clients.search-content', {
      into: 'master-detail',
	    outlet: 'banner-content',
	  });
	  this.render('clients.master-ribbon', {
      into: 'master-detail',
	    outlet: 'master-ribbon'
	  });
	  this.render('clients.master-content', {
      into: 'master-detail',
	    outlet: 'master-content'
	  });
	  this.render('clients.index-ribbon', {
      into: 'master-detail',
	    outlet: 'detail-ribbon',
	  });
	  this.render('clients.detail-content', {
      into: 'master-detail',
	    outlet: 'detail-content'
	  });
	}

});
