// addon/components/zz_button_bar.js

import Ember from 'ember';

// A smart button bar for Ember.js
//
// @module components
// @class  zz-button-bar
//

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
  attributeBindings: ['role','aria-label','style'],

  // Class names to apply to the statistic
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-button-group','btn-toolbar'],

  // Bind the specified properties as the classes of the DOM element.
  //
  //classNameBindings: ['size'],

  style: 'display: inline-block;',

  // The value of the statistic.
  // @property value
  // @public
  //
  role: 'toolbar',

  // The label to display (if any).
  // @property label
  // @public
  //
  'aria-label': ''


});
