// app/controllers/application.js

import Ember from 'ember';
import App from '../app';

export default Ember.ObjectController.extend({
	currentPathChange: function () {
		App.resizer();
	}.observes('currentPath')

});
