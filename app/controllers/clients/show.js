// app/controllers/clients/show.js


import Ember from 'ember';

export default Ember.ObjectController.extend({

  clipboard_content: 'This content should now be in the clipboard!',

  showUnsavedMessage: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),
  
  needsSaving: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),

  actions: {
    uploadImage: function(file){
      var self = this;
      var attachment = this.store.createRecord('attachment', {
        for_type: this.model.constructor.typeKey,
        for_id: this.model.get('id'),
        for_attribute: 'image',
        content:  file,
        contentName: file.name,
        contentSize: file.size,
        contentType: file.type
      });

      attachment.save().then(function(attachment){
        //console.info('attachment uploaded: '+attachment.get('contentName'));
        self.model.reload('refresh');
      }, function(error){
        //console.debug('attachment upload failed: ', error);
      }, 'file upload');
    },


    cancel: function() {
      var client = this.get('model');
      client.rollback();
      return this.transitionToRoute('clients.show',client);
    },

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
