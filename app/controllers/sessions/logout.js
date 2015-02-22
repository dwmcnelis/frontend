import Ember from 'ember';
import Session from 'simple-auth/session';

export default Ember.ObjectController.extend({

  actions: {
    logout: function() {
      var self = this;
      Session.invalidate();
      return self.transitionToRoute('leads.index');
    }
  }

});
