// app/models/client.js

import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations.Mixin, {

  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  level: DS.attr('number', {
    defaultValue: 3
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

  levels: [1, 2, 3],

  levelName: (function() {
    var level = this.get('level');
    var names = {
      1: 'A-List',
      2: 'B-List',
      3: 'C-List',
    };
    return (!Ember.isEmpty(level) ? names[level] : '');
  }).property('level'),


  statuses: ['new', 'verified', 'qualified', 'disqualified', 'inactive', 'active'],

  statusName: (function() {
    var status = this.get('status');
    return (!Ember.isEmpty(status) ? status.charAt(0).toUpperCase()+status.substring(1) : '');
  }).property('status')

});
