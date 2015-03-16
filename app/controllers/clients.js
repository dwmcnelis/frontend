// app/controllers/clients.js

import Ember from 'ember';

export default Ember.ArrayController.extend({

  filterTerm: 'search',

  filterBy: ['fullName'],

  sortBy: ['lastName:asc', 'firstName:asc'],

  sortProperties: ['lastName', 'firstName'],

  groupBy: function(item){
    return item.status;
  },
  //['status'],
  
  searchTerm: function() {
    return this.get('search');
  }.property('search')

});
