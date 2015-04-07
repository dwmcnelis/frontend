// app/controllers/teams.js

// Team index controller
//

import Ember from 'ember';

export default Ember.ArrayController.extend({

  // Filter term property
  //
  filterTerm: 'search',

  // Filter by properties
  //
  filterBy: ['name'],

  // Sort properties
  //
  //sortProperties: ['lastName', 'firstName'],
  sortProperties: ['name'],

  // Sort by properties
  //
  sortBy: ['name:asc'],

  // Group by property
  //
  //groupByLevel: 'level',

  // Group level headings
  //
  // groupLevelHeadings: function(level) {
  //   var headings = {
  //     1: 'A-List',
  //     2: 'B-List',
  //     3: 'C-List',
  //   };
  //   return headings[level];
  // },

  // Search term
  //
  searchTerm: function() {
    return this.get('search');
  }.property('search'),

  // Teams
  //
  // teams: function() {
  //   return this.get('search') ? this.get('searchedTeams') : this
  // }.property('search', 'searchedTeams'),

  // Searched teams
  //
  // searchedTeams: function() {
  //   var search = this.get('search').toLowerCase();
  //   return this.filter(function(team) {
  //     return team.get('name').toLowerCase().indexOf(search) != -1
  //   })
  // }.property('search', 'this.@each.name')

});
