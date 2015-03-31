// app/models/tag.js

import DS from 'ember-data';

export default DS.Model.extend({

 as: DS.attr('string'),
 grouping: DS.attr('string'),
 text: DS.attr('string'),
 description: DS.attr('string'),

 // tagger_type: DS.attr('string'),
 // tagger_id: DS.attr('string'),

 // tagged_type: DS.attr('string'),
 // tagged_id: DS.attr('string'),

 tagged: DS.belongsTo('tagged', { polymorphic: true, async: true})

});
