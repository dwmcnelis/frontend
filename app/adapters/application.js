// app/adapters/application.js

import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({

  //host: 'http://localhost',
  namespace: 'api/v1'

});
