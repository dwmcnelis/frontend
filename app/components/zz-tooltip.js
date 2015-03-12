// addon/components/zz_tooltip.js

import Ember from 'ember';

// A smart tooltip for Ember.js
//
// @module components
// @class  zz-tooltip
//

export default Ember.Component.extend({

  //--------------------------------------------------------------------------------
  // Dependencies

  //--------------------------------------------------------------------------------
  // Attributes

  // The root component element
  //
  // @property {Ember.String} tagName
  // @default  "span"
  //
  tagName: 'span',

  // Bind the specified properties as DOM attributes.
  // @property attributeBindings
  // @private
  //
  attributeBindings: ['role','aria-label','data-tooltip'],

  // Class names to apply to the statistic
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-tooltip'],

  // Bind the specified properties as the classes of the DOM element.
  //
  classNameBindings: ['kindClass', 'positionClass', 'roundedClass','animationClass', 'extraClasses'],

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  // @public
  //
  extraClasses: null,

  // The value of the statistic.
  // @property value
  // @public
  //
  role: 'help',

  // The label to display (if any).
  // @property label
  // @public
  //
  'aria-label': '',

  position: 'bottom',

  // The visual "kind" of tooltip
  //
  // @property {Ember.String} kind
  // @default  "default"
  // @public
  //
  kind: 'default',

  rounded: false,

  // The label to display (if any).
  // @property animation [none|fade|bounce|always]
  // @public
  //
  animation: 'none',

  // Convert postion to tooltip position class
  //
  // @function positionClass
  // @observes position
  // @returns  {Ember.String} Defaults to "tooltip-botton"
  //
  positionClass: (function() {
    return 'tooltip-'+this.get('position');
  }).property('position'),

  // Convert kind to tooltip kind class
  //
  // @function kindClass
  // @observes kind
  // @returns  {Ember.String} Defaults to "tooltip-default"
  //
  kindClass: (function() {
    var kind = this.get('kind');
    return !Ember.isEmpty(kind) ? 'tooltip-'+kind : null;
  }).property('kind'),
  
  // Convert rounded to tooltip rounded class
  //
  // @function roundedClass
  // @observes rounded
  // @returns  {Ember.String} Defaults to null
  //
  roundedClass: (function() {
    var rounded = this.get('rounded');
    return rounded ? 'tooltip-rounded' : null;
  }).property('rounded'),
  
  // Convert animation to tooltip animation class
  //
  // @function animationClass
  // @observes animation [none|fade|bounce|always]
  // @returns  {Ember.String} Defaults to null
  //
  animationClass: (function() {
    var animation = this.get('animation');
    var animationClass;

    switch (animation) {
      case 'none':
        animationClass = 'tooltip-no-animate';
        break;
      case 'fade':
        animationClass = null;
        break;
      case 'bounce':
        animationClass = 'tooltip-bounce';
        break;
      default:
        animationClass = 'tooltip-no-animate';
        break;
    }

    return animationClass;
  }).property('animation'),


});
