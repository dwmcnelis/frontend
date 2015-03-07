// app/routes/index.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

renderTemplate: function() {
	  this.render('master-detail');
	  this.render('index.search-content', {
      into: 'master-detail',
	    outlet: 'banner-content',
	  });
	  this.render('index.master-ribbon', {
      into: 'master-detail',
	    outlet: 'master-ribbon'
	  });
	  this.render('index.master-content', {
      into: 'master-detail',
	    outlet: 'master-content'
	  });
	  // this.render('index.detail-ribbon', {
    //   into: 'master-detail',
	  //   outlet: 'detail-ribbon'
	  // });
	  this.render('index', {
      into: 'master-detail',
	    outlet: 'detail-content'
	  });
	}

});
