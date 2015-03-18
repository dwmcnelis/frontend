// app/controllers/teams/new.js

import Ember from 'ember';

export default Ember.ObjectController.extend({

  needsSaving: (function() {
    return this.get('isValid') && this.get('isDirty') && !this.get('isSaving');
  }).property('isValid', 'isDirty', 'isSaving'),

  actions: {

    cancel: function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        var team = self.get('model');
          if (team.destroyRecord()) {
            return self.transitionToRoute('teams');
          } else {
            return rej("Failed");
          }
        }));
    },

    save: function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        var team = self.get('model');
        if (team.save()) {
          return self.transitionToRoute('teams.show',team);
        } else {
          return rej("Failed");
        }
      }));
    }

  }

});
