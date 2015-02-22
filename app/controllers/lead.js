import Ember from 'ember';

export default Ember.ObjectController.extend({

  isEditing: false,
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
      return this.transitionToRoute('lead',lead);
    },

    save: function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        return Ember.run.later(function() {
          if (self.get('model').save()) {
            return res("OK");
          } else {
            return rej("Failed");
          }
        }, 250);
      }));
    },

    "delete": function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        return Ember.run.later(function() {
          if (self.get('model').destroyRecord()) {
            return self.transitionToRoute('leads');
          } else {
            return rej("Failed");
          }
        }, 250);
      }));
    }
  }


});
