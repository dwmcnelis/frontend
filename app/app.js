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
    var sidebarHeight = (height-bannerHeight)+'px';
    var sidebarRibbonHeight = 40;
    var sidebarMainHeight = (height-bannerHeight-sidebarRibbonHeight)+'px';
    var workspaceHeight = (height-bannerHeight)+'px';
    var workspaceRibbonHeight = 40;
    var workspaceMainHeight = (height-bannerHeight-workspaceRibbonHeight)+'px';
    // console.debug('resizer: sidebar height: '+sidebarHeight+' sidebar-main height: '+sidebarMainHeight);
    // console.debug('resizer: workspace height: '+workspaceHeight+' workspace-main height: '+workspaceMainHeight);
    Ember.run.later(function () {
      Ember.$('.sidebar').height(sidebarHeight);
      Ember.$('.sidebar-main').height(sidebarMainHeight);
      Ember.$('.workspace').height(workspaceHeight);
      Ember.$('.workspace-main').height(workspaceMainHeight);
    }, 50);
  }

});

loadInitializers(App, config.modulePrefix);

export default App;

Ember.$(window).on("load resize",function() {
  App.resizer();
});
