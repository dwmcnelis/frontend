import Ember from 'ember';

export default Ember.ArrayController.extend({

  sortProperties: ['firstName', 'lastName'],
  leads: (function() {
    if (this.get('search')) {
      return this.get('searchedLeads');
    } else {
      return this;
    }
  }).property('search', 'searchedLeads'),
  searchedLeads: (function() {
    var search;
    search = this.get('search').toLowerCase();
    return this.filter((function(/*_this*/) {
      return function(lead) {
        return lead.get('fullName').toLowerCase().indexOf(search) !== -1;
      };
    })(this));
  }).property('search', '@each.fullName')

});


