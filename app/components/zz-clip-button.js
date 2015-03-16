// addon/components/zz_clip_button.js

import Ember from 'ember';

// A smart copy to clipboard button with styling, and icons support for Ember.js
//
// @module components
// @class  zz-clip-button
//

export default Ember.Component.extend({

  //--------------------------------------------------------------------------------
  // Dependencies

  //--------------------------------------------------------------------------------
  // Attributes

  // The root component element
  //
  // @property {Ember.String} tagName
  // @default  "button"
  //
  tagName: 'button',

  // Bind the specified properties as DOM attributes.
  // @property attributeBindings
  // @private
  //
  attributeBindings: ['disabled', 'type', 'data-clipboard-text', 'data-clipboard-target'],

  // Class names to apply to the button
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-clip-button', 'zz-button'],

  // Bind the specified properties as the classes of the DOM element.
  //
  classNameBindings: ['kindClass', 'sizeClass', 'extraClasses'],

  // True if the button is enabled and can be clicked.
  // @property enabled
  // @public
  //
  enabled: true,

  // The action name to send to the controller when the button is clicked.
  // @property action
  // @public
  //
  'action': void 0,


  // The size of the button
  //
  // @property {string} size
  // @default  "medium"
  //
  size: 'medium',

  // The visual "kind" of button
  //
  // @property {Ember.String} kind
  // @default  "default"
  // @public
  //
  kind: 'default',

  // The button label
  //
  // @property {Ember.String} label
  // @default  "default"
  // @public
  //
  label: null,

  // The button icon classes
  //
  // @property {Ember.String} icon
  // @default  "default"
  // @public
  //
  icon: null,

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  // @public
  //
  extraClasses: null,

  // True if the button is not enabled.
  // @function disabled
  // @public
  //
  disabled: (function() {
    return !this.get('enabled') ;
  }).property('enabled'),

  // Convert kind to button kind class
  //
  // @function kindClass
  // @observes kind
  // @returns  {Ember.String} Defaults to "zz-button-default"
  //
  kindClass: (function() {
    var kind = this.get('kind');
    return !Ember.isEmpty(kind) ? 'zz-button-'+kind : null;
  }).property('kind'),
  
  // Converted size string to button size class
  //
  // @function sizeClass
  // @observes size
  // @returns  {Ember.String} Defaults to undefined
  //
  sizeClass: (function() {
    var size = this.get('size');
    var sizeClass;

    switch (size) {
      case 'tiny':
      case 'small':
      case 'large':
        sizeClass = 'zz-button-'+size;
        break;
      default:
        sizeClass = null;
        break;
    }

    return sizeClass;
  }).property('size'),

  clipboard: void 0,

  didInsertElement: function () {
    var ZeroClipboard = window.ZeroClipboard;
    ZeroClipboard.config({
      forceHandCursor: true,
      hoverClass: 'hover',
      activeClass: 'active'
    });
    this.clipboard = new ZeroClipboard(this.$());

    this.clipboard.on("aftercopy", Ember.run.bind(this, function(event) {
      this.$().blur();
      this.send('afterCopy', event);
    }));

    this.clipboard.on("error", Ember.run.bind(this, function(event) {
      this.$().blur();
      this.send('error', event);
    }));

  },

  'data-clipboard-text': function(){
      return this.get('clipText');
  }.property('clipText'),

  'data-clipboard-target': function(){
      return this.get('clipTarget');
  }.property('clipTarget'),

  actions: {
    afterCopy: function(event){
      console.debug('zz-clip-button:afterCopy: '+Ember.inspect(event));
    },

    error: function(event){
      console.debug('zz-clip-button:error: '+Ember.inspect(event));
    }
  }

});
