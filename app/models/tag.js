// app/models/tag.js

// Tag
//

import DS from 'ember-data';

export default DS.Model.extend({

	// Attributes
	//
	as: DS.attr('string'),
	grouping: DS.attr('string'),
	text: DS.attr('string'),
	description: DS.attr('string'),

	// Relationships
	//
	
	// tagger_type: DS.attr('string'),
	// tagger_id: DS.attr('string'),

	// tagged_type: DS.attr('string'),
	// tagged_id: DS.attr('string'),

	tagged: DS.belongsTo('tagged', { polymorphic: true, async: true})

});
