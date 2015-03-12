// app/controllers/clients.js

import Ember from 'ember';

export default Ember.ArrayController.extend({

  sortProperties: ['firstName', 'lastName'],
  
  clients: function() {
    return this.get('search') ? this.get('searchedClients') : this;
  }.property('search', 'searchedClients'),

  searchedClients: function() {
    var search = this.get('search').toLowerCase();
    return this.filter(function(client) {
      return client.get('fullName').toLowerCase().indexOf(search) !== -1;
    });
  }.property('search', 'this.@each.fullName'),

});
