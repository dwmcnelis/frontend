import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  activate: function() {
    return this.controllerFor('lead').set('isEditing', true);
  },
  deactivate: function() {
    return this.controllerFor('lead').set('isEditing', false);
  }

});
