// addon/components/zz_uploading.js

import Ember from 'ember';

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
  //attributeBindings: [],

  // Class names to apply to the button
  //
  // @property {Ember.Array} classNames
  //
  classNames: 'zz-uploading'.w(),

  // File details.
  // @public
  //
  file: {},

  // Progress.
  // @property progress
  // @public
  //
  progress: function(){
    return 'width:'+(this.get('file.progress')*100)+'%';
  }.property('file.progress'),

  // Is uploading.
  // @property isUploading
  // @public
  //
  isUploading: function(){
    return this.get('file.progress') !== 1;
  }.property('file.progress')
});
