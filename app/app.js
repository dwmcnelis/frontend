import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({

  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true

});

App.reopenClass ({

  resizer: function () {
    // console.debug('resizer: window width: '+Ember.$(window).width()+' height: '+Ember.$(window).height());

    var width = Ember.$(window).width();
    var height = Ember.$(window).height();

    var bannerHeight = (width >= 500 ? 60 : 0);
    var masterHeight = (height-bannerHeight)+'px';
    var masterRibbonHeight = 40;
    var masterContentHeight = (height-bannerHeight-masterRibbonHeight)+'px';
    var detailHeight = (height-bannerHeight)+'px';
    var detailRibbonHeight = 40;
    var detailContentHeight = (height-bannerHeight-detailRibbonHeight)+'px';
    Ember.run.later(function () {
      Ember.$('.page').height(height);
      Ember.$('.full').height(height);
      Ember.$('.master').height(masterHeight);
      Ember.$('.master-content').height(masterContentHeight);
      Ember.$('.detail').height(detailHeight);
      Ember.$('.detail-content').height(detailContentHeight);
    }, 50);
  }

});

loadInitializers(App, config.modulePrefix);

export default App;

Ember.$(window).on("load resize",function() {
  App.resizer();
});
