// app/controllers/lead/edit.js

import Ember from 'ember';

export default Ember.ObjectController.extend({

  needsSaving: (function() {
    return this.get('isValid') && this.get('isDirty') && !this.get('isSaving');
  }).property('isValid', 'isDirty', 'isSaving'),

  actions: {

    cancel: function() {
      try {
        var lead = this.get('model');
        lead.rollback();
        return this.transitionToRoute('leads.show',lead);
      } catch(e) {
        return this.transitionToRoute('leads');
      }
    },

    save: function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        var lead = self.get('model');
        if (lead.save()) {
          return self.transitionToRoute('leads.show',lead);
        } else {
          return rej("Failed");
        }
      }));
    },

    "delete": function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        var lead = self.get('model');
        if (lead.destroyRecord()) {
          return self.transitionToRoute('leads');
        } else {
          return rej("Failed");
        }
      }));
    }


  }

});
