// app/routes/clients/default.js

import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  needs: ['application'],

  model: function(params) {
    return this.store.find('client', params.id);
  },

  afterModel: function(model /*, transition*/) {
    var topRoute = this.controllerFor('application').get('topRoute');
    var topRouteName = topRoute ? topRoute.get('routeName') : '';
    if (topRouteName) {
      var pieces = topRouteName.split('.');
      if (pieces.length > 1 && pieces[0] === 'clients') {
        //transition.abort();
        return this.transitionTo(topRouteName, model);
      }
    }
    return this.transitionTo('clients.show', model);
  },
});
