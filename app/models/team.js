// app/models/team.js

import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations.Mixin, {

  name: DS.attr('string'),
  slug: DS.attr('string'),
  level: DS.attr('string', {
    defaultValue: 'other_level'
  }),
  kind: DS.attr('string', {
    defaultValue: 'other_kind'
  }),
  league_id: DS.attr('number'),
  division_id: DS.attr('number'),
  founded: DS.attr('date'),
  location: DS.attr('string'),
  arena: DS.attr('string'),

  validations: {
    name: {
      presence: true,
      //format: { with: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, allowBlank: true, message: 'must be an email address'  }
      //presence: true,
      // length: {
      //   minimum: 3
      // }
    }
  },

  isntValid: Ember.computed.not('isValid'),

  sortName: (function() {
    var name = this.get('name');
    return name;
  }).property('name'),

  levels: ['professional','olympic','college','high_school','middle_school','town','club','other_level'],

  levelName: (function() {
    var level = this.get('level');
    return (!Ember.isEmpty(level) ? level.charAt(0).toUpperCase()+level.substring(1) : '');
  }).property('level'),

  kinds: ['football','soccer','basketball','baseball','softball','hockey','other_type'],

  kindName: (function() {
    var kind = this.get('kind');
    return (!Ember.isEmpty(kind) ? kind.charAt(0).toUpperCase()+kind.substring(1) : '');
  }).property('kind')

});
