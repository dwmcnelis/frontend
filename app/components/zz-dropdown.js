// addon/components/zz_dropdown.js

import Ember from 'ember';

export default Ember.Component.extend({

  // Tag name for the component
  //
  // @property {Ember.String}
  // @default  'div'
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
  classNames: ['zz-dropdown'],

  // Bind the specified properties as the classes of the DOM element.
  //
  // @property {Ember.Array} classNameBindings
  //
  classNameBindings: ['openClass', 'extraClasses'],

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  // @public
  //
  extraClasses: null,

  // Dropdown open state
  //
  // @property {Ember.Boolean}
  // @default  false
  //
  dropdownOpen: false,

  // Convert dropdownOpen to dropdown open class
  //
  // @function openClass
  // @observes dropdownOpen
  // @returns  {Ember.String} [''|'open']
  //
  openClass: (function() {
    return this.get('dropdownOpen') ? 'open' : null;
  }).property('dropdownOpen'),
  
  // Dropdown toggle selector
  //
  // @property {Ember.String}
  //
  toggleSelector: '.zz-dropdown-toggle',

  // Dropdown menu selector
  //
  // @property {Ember.String}
  //
  menuSelector: '.zz-dropdown-menu',

  actions: {

    // Toggle dropdown 
    //
    // @function toggle
    //
    toggle: function () {
      this.toggleProperty('dropdownOpen');
    },

    // Open dropdown 
    //
    // @function open
    //
    open: function () {
      this.set('dropdownOpen', true);
    },

    // Close dropdown 
    //
    // @function close
    //
    close: function () {
      this.set('dropdownOpen', false);
    }
  },

  // Toogle clickout handler 
  //
  // @function toggleClickout
  // @observes dropdownOpen on didInsertElement
  //
  toggleClickout: function () {
    var eventNamespace = 'click.'+this.elementId;
    if (this.get('dropdownOpen')) {
      Ember.$(document).bind(eventNamespace, {component: this}, this.clickout);
    } else {
      Ember.$(document).unbind(eventNamespace, this.clickout);
    }
  }.observes('dropdownOpen').on('didInsertElement'),

  // Remove clickout handler 
  //
  // @function removeClickout
  // @observes willDestroyElement
  //
  removeClickout: function () {
    var eventNamespace = 'click.'+this.elementId;
    Ember.$(document).unbind(eventNamespace, this.clickout);
  }.on('willDestroyElement'),

  // Clickout handler 
  //
  // @function clickout
  //
  clickout: function (event) {
    var component = event.data.component;
    var element = component.$();
    var target = Ember.$(event.target);

    // There is an issue when the click triggered a dom change in the dropdown that unloaded the target element. The
    // ancestry of the target can no longer be determined. We can check if html is still an ancestor to determine
    // if this has happened. The safe option then seems to be to not close the dropdown, as occasionaly not closing
    // the dropdown when it should have closed, seems to be less bad for usability than occasionaly closing the
    // dropdown when it should not have closed.
    if(component.get('dropdownOpen') && target.closest('html').length !== 0 &&
      !(target.closest(element.find(component.get('toggleSelector'))).length ||
        target.closest(element.find(component.get('menuSelector'))).length)
    ) {
      component.set('dropdownOpen', false);
    }
  }

});