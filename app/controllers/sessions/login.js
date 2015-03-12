// app/controllers/sessions/login.js

import Ember from 'ember';
import AuthenticationControllerMixin from 'simple-auth/mixins/authentication-controller-mixin';
import config from '../../config/environment';

export default Ember.ObjectController.extend(AuthenticationControllerMixin, {

  authenticator: 'simple-auth-authenticator:jwt',

  canShowErrors: false,

  actions: {

    login: function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        var data = self.getProperties('identification', 'password');
        //self.set('password', null);
        var authenticator = self.get('authenticator');

        self.get(config['simple-auth'].sessionPropertyName).authenticate(authenticator, data).then(function() {
          console.debug('session: '+Ember.inspect(self.get('session').get('content')));
          return self.transitionTo('clients');
        }, function() {
          //self.get('model').set('errors', 'Unauthorized');
          return rej("Failed");
        });
      }));
    }

  }

});
