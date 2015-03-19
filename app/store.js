// app/store.js

import DS from 'ember-data';

export default DS.Store.extend({

  // Find select model, reformatting results for zz-select
  //
  // @function findSelect
  // @param model select model to search
  // @param term query term
  // @param promise promise to fulfill with options
  //
 	findSelect: function(model, term, promise) {
    this.find('select_'+model, { query: term }).then(function(records) {
      var options = records.map(function(item) {
        return {
          text: item.get('text'),
          children : item.get('children')
        };
      });
      promise.resolve(options);
    }, function(reason) {
        promise.reject(reason);
    });
  }

});
