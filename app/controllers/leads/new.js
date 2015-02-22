import Ember from 'ember';

export default Ember.ObjectController.extend({
  content: {},

  isPostable: (function() {
    return (!Ember.isEmpty(this.get('firstName')) || !Ember.isEmpty(this.get('lastName'))) && !Ember.isEmpty(this.get('email'));
  }).property('firstName', 'lastName', 'email'),

  formGroupClass: (function() {
    return this.get('errors') ? 'form-group has-error' : 'form-group';
  }).property('errors'),

  actions: {

    cancel: function() {
      return this.transitionToRoute('leads');
    },

    save: function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        return Ember.run.later(function() {
          var fields = self.getProperties('firstName','lastName','email','phone');
          self.store.createRecord('lead', fields).save().then(function(record) {
            return self.transitionToRoute('lead',record);
          }, function(/*reason*/) {
            return rej("Failed");
          });
        }, 250);
      }));
    }

  }

});
