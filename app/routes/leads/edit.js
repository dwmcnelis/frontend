// app/routes/lead/edit.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  renderTemplate: function() {
    this.render('leads.edit-ribbon', {
      into: 'master-detail',
      outlet: 'detail-ribbon',
    });
    this.render('leads.edit', {
      into: 'master-detail',
      outlet: 'detail-content',
    });
  }


});
