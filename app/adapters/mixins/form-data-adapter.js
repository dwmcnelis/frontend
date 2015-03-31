// app/mixins/form-data-adapter.js

import Ember from 'ember';
import DS from 'ember-data';

var InvalidError = DS.InvalidError;

export default Ember.Mixin.create({

  formDataTypes: ['POST', 'PUT', 'PATCH'],

  ajaxOptions: function(url, type, options) {

    var data;

    if (options && 'data' in options) {
      data = options.data;
    }
    
    var hash = this._super.apply(this, arguments);

    if (typeof FormData !== 'undefined' && data && this.formDataTypes.contains(type)) {

      var formData = new FormData();
      var root = Ember.keys(data)[0];
      var uploadId;

      Ember.keys(data[root]).forEach(function(key) {
        if (Ember.isPresent(data[root][key])) {
          formData.append(root + "[" + key + "]", data[root][key]);
          if (key === 'upload') {
            uploadId = data[root][key];
          }
        }
      });

      hash.processData = false;
      hash.contentType = false;
      hash.data = formData;
      hash.upload = uploadId;
    }

    return hash;
  },

  ajax: function(url, type, options) {
    var adapter = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {

      var hash = adapter.ajaxOptions(url, type, options);

      hash.success = function(json, textStatus, jqXHR) {
        json = adapter.ajaxSuccess(jqXHR, json);
        if (json instanceof InvalidError) {
          Ember.run(null, reject, json);
        } else {
          Ember.run(null, resolve, json);
        }
      };

      hash.error = function(jqXHR, textStatus, errorThrown) {
        Ember.run(null, reject, adapter.ajaxError(jqXHR,
                                                  jqXHR.responseText,
                                                  errorThrown));
      };

      hash.xhr = function() {

        var xhr = new window.XMLHttpRequest();

        //Upload progress
        xhr.upload.addEventListener("progress", function(event) {
          if (event.lengthComputable) {
            var percentComplete = event.loaded / event.total;
            Ember.$('[data-uploader]').trigger({
              type:"uploadProgress",
              upload: hash['upload'],
              progress:percentComplete
            });
          }
        }, false);

        //Download progress
        xhr.addEventListener("progress", function(event) {
          if (event.lengthComputable) {
            var percentComplete = event.loaded / event.total;
            Ember.$('[data-uploader]').trigger({
              type:"downloadProgress",
              upload: hash['upload'],
              progress:percentComplete
            });
          }
        }, false);
        return xhr;
      };

      Ember.$.ajax(hash);
    }, 'DS: RESTAdapter#ajax ' + type + ' to ' + url);
  }
  
});
