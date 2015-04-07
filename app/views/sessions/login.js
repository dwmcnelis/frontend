// app/views/sessions/login.js

// Session login view
//

import Ember from 'ember';
import FocusFirstViewMixin from 'frontend/views/mixins/focus_first';

export default Ember.View.extend(FocusFirstViewMixin, {

  // Class names to apply to the view
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['login'],

  // layoutName: 'page-form',
  // pageTitle: 'Sign in',
  // afterFormLink: {
  //   linkTo: 'setup_guest_user',
  //   linkText: 'Create an account'
  // },

});
