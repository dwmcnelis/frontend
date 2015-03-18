// app/controllers/teams/show.js


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
      var team = this.get('model');
      team.rollback();
      return this.transitionToRoute('teams.show',team);
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
