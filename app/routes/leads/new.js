import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  setupController: function(controller) {
    controller.set('firstName',null);
    controller.set('lastName',null);
    controller.set('email',null);
    controller.set('phone',null);
    controller.set('errors', null);
    return;
  }

});
