// app/controllers/clients/details.js

import Ember from 'ember';

export default Ember.ObjectController.extend({

  showUnsavedMessage: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),
  
  needsSaving: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),
  
  levelNames: [
    {id: 1, text: 'A-List'},
    {id: 2, text: 'B-List' },
    {id: 3, text: 'C-List'},
  ],

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
