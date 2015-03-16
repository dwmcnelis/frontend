// app/controllers/clients.js

import Ember from 'ember';

export default Ember.ArrayController.extend({

  filterTerm: 'search',

  filterBy: ['fullName'],

  sortBy: ['lastName:asc', 'firstName:asc'],

  sortProperties: ['lastName', 'firstName'],

  groupByLevel: 'level',

  groupLevelHeadings: function(level) {
    var headings = {
      1: 'A-List',
      2: 'B-List',
      3: 'C-List',
    };
    return headings[level];
  },

  searchTerm: function() {
    return this.get('search');
  }.property('search'),

});
