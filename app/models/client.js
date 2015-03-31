// app/models/client.js

import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';
import TaggedModel from './tagged';

export default TaggedModel.extend(EmberValidations.Mixin, {

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

  isntValid: Ember.computed.not('isValid'),

  fullName: (function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');
    return (!Ember.isEmpty(firstName) ? firstName : '') + ' ' + (!Ember.isEmpty(lastName) ? lastName : '');
  }).property('firstName', 'lastName'),

  sortName: (function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');
    return (!Ember.isEmpty(lastName) ? lastName : '') + (!Ember.isEmpty(firstName) ? ', '+ firstName : '');
  }).property('firstName', 'lastName'),

  levels: ['a_list', 'b_list', 'c_list', ],

  levelName: (function() {
    var level = this.get('level');
    return (!Ember.isEmpty(level) ? level.charAt(0).toUpperCase()+'-'+level.charAt(2).toUpperCase()+level.substring(3) : '');
  }).property('level'),

  statuses: ['new', 'verified', 'qualified', 'disqualified', 'inactive', 'active'],

  statusName: (function() {
    var status = this.get('status');
    return (!Ember.isEmpty(status) ? status.charAt(0).toUpperCase()+status.substring(1) : '');
  }).property('status'),

  image_crop_url: (function() {
    var image = this.get('image');
    return this.thumb_url(image,'100x100#');
  }).property('image'),  

  image_icon_url: (function() {
    var image = this.get('image');
    return this.thumb_url(image,'32x32#');
  }).property('image'),

  originalTags: (function() {
    return this.get('tags');
  }).property('tags.@each.as'), 

  peopleTags: (function() {
    return this.get('tags').filterBy('as', 'people');
  }).property('tags.@each.as'), 

  sportsTags: (function() {
    return this.get('tags').filterBy('as', 'sports');
  }).property('tags.@each.as'), 

  musicTags: (function() {
    return this.get('tags').filterBy('as', 'music');
  }).property('tags.@each.as'), 

  entertainmentTags: (function() {
    return this.get('tags').filterBy('as', 'entertainment');
  }).property('tags.@each.as'), 

  foodTags: (function() {
    return this.get('tags').filterBy('as', 'food');
  }).property('tags.@each.as'), 

  travelTags: (function() {
    return this.get('tags').filterBy('as', 'travel');
  }).property('tags.@each.as'), 

  politicsTags: (function() {
    return this.get('tags').filterBy('as', 'politics');
  }).property('tags.@each.as'), 

  otherTags: (function() {
    return this.get('tags').filterBy('as', null);
  }).property('tags.@each.as'), 

  thumb_url: function(url, geometry) {
    geometry = geometry.replace(/#/g, "%23");
    var thumb_url = url.replace(/\/content\/|\/static\//, function (location){return location+'thumb/'+geometry+'/';});
    return thumb_url;
  }

});
