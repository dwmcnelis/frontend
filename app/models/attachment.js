// app/models/attachment.js

import Ember from 'ember';
import DS from 'ember-data';
import Validation from '../mixins/validation';

export default DS.Model.extend(Validation, {
  
  upload: DS.attr(),
  content: DS.attr(),

  name: DS.attr('string'),
  mime_type: DS.attr('string'),
  size: DS.attr('number'),
  url: DS.attr('string'),

  for_type: DS.attr('string'),
  for_id: DS.attr('string'),
  for_attribute: DS.attr('string'),

  contentUrl: Ember.computed.alias('content.url'),

  contentUrlObserver: function() {

    var url,
        contentName;

    url = this.get('fileUrl');
    contentName = this.get('contentName');

    if (Ember.isPresent(url) && Ember.isNone(contentName)) {
      return url.split('/').find(function(urlPart) {
        return !!urlPart.match(/\.(?:jpg|gif|png)$/) ? urlPart : null;
      });
    }

    else {
      return "";
    }
  }.observes('contentUrl'),

  validations: {
    contentName: {
      file: {
        accept: ['png', 'jpg', 'gif'],
        message: 'Accepts only images'
      }
    }
  }

});