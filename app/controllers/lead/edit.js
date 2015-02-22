// app/controllers/lead_edit.js

import Ember from 'ember';

export default Ember.ObjectController.extend({

  needsSaving: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),

  actions: {

    cancel: function() {
      this.get('model').rollback();
      return this.transitionToRoute('lead');
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
    }

  }

});
