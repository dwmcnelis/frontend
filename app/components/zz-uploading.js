import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: 'zz-uploading'.w(),
  file: {},
  progress: function(){
    return 'width:'+(this.get('file.progress')*100)+'%';
  }.property('file.progress'),
  isUploading: function(){
    return this.get('file.progress') !== 1;
  }.property('file.progress')
});
