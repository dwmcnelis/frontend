// app/views/mixins/focus_first.js

// Focus on first input mixin
//

import Ember from 'ember';

// A mixin that adds focus on first input behaviour
// 

export default Ember.Mixin.create({

	didInsertElement: function() {
    this._super();
    return this.$('input:first').focus();
  }

});
