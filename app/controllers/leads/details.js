// app/controllers/lead/details.js

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
      var lead = this.get('model');
      lead.rollback();
      return this.transitionToRoute('leads.summary',lead);
    },

    save: function(promise) {
      var self = this;
      var lead = this.get('model');
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        if (self.get('model').save()) {
          return self.transitionToRoute('leads.summary',lead);
        } else {
          return rej("Failed");
        }
      }));
    }

  }


});
