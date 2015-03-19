// app/controllers/clients/sports.js

import Ember from 'ember';

export default Ember.ObjectController.extend({

  showUnsavedMessage: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),
  
  needsSaving: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),

  actions: {

   selectTeams: function(query, promise) {
      this.store.findSelect('team', query.term, promise);
    },

   cancel: function() {
      var client = this.get('model');
      client.rollback();
      return this.transitionToRoute('clients.show',client);
    },

    save: function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        if (self.get('model').save()) {
          return res("OK");
        } else {
          return rej("Failed");
        }
      }));
    }

  }


});
