// addon/components/zz_statistic.js

import Ember from 'ember';

// A smart statistic for Ember.js
//
// @module components
// @class  zz-statistic
//

export default Ember.Component.extend({

  //--------------------------------------------------------------------------------
  // Dependencies

  //--------------------------------------------------------------------------------
  // Attributes

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
  //attributeBindings: ['disabled'],

  // Class names to apply to the statistic
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-statistic'],

  // Bind the specified properties as the classes of the DOM element.
  //
  classNameBindings: ['size', 'extraClasses'],

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
  value: null,

  // The label to display (if any).
  // @property label
  // @public
  //
  label: null,

  // The icon class of the statistic (if any).
  // @property action
  // @public
  //
  icon: null,

  // The image source of the statistic (if any).
  // @property action
  // @public
  //
  image: null,

  // The image source of the statistic (if any).
  // @property action
  // @public
  //
  size: '',

  // Display label above statistic.
  // @property resource
  // @public
  //
  labelAbove: false

});
