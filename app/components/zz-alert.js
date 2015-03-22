// addon/components/zz_alert.js

import Ember from 'ember';

// A smart alert with styling and icon for Ember.js
//
// @module components
// @class  zz-alert
//

export default Ember.Component.extend( {

  // Array of class names for the alert's div
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-alert'],

  // Array of class name bindings for the alert's div
  //
  // @property {Ember.Array} classNameBindings
  //
  classNameBindings: ['kindClass', 'dismissible:zz-alert-dismissible','openClass', 'extraClasses'],

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  //
  extraClasses: null,

  // Whether to make the alert dismissable or not
  //
  // @property {boolean} dismissable
  // @default  false
  //
  dismissible: false,

  // Alert open state
  //
  // @property {Ember.Boolean}
  // @default  false
  //
  open: true,

  // Convert open to dropdown open class
  //
  // @function openClass
  // @observes dismissible, alertOpen
  // @returns  {Ember.String} [''|'open']
  //
  openClass: (function() {
    return !this.get('dismissible') || this.get('open') ? 'open' : null;
  }).property('dismissible','open'),

  // The ARIA role attribute for the alert's div
  //
  // @property {Ember.String} ariaRole
  // @default  "alert"
  //
  ariaRole: 'alert',

  actions: {

    // Toggle alert 
    //
    // @function toggle
    //
    toggle: function () {
      this.toggleProperty('open');
    },

    // Open dropdown 
    //
    // @function open
    //
    open: function () {
      this.set('open', true);
    },

    // Close dropdown 
    //
    // @function close
    //
    close: function () {
      this.set('open', false);
    }
  },

  // The visual "kind" of alert
  //
  // @property {Ember.String} kind
  // @default  "info"
  //
  kind: 'info',

  // Observers

  // Methods

  // The title of the alert (if any)
  //
  // @property title
  //
  title: null,

  // The message of the alert
  //
  // @property message
  //
  message: null,

  // Convert kind to alert kind class
  //
  // @function kindClass
  // @observes kind
  // @returns  {Ember.String}  Defaults to "alert-info"
  //
  kindClass: function() {
    return 'zz-alert-' + this.get( 'kind' );
  }.property( 'kind' )

});
