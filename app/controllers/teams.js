// app/controllers/teams.js

import Ember from 'ember';

export default Ember.ArrayController.extend({

  filterTerm: 'search',

  filterBy: ['name'],

  //sortProperties: ['lastName', 'firstName'],
  sortProperties: ['name'],

  sortBy: ['name:asc'],

  //groupByLevel: 'level',

  // groupLevelHeadings: function(level) {
  //   var headings = {
  //     1: 'A-List',
  //     2: 'B-List',
  //     3: 'C-List',
  //   };
  //   return headings[level];
  // },

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
