// app/controllers/teams/new.js

// Team new controller
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

    // Cancel new team
    //
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

    // Save new team
    //
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
