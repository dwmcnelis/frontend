// addon/components/zz_dropdown_tab_toggle.js

import Ember from 'ember';

export default Ember.Component.extend({

  // Tag name for the component
  //
  // @property {Ember.String}
  // @default  'a'
  // @public
  //
  tagName: 'a',

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
  classNames: ['zz-dropdown-tab-toggle','zz-dropdown-toggle'],

  // Bind the specified properties as the classes of the DOM element.
  //
  // @property {Ember.Array} classNameBindings
  //
  classNameBindings: ['extraClasses'],

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  // @public
  //
  extraClasses: null,

  // Click handler 
  //
  // @function click
  //
  click: function () {
    this.get('parentView').send('toggle');
  }

});