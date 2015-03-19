// app/models/select_team.js

//import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

 text: DS.attr('string'),
 children: DS.attr(),

});
