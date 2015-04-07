// app/controllers/clients/new.js

// Client new controller
//

import Ember from 'ember';

export default Ember.ObjectController.extend({

  // Needs saving
  //
  // @property {Ember.Boolean} needs
  //
  needsSaving: (function() {
    return this.get('isValid') && this.get('isDirty') && !this.get('isSaving');
  }).property('isValid', 'isDirty', 'isSaving'),

  actions: {

    // Cancel new client
    //
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

    // Save new client
    //
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
