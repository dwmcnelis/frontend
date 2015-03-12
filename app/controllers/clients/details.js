// app/controllers/clients/details.js

import Ember from 'ember';

export default Ember.ObjectController.extend({

  showUnsavedMessage: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),
  
  needsSaving: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),

  actions: {

    cancel: function() {
      var client = this.get('model');
      client.rollback();
      return this.transitionToRoute('clients.show',client);
    },

    save: function(promise) {
      var self = this;
      var client = this.get('model');
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        if (self.get('model').save()) {
          return self.transitionToRoute('clients.show',client);
        } else {
          return rej("Failed");
        }
      }));
    },
    
    "delete": function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        var client = self.get('model');
        if (client.destroyRecord()) {
          return self.transitionToRoute('clients');
        } else {
          return rej("Failed");
        }
      }));
    }


  }


});
