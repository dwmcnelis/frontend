// app/controllers/teams/show.js

// Team show controller
//

import Ember from 'ember';

export default Ember.ObjectController.extend({

  // Show unsaved messages
  //
  // @property {Ember.Boolean} show
  //
  showUnsavedMessage: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),
  
  // Needs saving
  //
  // @property {Ember.Boolean} needs
  //
  needsSaving: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),

  actions: {

    // Cancel team changes
    //
    cancel: function() {
      var team = this.get('model');
      team.rollback();
      return this.transitionToRoute('teams.show',team);
    },

    // Save team changes
    //
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
