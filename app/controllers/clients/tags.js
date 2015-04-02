// app/controllers/clients/sports.js

import Ember from 'ember';
import FindSelectMixin from '../mixins/find-select';

export default Ember.ObjectController.extend(FindSelectMixin, {

  showUnsavedMessage: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),
  
  needsSaving: (function() {
    return this.get('isDirty') && !this.get('isSaving');
  }).property('isDirty', 'isSaving'),

  actions: {

    findPeopleSelectTags: function(query, promise) {
      this.findSelect('tag', { as: 'people', query: query.term }, promise);
    },

    findSportsSelectTags: function(query, promise) {
      this.findSelect('tag', { as: 'sports', query: query.term }, promise);
    },
   
    findMusicSelectTags: function(query, promise) {
      this.findSelect('tag', { as: 'music', query: query.term }, promise);
    },
   
    findEntertainmentSelectTags: function(query, promise) {
      this.findSelect('tag', { as: 'entertainment', query: query.term }, promise);
    },
   
    findFoodSelectTags: function(query, promise) {
      this.findSelect('tag', { as: 'food', query: query.term }, promise);
    },
   
    findTravelSelectTags: function(query, promise) {
      this.findSelect('tag', { as: 'travel', query: query.term }, promise);
    },
   
    findPoliticsSelectTags: function(query, promise) {
      this.findSelect('tag', { as: 'politics', query: query.term }, promise);
    },
   
    findOtherSelectTags: function(query, promise) {
      this.findSelect('tag', { as: 'other', query: query.term }, promise);
    },
   
    cancel: function() {
      var client = this.get('model');
      client.rollback();
      return this.transitionToRoute('clients.show',client);
    },

    save: function(promise) {
      // var breadcrumbs = this.get('breadcrumbs');
      // debugger;

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
          tags.addObject(add);
        } else {
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

      var save = function() {
        return promise(new Ember.RSVP.Promise(function(res, rej) {
          if (client.save()) {
            return res("OK");
          } else {
            return rej("Failed");
          }
        }));
      };

      if (promises.length > 0) {
        Ember.RSVP.Promise.all(promises).then(function(/*resolved*/) {
          save();
        }, function(/*failed*/) {
        });
      } else {
        save();
      }
    }

  }

});
