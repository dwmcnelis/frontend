// app/controllers/clients/details.js

// Client details controller
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
 
  // Level names to display
  // 
  levelNames: [
    {id: 'a_list', text: 'A-List'},
    {id: 'b_list', text: 'B-List' },
    {id: 'c_list', text: 'C-List'},
  ],

  actions: {

    // Cancel client changes
    //
    cancel: function() {
      var client = this.get('model');
      client.rollback();
      return this.transitionToRoute('clients.show',client);
    },

    // Save client changes
    //
    save: function(promise) {
      var self = this;
      var client = this.get('model');
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        if (self.get('model').save()) {
          return self.transitionToRoute('clients.show',client);
        } else {
          return rej("Failed");
        }
      }));
    },
    
    // Delete client
    //
    "delete": function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        var client = self.get('model');
        if (client.destroyRecord()) {
          return self.transitionToRoute('clients');
        } else {
          return rej("Failed");
        }
      }));
    }

  }


});
