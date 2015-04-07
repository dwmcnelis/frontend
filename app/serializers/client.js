// app/serializers/client.js

// Client serializer
//

import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {

  attrs: {
    tags: { serialize: 'ids' }
  }

});
