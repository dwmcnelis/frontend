// addon/components/zz_list_heading.js

import Ember from 'ember';

// A smart list heading for Ember.js
//
// @module components
// @class  zz-list-heading
//

export default Ember.Component.extend({

  // The root component element
  //
  // @property {Ember.String} tagName
  // @default  "button"
  //
  tagName: 'div',

  // Bind the specified properties as DOM attributes.
  // @property attributeBindings
  // @private
  //
  //attributeBindings: ['disabled'],

  // Class names to apply to the button
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-list-heading'],

  // Bind the specified properties as the classes of the DOM element.
  //
  classNameBindings: ['kindClass', 'sizeClass', 'extraClasses'],

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  // @public
  //
  extraClasses: null,

  // The label to display (if any).
  // @property label
  //
  label: null,

  // The icon class of the heading (if any).
  // @property action
  //
  icon: null,

  // The image source of the heading (if any).
  // @property action
  //
  image: null,

  // The size of the heading (if any).
  // @property action
  //
  size: '',

  // Convert kind to list heading kind class
  //
  // @function kindClass
  // @observes kind
  // @returns  {Ember.String} Defaults to "list-heading-default"
  //
  kindClass: (function() {
    var kind = this.get('kind');
    return !Ember.isEmpty(kind) ? 'list-heading-'+kind : null;
  }).property('kind'),

  // Converted size string to list heading size class
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
        sizeClass = 'list-heading-'+size;
        break;
      default:
        sizeClass = null;
        break;
    }

    return sizeClass;
  }).property('size')

});
