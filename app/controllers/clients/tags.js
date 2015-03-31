// app/controllers/clients/sports.js

import Ember from 'ember';

export default Ember.ObjectController.extend({

  showUnsavedMessage: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),
  
  needsSaving: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),

  actions: {

    findPeopleSelectTags: function(query, promise) {
      this.store.findSelect('tag', { as: 'people', query: query.term }, promise);
    },

    findSportsSelectTags: function(query, promise) {
      this.store.findSelect('tag', { as: 'sports', query: query.term }, promise);
    },
   
    findMusicSelectTags: function(query, promise) {
      this.store.findSelect('tag', { as: 'music', query: query.term }, promise);
    },
   
    findEntertainmentSelectTags: function(query, promise) {
      this.store.findSelect('tag', { as: 'entertainment', query: query.term }, promise);
    },
   
    findFoodSelectTags: function(query, promise) {
      this.store.findSelect('tag', { as: 'food', query: query.term }, promise);
    },
   
    findTravelSelectTags: function(query, promise) {
      this.store.findSelect('tag', { as: 'travel', query: query.term }, promise);
    },
   
    findPoliticsSelectTags: function(query, promise) {
      this.store.findSelect('tag', { as: 'politics', query: query.term }, promise);
    },
   
    findOtherSelectTags: function(query, promise) {
      this.store.findSelect('tag', { as: null, query: query.term }, promise);
    },
   
    cancel: function() {
      var client = this.get('model');
      client.rollback();
      return this.transitionToRoute('clients.show',client);
    },

    save: function(promise) {
      var self = this;
      var client = this.model;
      var tags = Ember.A();
      var promises = Ember.A();

      var classify = function(tag) {
        var id = tag['id'];
        if (typeof id === 'undefined') {
          id = tag.get('id');
        }
        var type = tag.constructor.typeKey;
        console.debug('classify: type: '+type+', id: '+id);
        //debugger;
        if (id.charAt(0) === '+') {
          delete tag['id'];
          tag['text'] = tag['text']['string'].replace(/\s<span.*<\/span>/g,'');
          delete tag['description'];
          var create = self.store.createRecord('tag', {
            as: tag['as'],
            text: tag['text'],
            description: tag['description'],
            tagged: client
          });
          console.debug('create new tag: '+tag['text']);
          tags.addObject(create);
          promises.push(create.save());
        } else if (typeof type === 'undefined') {
          var add = self.store.createRecord('tag', {
            id: id,
            as: tag['as'],
            text: tag['text'],
            description: tag['description'],
            tagged: client
          });
          console.debug('add selected tag: '+tag['text']);
          tags.addObject(add);
        } else {
          console.debug('keep existing tag: '+tag.get('text'));
          tags.addObject(tag);
        }
      };

      this.get('peopleTags').forEach(classify);
      this.get('sportsTags').forEach(classify);
      this.get('musicTags').forEach(classify);
      this.get('entertainmentTags').forEach(classify);
      this.get('foodTags').forEach(classify);
      this.get('travelTags').forEach(classify);
      this.get('politicsTags').forEach(classify);
      this.get('otherTags').forEach(classify);

      client.get('tags').clear();
      tags.forEach(function(tag) {
        client.get('tags').addObject(tag);
      });

      if (promises.length > 0) {
        Ember.RSVP.Promise.all(promises).then(function(/*resolved*/) {
          console.debug('all added tags saved');
          return promise(new Ember.RSVP.Promise(function(res, rej) {
            console.debug('save client: '+client.get('fullName'));
            if (client.save()) {
              console.debug('saved client: '+client.get('fullName'));
              return res("OK");
            } else {
              return rej("Failed");
            }
          }));
        }, function(/*failed*/) {
          console.debug('some added tags failed');
        });
      } else {
        console.debug('no added tags, just save client');
        return promise(new Ember.RSVP.Promise(function(res, rej) {
          console.debug('save client: '+client.get('fullName'));
          if (client.save()) {
            console.debug('saved client: '+client.get('fullName'));
            return res("OK");
          } else {
            return rej("Failed");
          }
        }));
      }

    }

  }

});
