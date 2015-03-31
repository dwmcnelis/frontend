// app/models/tagged.js

import DS from 'ember-data';

export default DS.Model.extend({

	tags: DS.hasMany('tag', {async: true}),

});
