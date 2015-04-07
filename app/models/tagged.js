// app/models/tagged.js

// Tagged
//

import DS from 'ember-data';

export default DS.Model.extend({

	// Relationships
	//
	tags: DS.hasMany('tag', {async: true}),

});
