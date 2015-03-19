// app/controllers/clients.js

import Ember from 'ember';

export default Ember.ArrayController.extend({

  filterTerm: 'search',

  filterBy: ['fullName'],

  //sortProperties: ['lastName', 'firstName'],
  sortProperties: ['level', 'lastName', 'firstName'],

  sortBy: ['lastName:asc', 'firstName:asc'],

  groupByLevel: 'level',

  groupLevelHeadings: function(level) {
    var headings = {
      'a_list': 'A-List',
      'b_list': 'B-List',
      'c_list': 'C-List',
    };
    return headings[level];
  },

  searchTerm: function() {
    return this.get('search');
  }.property('search'),

  // clients: function() {
  //   return this.get('search') ? this.get('searchedClients') : this
  // }.property('search', 'searchedClients'),


  // searchedClients: function() {
  //   var search = this.get('search').toLowerCase();
  //   return this.filter(function(client) {
  //     return client.get('fullName').toLowerCase().indexOf(search) != -1
  //   })
  // }.property('search', 'this.@each.fullName')

});
