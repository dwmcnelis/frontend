// app/models/identification.js

// Identification
//

import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations.Mixin, {

  // Attributes
  //
  identification: DS.attr('string'),
  password: DS.attr('string'),

  // Isn't valid
  //
  isntValid: Ember.computed.not('isValid'),

  // Validations
  //
  validations: {
    identification: {
      presence: true,
    	format: { with: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, allowBlank: true, message: 'must be an email address'  }
      //presence: true,
      // length: {
      //   minimum: 3
      // }
    },
    password: {
      //presence: true,
      // length: {
      //   minimum: 1
      // }
    }
  }

});
