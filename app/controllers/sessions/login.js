import Ember from 'ember';
import AuthenticationControllerMixin from 'simple-auth/mixins/authentication-controller-mixin';
import config from '../../config/environment';

export default Ember.ObjectController.extend(AuthenticationControllerMixin, {
  content: {},

  authenticator: 'simple-auth-authenticator:jwt',

  isPostable: (function() {
    return !Ember.isEmpty(this.get('identification')) && !Ember.isEmpty(this.get('password'));
  }).property('identification', 'password'),

  formGroupClass: (function() {
    return this.get('errors') ? 'form-group has-error' : 'form-group';
  }).property('errors'),

  actions: {

    login: function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        return Ember.run.later(function() {
          var data = self.getProperties('identification', 'password');
          self.set('password', null);
          var authenticator = self.get('authenticator');

          self.get(config['simple-auth'].sessionPropertyName).authenticate(authenticator, data).then(function() {
            return res("OK");
          }, function() {
            self.set('errors', 'Unauthorized');
            return rej("Failed");
          });
        }, 250);
      }));
    }

  }

});
