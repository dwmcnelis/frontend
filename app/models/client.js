// app/models/client.js

// Client
//

import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';
import TaggedModel from './tagged';

export default TaggedModel.extend(EmberValidations.Mixin, {

  // Attributes
  //
  firstName: DS.attr('string'),

  lastName: DS.attr('string'),

  email: DS.attr('string'),

  phone: DS.attr('string'),

  level: DS.attr('string', {
    defaultValue: 'a_list'
  }),

  rank: DS.attr('number', {
    defaultValue: 100
  }),

  status: DS.attr('string', {
    defaultValue: 'new'
  }),

  buzzes: DS.attr('number', {
    defaultValue: 0
  }),

  notes: DS.attr('string'),

  image: DS.attr('string', {
    defaultValue: null
  }),

  // Validations
  //
  validations: {
    firstName: {
      presence: true,
      //format: { with: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, allowBlank: true, message: 'must be an email address'  }
      //presence: true,
      // length: {
      //   minimum: 3
      // }
    },
    lastName: {
      presence: true,
      //presence: true,
      // length: {
      //   minimum: 1
      // }
    }
  },

  // Isn't valid
  //
  isntValid: Ember.computed.not('isValid'),

  // Full name
  //
  fullName: (function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');
    return (!Ember.isEmpty(firstName) ? firstName : '') + ' ' + (!Ember.isEmpty(lastName) ? lastName : '');
  }).property('firstName', 'lastName'),

  // Sort name
  //
  sortName: (function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');
    return (!Ember.isEmpty(lastName) ? lastName : '') + (!Ember.isEmpty(firstName) ? ', '+ firstName : '');
  }).property('firstName', 'lastName'),

  // Levels
  //
  levels: ['a_list', 'b_list', 'c_list', ],

  // Level names
  //
  levelName: (function() {
    var level = this.get('level');
    return (!Ember.isEmpty(level) ? level.charAt(0).toUpperCase()+'-'+level.charAt(2).toUpperCase()+level.substring(3) : '');
  }).property('level'),

  // Statuses
  //
  statuses: ['new', 'verified', 'qualified', 'disqualified', 'inactive', 'active'],

  // Status names
  //
  statusName: (function() {
    var status = this.get('status');
    return (!Ember.isEmpty(status) ? status.charAt(0).toUpperCase()+status.substring(1) : '');
  }).property('status'),

  // Image crop url
  //
  image_crop_url: (function() {
    var image = this.get('image');
    return this.thumb_url(image,'100x100#');
  }).property('image'),  

  // Image icon url
  //
  image_icon_url: (function() {
    var image = this.get('image');
    return this.thumb_url(image,'32x32#');
  }).property('image'),

  // Original tags
  //
  originalTags: (function() {
    return this.get('tags');
  }).property('tags.@each.as'), 

  // People tags
  //
  peopleTags: (function() {
    return this.get('tags').filterBy('as', 'people');
  }).property('tags.@each.as'), 

  // Sports tags
  //
  sportsTags: (function() {
    return this.get('tags').filterBy('as', 'sports');
  }).property('tags.@each.as'), 

  // Music tags
  //
  musicTags: (function() {
    return this.get('tags').filterBy('as', 'music');
  }).property('tags.@each.as'), 

  // Entertainment tags
  //
  entertainmentTags: (function() {
    return this.get('tags').filterBy('as', 'entertainment');
  }).property('tags.@each.as'), 

  // Food tags
  //
  foodTags: (function() {
    return this.get('tags').filterBy('as', 'food');
  }).property('tags.@each.as'), 

  // Travel tags
  //
  travelTags: (function() {
    return this.get('tags').filterBy('as', 'travel');
  }).property('tags.@each.as'), 

  // Politics tags
  //
  politicsTags: (function() {
    return this.get('tags').filterBy('as', 'politics');
  }).property('tags.@each.as'), 

  // Other tags
  //
  otherTags: (function() {
    return this.get('tags').filterBy('as', 'other');
  }).property('tags.@each.as'), 

  // Thumb url
  //
  thumb_url: function(url, geometry) {
    geometry = geometry.replace(/#/g, "%23");
    var thumb_url = url.replace(/\/content\/|\/static\//, function (location){return location+'thumb/'+geometry+'/';});
    return thumb_url;
  }

});
