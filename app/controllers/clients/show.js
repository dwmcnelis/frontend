// app/controllers/clients/show.js

// Client show controller
//

import Ember from 'ember';

export default Ember.ObjectController.extend({

  clipboard_content: 'This content should now be in the clipboard!',

  // Show unsaved messages
  //
  // @property {Ember.Boolean} show
  //
  showUnsavedMessage: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),
  
  // Needs saving
  //
  // @property {Ember.Boolean} needs
  //
  needsSaving: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),

  actions: {

    // Upload client image
    //
    uploadImage: function(file, upload){
      //console.debug('uploadImage: file: '+Ember.inspect(file)+', upload: '+upload);
      var self = this;
      var attachment = this.store.createRecord('attachment', {
        upload: upload,
        content: file,
 
        name: file.name,
        mime_type: file.type,
        size: file.size,
 
        for_type: this.model.constructor.typeKey,
        for_id: this.model.get('id'),
        for_attribute: 'image'
      });

      attachment.save().then(function(/*attachment*/){
        //self.model.set('image', attachment.get('url'));
        self.model.reload();
      }, function(error){
        console.debug('attachment upload failed: ', error);
      }, 'file upload');
    },

    // Track upload progress
    //
    uploadProgress: function(id, progress) {
      console.debug('uploadProgress: id: '+id+', progress: '+progress);
    },

    // Cancel client changes
    //
    cancel: function() {
      var client = this.get('model');
      client.rollback();
      return this.transitionToRoute('clients.show',client);
    },

    // Save client changes
    //
    save: function(promise) {
      var self = this;
      return promise(new Ember.RSVP.Promise(function(res, rej) {
        if (self.get('model').save()) {
          return res("OK");
        } else {
          return rej("Failed");
        }
      }));
    }

  }


});
