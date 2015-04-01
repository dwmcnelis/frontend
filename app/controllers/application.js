// app/controllers/application.js

import Ember from 'ember';
import App from '../app';

export default Ember.ObjectController.extend({

  nestedRoutes: [],

  topRoute: null,

	currentPathChange: function () {
		App.resizer();
    this.send('setNestedRoutes');
	}.observes('currentPath'),

	actions: {

    currentPathDidChange: function () {
      this.send('setNestedRoutes');
    },

    setNestedRoutes: function() {

      var nestedRoutes = [];

      // Clear out the current nested routes
      this.get('nestedRoutes').clear();

      // Get all the route objects
      var routes = this.container.lookup('router:main').get('router.currentHandlerInfos');

      // Get the route name, and model if it has one
      routes.forEach(function(route, i, arr) {

        // Ignore index routes etc.
        var name = route.name;
        if (name.indexOf('.index') !== -1 || name === 'application') {
          return;
        }

        var nestedRoute = Ember.Object.create({
          routeName: route.name,
          params: null,
          model: null
        });

        // If it's dynamic, you need to push in the model so we can pull out an ID in the link-to
        if (Ember.keys(route.params).length) {
          nestedRoute.setProperties({
            params: route.params,
            model: route.handler.currentModel
          });
        }

        // Now push it to the nested route
        nestedRoutes.pushObject(nestedRoute);
      });

      this.set('nestedRoutes', nestedRoutes);

      // Set the top nested route to be active
      var topRoute = this.get('nestedRoutes.lastObject');
      topRoute.set('active', true);
      this.set('topRoute', topRoute);
    }
  }

});
