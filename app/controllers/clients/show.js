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
    receiveFile: function(file){
      // console.debug('attachment: id: '+Ember.inspect(this.model.get('id')));
      // console.debug('attachment: type: '+Ember.inspect(this.model.constructor.match(/^.*\:(.*)\:$/) ) );


      var attachment = this.store.createRecord('attachment', {
        content:  file,
        contentName: file.name,
        contentSize: file.size,
        contentType: file.type,
        //for_type: this.model.get('???'),
        for_type: 'client',
        for_id: this.model.get('id'),
        for_attribute: 'image'
      });

      attachment.save().then(function(attachment){
        console.info('attachment uploaded: '+attachment.get('contentUrl'));
      }, function(error){
        console.debug('attachment upload failed: ', error);
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
