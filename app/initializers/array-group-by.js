// app/initializers/array-group-by.js
  
import Ember from 'ember';

var alreadyRun = false;

export default {
  name: 'array-group-by',
  initialize: function() {
    if (alreadyRun) {
      return;
    } else {
      alreadyRun = true;
    }

    Ember.Array.reopen({

      toSelectOptions: function(key) {        
        var result = [];
        var object, text;

        this.toArray().forEach(function(item) {
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
      }

    });
  }

};
