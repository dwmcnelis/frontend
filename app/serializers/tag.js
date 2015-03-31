// app/serializers/tag.js

import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {

  // attrs: {
  //   tagged: { serialize: 'ids' }
  // }

});
