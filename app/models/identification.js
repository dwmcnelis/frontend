// app/models/identification.js

import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations.Mixin, {

  identification: DS.attr('string'),
  password: DS.attr('string'),

  isntValid: Ember.computed.not('isValid'),

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


// import Ember from 'ember';

// export default Ember.Object.extend({

//   identification: null,
//   password: null,

//   valid: function(fields) {
//    return fields.identification && fields.password;
//  	}
  
// });
