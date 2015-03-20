// app/adapters/attachment.js

import DS from 'ember-data';
import FormDataAdapterMixin from '../mixins/form-data-adapter';

export default DS.ActiveModelAdapter.extend(FormDataAdapterMixin, {

  //host: 'http://localhost',
  namespace: 'api/v1'

});
