// app/controllers/clients.js

// Clients index controller
//

import Ember from 'ember';

export default Ember.ArrayController.extend({

  // Filter term property
  //
  filterTerm: 'search',

  // Filter by properties
  //
  filterBy: ['fullName'],

  // Sort properties
  //
  //sortProperties: ['lastName', 'firstName'],
  sortProperties: ['level', 'lastName', 'firstName'],

  // Sort by properties
  //
  sortBy: ['lastName:asc', 'firstName:asc'],

  // Group by property
  //
  groupByLevel: 'level',

  // Group level headings
  //
  groupLevelHeadings: function(level) {
    var headings = {
      'a_list': 'A-List',
      'b_list': 'B-List',
      'c_list': 'C-List',
    };
    return headings[level];
  },

  // Search term
  //
  searchTerm: function() {
    return this.get('search');
  }.property('search'),

  // Clients
  //
  // clients: function() {
  //   return this.get('search') ? this.get('searchedClients') : this
  // }.property('search', 'searchedClients'),

  // Searched clients
  //
  // searchedClients: function() {
  //   var search = this.get('search').toLowerCase();
  //   return this.filter(function(client) {
  //     return client.get('fullName').toLowerCase().indexOf(search) != -1
  //   })
  // }.property('search', 'this.@each.fullName')

});
