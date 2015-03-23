// addon/components/zz_uploader.js

import Ember from 'ember';

export default Ember.Component.extend({

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
  classNameBindings: ['isDragging', 'isDisabled:is-disabled', 'extraClasses'],

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

      // only 1 file for now
      file = event.dataTransfer.files[0];
      this.set('isDisabled', true);
      this.sendAction('fileDropped', file);
    } else {
      console.error('you can only upload on file at the time');
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
    var self = this;
    this.$().on('uploadProgress', function(event) {
      if (event.progress === 1) {
        self.set('isDisabled', false);
      }
      self.sendAction('uploadProgress', event.progress);
    });

  }
});
