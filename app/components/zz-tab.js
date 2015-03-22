// addon/components/zz_tab.js

import Ember from 'ember';

// A smart tab with link-to and action support for Ember.js
//
// @module components
// @class  zz-tab
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
  //attributeBindings: ['disabled'],

  // Class names to apply to the tab
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-tab'],

  // Bind the specified properties as the classes of the DOM element.
  //
  classNameBindings: ['active', 'extraClasses'],

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  // @public
  //
  extraClasses: null,

  // The label to display.
  // @property action
  // @public
  //
  label: '',

  // The icon class of the tab.
  // @property action
  // @public
  //
  icon: null,

  // The link-to route.
  // @property linkTo
  // @public
  //
  linkTo: void 0,

  // The link-to resource.
  // @property resource
  // @public
  //
  resource: void 0,

  // Set active class from child.
  // @property active
  // @public
  //
  active: function() {
    return this.get('childViews').anyBy('active');
  }.property('childViews.@each.active')


});
