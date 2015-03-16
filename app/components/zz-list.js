// addon/components/zz_list.js

import Ember from 'ember';

// A smart list with sorting and filtering for Ember.js
//
// @module components
// @class  zz-list
//

export default Ember.Component.extend({

  // The root component element
  //
  // @property {Ember.String} tagName
  // @default  "button"
  //
  tagName: 'ul',

  // Bind the specified properties as DOM attributes.
  // @property attributeBindings
  // @private
  //
  //attributeBindings: ['disabled'],

  // Class names to apply to the button
  //
  // @property {Ember.Array} classNames
  //
  classNames: ['zz-list'],

  // Bind the specified properties as the classes of the DOM element.
  //
  classNameBindings: ['extraClasses'],

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  //
  extraClasses: null,

  // The list of items (models) 
  //
  // @property {Ember.Array}
  // @default  []
  //
  list: [],

  // Filtering
  //

  // Extra css classes 
  //
  // @property {Ember.String}
  // @default  null
  //
  filterTerm: null,

  // filter can be a function or an array of list item keys
  // function: function(item, index, list)
  // keys: ['id', 'name']
  filterBy: [],

  _filterKeys: function(){
    var source = this.get('filterBy');
    if(Ember.isArray(source) && source.length > 0) {
      return source;
    }
  }.property('filterBy.[]'),

  _filterFn: function(){
    var source = this.get('filterBy');
    if(typeof source === 'function') {
      return source;
    }
  }.property('filterBy'),

  _defaultFilterFn: function(item) {
    var purify = function(dirtyStr) {
      return dirtyStr.toLowerCase().replace(/\s+/g, '');
    };
    var getValue = function(key) {
      return item.get(key);
    };
    var stack = purify(this.get('_filterKeys').map(getValue).join(''));
    var needle = purify(this.get('filterTerm'));
    return stack.indexOf(needle) > -1;
  },

  _filtered: function(){
    var list = this.get('list').toArray();

    if (!this.get('filterTerm')) {
      return list;
    }
    if (this.get('_filterKeys')) {
      return list.filter(this.get('_defaultFilterFn').bind(this));
    }
    if (this.get('_filterFn')) {
      return list.filter(this.get('_filterFn').bind(this));
    }
    return list;
  }.property('list.[]', 'filterTerm', '_filterKeys', '_filterFn'),

  // Sorting
  //
  sortBy: [],

  _sortKeys: function(){
    var source = this.get('sortBy');
    if(Ember.isArray(source) && source.length > 0) {
      return source;
    }
  }.property('sortBy.[]'),

  _sortFn: function(){
    var source = this.get('sortBy');
    if(typeof source === 'function') {
      return source;
    }
  }.property('sortBy'),

  _defaultSortFn: function(a, b){
    var compareValue;
    this.get('_sortKeys').some(function(metaKey){
      var keys = metaKey.split(':');
      var key = keys[0];
      var asc = keys[1] === 'desc' ? -1 : 1;
      var propA = a.get(key);
      var propB = b.get(key);
      compareValue =  Ember.compare(propA, propB) * asc;
      return compareValue;
    });
    return compareValue || 0;
  },

  _filteredSorted: function(){
    var list = this.get('_filtered').toArray();

    if (this.get('_sortKeys')) {
      return list.sort(this.get('_defaultSortFn').bind(this));
    }
    if (this.get('_sortFn')) {
      return list.sort(this.get('_sortFn').bind(this));
    }
    return list;
  }.property('_filtered', '_sortKeys', '_sortFn'),

  // Group
  groupBy: null,

  _groupKey: function(){
    var source = this.get('groupBy');
    if (typeof source === 'string') {
      return source;
    }
  }.property('groupBy'),

  _groupFn: function(){
    var source = this.get('groupBy');
    if (typeof source === 'function') {
      return source;
    }
  }.property('groupBy'),

  _defaultGroupFn: function(item) {
    var key = this.get('_groupKey');
    return key ? item.get(key) : null;
  },

  groupHeading: null,

  _filteredSortedGrouped: function() {
    var groupBy = this.get('groupBy');
    var list = this.get('_filteredSorted').toArray();
    var groups;

    if (!groupBy) {
      return list;
    }
    if (this.get('_groupKey')) {
      groups = this._groupsFromList(list, this.get('_defaultGroupFn').bind(this));
      return this._listFromGroups(groups);
    }
    if (this.get('_groupFn')) {
      groups = this._groupsFromList(list, this.get('_groupFn').bind(this));
      return this._listFromGroups(groups);
    }
  }.property('_filteredSorted'),

  _groupsFromList: function(list, groupBy) {
    var addItemToGroup = function(groups, item){
     var key = groupBy(item);
      if (groups[key]) {
        groups[key].push(item);
      } else {
        groups[key] = [item];
      }
      return groups;
    };

    return list.reduce(addItemToGroup, {});
  },

  _groupHeading: function(key) {
    var groupHeadings = this.get('groupHeadings');
    var heading = (groupHeadings ? groupHeadings(key) : key);
    return {groupHeading: true, heading: heading};
  },

  _listFromGroups: function(groups){
    var list = [];
    for (var key in groups) {
      list.pushObject(this._groupHeading(key));
      list.pushObjects(groups[key]);
    }
    return list;
  },

  result: Ember.computed.alias('_filteredSortedGrouped')

});
