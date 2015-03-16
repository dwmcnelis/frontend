// addon/components/zz_list_item.js

import Ember from 'ember';
//import App from 'frontend/app';


// A smart list item with link-to and action support for Ember.js
//
// @module components
// @class  zz-list-item
//

export default Ember.Component.extend({

  // The root component element
  //
  // @property {Ember.String} tagName
  // @default  "button"
  //
  tagName: 'li',

  // Bind the specified properties as DOM attributes.
  // @property attributeBindings
  // @private
  //
  //attributeBindings: ['disabled'],

  // Class names to apply to the button
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-list-item'],

  // Bind the specified properties as the classes of the DOM element.
  //
  classNameBindings: ['active', 'extraClasses'],

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  //
  extraClasses: null,

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
  // //
  active: function() {
    return this.get('childViews').anyBy('active');
  }.property('childViews.@each.active','controllers.application.currentRouteName')


});
