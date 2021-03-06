// app/mixins/uuid.js

// UUID mixin
//

import Ember from 'ember';

export default Ember.Mixin.create({

	uuid: function() {
  	return window.uuid.v4();
	}
	
});
