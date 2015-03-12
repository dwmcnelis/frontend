// addon/components/zz_tab_bar.js

import Ember from 'ember';

// A smart tab bar for Ember.js
//
// @module components
// @class  zz-tab-bar
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
  attributeBindings: ['role','aria-label'],

  // Class names to apply to the statistic
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-tab-bar'],

  // Bind the specified properties as the classes of the DOM element.
  //
  //classNameBindings: ['size'],

  // The value of the statistic.
  // @property value
  // @public
  //
  role: 'group',

  // The label to display (if any).
  // @property label
  // @public
  //
  'aria-label': ''


});
