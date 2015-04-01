// app/controllers/mixins/find-select.js

import Ember from 'ember';

export default Ember.Mixin.create({

  // Find model, reformatting results for zz-select
  //
  // @function findSelect
  // @param model model to search
  // @param options query parameters
  // @param promise promise to fulfill with options
  //
  findSelect: function(model, options, promise) {
    this.store.find(model, options).then(function(records) {
      var toSelect = function(enumerable, key) {        
        var object, text, result = [];
        enumerable.toArray().forEach(function(item) {
          text = item.get ? item.get(key) : item[key];
          text = text ? text.toUpperCase() : text;
          object = result.findProperty('text', text);
          if (!object) {
            object = {
              text: text,
              children: []
            };
            result.push(object);
          }
          return object.children.push(item);
        });
        return result;
      };
      promise.resolve(toSelect(records,'grouping'));
    }, function(reason) {
      promise.reject(reason);
    });
  }
  
});


