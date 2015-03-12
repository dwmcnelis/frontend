// addon/components/zz_alert.js

import Ember from 'ember';

// A smart alert with styling and icon for Ember.js
//
// @module components
// @class  zz-alert
//

export default Ember.Component.extend( {

  // Dependencies
  //

  // Attributes
  //

  // Array of class names for the alert's div
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['alert', 'zz-alert'],

  // Array of class name bindings for the alert's div
  //
  // @property {Ember.Array} classNameBindings
  //
  classNameBindings: ['kindClass', 'dismissable:alert-dismissable', 'extraClasses'],

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  // @public
  //
  extraClasses: null,


  // The ARIA role attribute for the alert's div
  //
  // @property {Ember.String} ariaRole
  // @default  "alert"
  //
  ariaRole: 'alert',

  // Actions for the alert component
  //
  // @property {Ember.Object} actions
  //
  actions: {

    // Trigger a bound "dismiss" action when the alert is dismissed
    //
    // @function actions.dismiss
    // @returns  {void}
    //
    dismiss: function() {
      this.sendAction( 'dismiss' );
    }
  },

  // Whether to make the alert dismissable or not
  //
  // @property {boolean} dismissable
  // @default  false
  //
  dismissable: false,


  // The visual "kind" of alert
  //
  // @property {Ember.String} kind
  // @default  "info"
  //
  kind: 'info',

  // Observers

  // Methods

  // The label of the alert
  //
  // @function labelContent
  // @observes label
  // @public
  //
  labelContent: (function() {
    return this.get('label');
  }).property('label'),

  // Convert kind to alert kind class
  //
  // @function kindClass
  // @observes kind
  // @returns  {Ember.String}  Defaults to "alert-info"
  //
  kindClass: function() {
    return 'alert-' + this.get( 'kind' );
  }.property( 'kind' )

});
