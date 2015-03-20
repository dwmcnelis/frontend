// app/models/attachment.js

import Ember from 'ember';
import DS from 'ember-data';
import Validation from '../mixins/validation';

export default DS.Model.extend(Validation, {  
  for_type: DS.attr('string'),

  for_id: DS.attr('string'),

  for_attribute: DS.attr('string'),

  content: DS.attr(),

  contentUrl: Ember.computed.alias('content.url'),

  contentName: DS.attr(),
  contentSize: DS.attr(),
  contentType: DS.attr(),

  contentUrlObserver: function(){
    /*
      This computed property is simply to when we receive the file from our
      servers on a store.find('asset', id) query we are still able to isolate
      it's file name correctly.
      If you api returns the imageName on the response you do not need this observer
    */
    var url,
        contentName;

    url = this.get('fileUrl');
    contentName = this.get('contentName');

    if(Ember.isPresent(url) && Ember.isNone(contentName)){
      return url.split('/').find(function(urlPart){
        return !!urlPart.match(/\.(?:jpg|gif|png)$/) ? urlPart : null;
      });
    }

    else{
      return "";
    }
  }.observes('contentUrl'),

  progress: 0,

  // our validations object
  validations:{
    // this is a property to be observed and validated accordingly
    contentName: {
      // this is our validator intended to be executed
      file: {
        // this is the restrictions that we want
        // to apply to our imageName property
        accept: ['png', 'jpg', 'gif'],
        // this is the message to display in case of a faulty value
        message: 'Accepts only images'
      }
    }
  }

});