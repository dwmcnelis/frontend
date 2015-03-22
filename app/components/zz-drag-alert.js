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
  //attributeBindings: ['data-uploader'],

  // Class names to apply to the button
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-drag-alert'],

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

  // Drag start handler.
  // @function dragStart
  // @public
  //
  dragStart: function(event) {
    return false;
  },

  // Drag enter handler.
  // @function dragEnter
  // @public
  //
  dragEnter: function(event) {
    event.dataTransfer.effectAllowed = "none";
    event.dataTransfer.dropEffect = "none";
    event.preventDefault();
    this.set('isDragging', true);
    return false;
  },

  // Drag over handler.
  // @function dragOver
  // @public
  //
  dragOver: function(event) {
    event.dataTransfer.effectAllowed = "none";
    //event.dataTransfer.dropEffect = "none";
    event.preventDefault();
    this.set('isDragging', true);
    return false;
  },

  // Drop handler.
  // @function drop
  // @public
  //
  drop: function(event) { 
    this.set('isDragging', false);
    return false;
  },

  // Drag leave handler.
  // @function dragLeave
  // @public
  //
  dragLeave: function(event) {
    event.preventDefault();
    this.set('isDragging', false);
    return false;
  }

});
