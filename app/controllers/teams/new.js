// app/controllers/clients/new.js

import Ember from 'ember';

export default Ember.ObjectController.extend({

  needsSaving: (function() {
    return this.get('isValid') && this.get('isDirty') && !this.get('isSaving');
  }).property('isValid', 'isDirty', 'isSaving'),

  actions: {

    cancel: function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        var client = self.get('model');
          if (client.destroyRecord()) {
            return self.transitionToRoute('clients');
          } else {
            return rej("Failed");
          }
        }));
    },

    save: function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        var client = self.get('model');
        if (client.save()) {
          return self.transitionToRoute('clients.show',client);
        } else {
          return rej("Failed");
        }
      }));
    }

  }

});
