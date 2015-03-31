// app/store.js

import DS from 'ember-data';

export default DS.Store.extend({

  // Find select model, reformatting results for zz-select
  //
  // @function findSelect
  // @param model model to search
  // @param options query parameters
  // @param promise promise to fulfill with options
  //
  findSelect: function(model, options, promise) {
    this.find(model, options).then(function(records) {
      promise.resolve(records.toSelectOptions('grouping'));
    }, function(reason) {
      promise.reject(reason);
    });
  }

});
