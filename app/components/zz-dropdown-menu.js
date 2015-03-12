// addon/components/zz_dropdown-menu.js

import Ember from 'ember';

export default Ember.Component.extend({

  // Tag name for the component
  //
  // @property {Ember.String}
  // @default  'a'
  //
  tagName: 'div',

  // Bind the specified properties as DOM attributes.
  //
  // @property attributeBindings
  //
  //attributeBindings: [],

  // Class names to apply to the component
  //
  // @property {Ember.Array} classNames
  // @default {Ember.Array} 'zz-dropdown-menu'
  //
  classNames: ['zz-dropdown-menu'],

  // Bind the specified properties as the classes of the DOM element.
  //
  // @property {Ember.Array} classNameBindings
  //
  classNameBindings: ['extraClasses'],

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  //
  extraClasses: null,

  // Is dropdown open 
  //
  // @property {Ember.String}
  // @default  null
  //
  dropdownOpen: Ember.computed.alias('parentView.dropdownOpen'),

  // Close on child click 
  //
  // @property {Ember.Boolean}
  // @default  null
  //
  closeOnChildClick: false,

  // Click handler 
  //
  // @function click
  //
  click: function (event) {
    var closeOnChildClick = this.get('closeOnChildClick');
    var target = Ember.$(event.target);
    var element = this.$();

    if (target !== element) {
      if ((closeOnChildClick === true || closeOnChildClick === "true") && target.closest(element).length) {
        this.set('dropdownOpen', false);
      } else if (closeOnChildClick && target.closest(element.find(closeOnChildClick)).length) {
        this.set('dropdownOpen', false);
      }
    }
  }
});