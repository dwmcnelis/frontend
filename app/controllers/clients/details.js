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
    {id: 'a-list', text: 'A-List'},
    {id: 'b-list', text: 'B-List' },
    {id: 'c-list', text: 'C-List'},
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
