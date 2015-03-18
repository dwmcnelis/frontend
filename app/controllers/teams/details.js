// app/controllers/teams/details.js

import Ember from 'ember';

export default Ember.ObjectController.extend({

  showUnsavedMessage: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),
  
  needsSaving: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),
  
  levelNames: [
    {id: 0, text: 'Professional'},
    {id: 1, text: 'Olympic' },
    {id: 2, text: 'College'},
    {id: 3, text: 'High School'},
    {id: 4, text: 'Middle School'},
    {id: 5, text: 'Town'},
    {id: 6, text: 'Club'},
    {id: 32767, text: 'Other'}
  ],

  kindNames: [
    {id: 0, text: 'Football'},
    {id: 1, text: 'Soccer' },
    {id: 2, text: 'Basketball'},
    {id: 3, text: 'Baseball'},
    {id: 4, text: 'Softball'},
    {id: 5, text: 'Hockey'},
    {id: 32767, text: 'Other'}
  ],

  actions: {

    cancel: function() {
      var team = this.get('model');
      team.rollback();
      return this.transitionToRoute('teams.show',team);
    },

    save: function(promise) {
      var self = this;
      var team = this.get('model');
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        if (self.get('model').save()) {
          return self.transitionToRoute('teams.show',team);
        } else {
          return rej("Failed");
        }
      }));
    },
    
    "delete": function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        var team = self.get('model');
        if (team.destroyRecord()) {
          return self.transitionToRoute('teams');
        } else {
          return rej("Failed");
        }
      }));
    }

  }


});
