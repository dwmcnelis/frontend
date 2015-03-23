// addon/components/zz_uploader.js

import Ember from 'ember';
import UuidMixin from '../mixins/uuid';

export default Ember.Component.extend(UuidMixin, {

  // The root component element
  //
  // @property {Ember.String} tagName
  // @default  "div"
  //
  tagName: 'div',

  // Bind the specified properties as DOM attributes.
  // @property attributeBindings
  // @private
  //
  attributeBindings: ['data-uploader'],

  // Class names to apply to the button
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-uploader', 'zz-drop-zone'],

  // Bind the specified properties as the classes of the DOM element.
  //
  classNameBindings: ['isDragging', 'isUploading','isDisabled:is-disabled', 'extraClasses'],

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  // @public
  //
  extraClasses: null,

  // True if the uploader is disabled and does not accept drops.
  // @property isDisabled
  // @public
  //
  isDisabled: false,

  // True if data uploader.
  // @property data-uploader
  // @public
  //
  'data-uploader': 'true',

  // The message displayed in the drop zone.
  // @property message
  // @public
  //
  message: 'Drop files here',

  // Allow multiple drops.
  // @property multiple
  // @public
  //
  multiple: false,

  // Show uploading progress.
  // @property progress
  // @public
  //
  progress: false,

  // Array of files dropped on uploader.
  // @property dropped
  // @public
  //
  dropped: [],

  isUploading: function() {
    console.debug('isUploading: ');
    return this.get('dropped').filter(function(item){
      if (item.get('progress') < 1) {
        return true;
      }
    });
  }.observes('dropped.@each.progress'),


  // Drag start handler.
  // @function dragStart
  // @public
  //
  dragStart: function(event) {
    // event.dataTransfer.effectAllowed = "copy";
    // event.dataTransfer.dropEffect = "copy";
    event.stopPropagation();
    event.preventDefault();
    //return false;
  },

  // Drag enter handler.
  // @function dragEnter
  // @public
  //
  dragEnter: function(event) {
    this.set('isDragging', true);
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.dropEffect = "copy";
    event.stopPropagation();
    event.preventDefault();
    //return false;
  },

  // Drag over handler.
  // @function dragOver
  // @public
  //
  dragOver: function(event) {
    this.set('isDragging', true);
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.dropEffect = "copy";
    event.stopPropagation();
    event.preventDefault();
    //return false;
   },

  // Drop handler.
  // @function drop
  // @public
  //
  drop: function(event) {
    var file;

    if (!this.get('isDisabled')) {
      this.set('isDragging', false);

      file = event.dataTransfer.files[0];

      var upload = this.uuid();
      this.get('dropped').push({
        upload: upload,
        name: file.name,
        mime_type: file.type,
        size: file.size,
        progress: 0
      });

      if (!this.get('multiple')) {
        this.set('isDisabled', true);
      }

      if (this.get('progress')) {
        // create progress indicators here
      }

      this.sendAction('fileDropped', file, upload);
    }
    //event.stopImmediatePropagation();
    //event.stopPropagation();
    event.preventDefault();
    //return false;
  },

  // Drag leave handler.
  // @function dragLeave
  // @public
  //
  dragLeave: function(event) {
    this.set('isDragging', false);
    event.preventDefault();
    event.stopPropagation();
    //return false;
  },

  // Did insert element handler.
  // @function didInsertElement
  // @public
  //
  didInsertElement: function() {

    if (this.get('progress')) {
     var self = this;
     this.$().on('uploadProgress', function(event) {
        //console.debug('uploadProgress: upload: '+event.upload);
        var upload = self.get('dropped').filter(function(item){
          if (item.get('upload') === event.upload) {
              return item;
          }
        });
        if (upload) {
          upload.set('progress') = event.progress;
        }
        if (self.get('progress')) {
          self.sendAction('uploadProgress', event.upload, event.progress);
        }
        var uploading = self.get('isUploading');
        //debugger;
        if (!self.get('multiple') && !self.get('isUploading')) {
          self.set('isDisabled', false);
        }
      });
    }

  }
});
