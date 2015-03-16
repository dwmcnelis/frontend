// app/models/client.js

import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations.Mixin, {

  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  status: DS.attr('string', {
    defaultValue: 'new'
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
    var status = this.get('status');
    return (!Ember.isEmpty(firstName) ? firstName : '') + ' ' + (!Ember.isEmpty(lastName) ? lastName : '') + ' ('+status+')';
  }).property('firstName', 'lastName'),

  sortName: (function() {
    var firstName = this.get('firstName');
    var lastName = this.get('lastName');
    return (!Ember.isEmpty(lastName) ? lastName : '') + (!Ember.isEmpty(firstName) ? ', '+ firstName : '');
  }).property('firstName', 'lastName'),

  STATUSES: ['new', 'in progress', 'closed', 'bad'],
  // valid: function(fields) {
  //   return fields.firstName && fields.lastName;
  // }

});
