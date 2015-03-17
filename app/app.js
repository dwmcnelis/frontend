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
    //var phone = 400;
    var phablet = 550;
    //var tablet = 750;
    //var desktop = 1000;
    //var workstation = 1200;

    var defaultBannerHeight = 60;

    var width = Ember.$(window).width();
    var height = Ember.$(window).height();

    var bannerHeight = (width >= 500 ? defaultBannerHeight : 0);
    var masterHeight, masterRibbonHeight, masterContentHeight, stackedMasterHeight;
    if (width < phablet) {
      stackedMasterHeight = defaultBannerHeight;
      masterHeight = (defaultBannerHeight)+'px';
      masterContentHeight = (defaultBannerHeight)+'px';
    } else {
      stackedMasterHeight = 0;
      masterHeight = (height-bannerHeight)+'px';
      masterRibbonHeight = 40;
      masterContentHeight = (height-bannerHeight-masterRibbonHeight)+'px';
    }
    var detailHeight = (height-bannerHeight-stackedMasterHeight)+'px';
    var detailRibbonHeight = 40;
    var detailContentHeight = (height-bannerHeight-stackedMasterHeight-detailRibbonHeight)+'px';
    var detailInnerHeight = (height-bannerHeight-stackedMasterHeight-detailRibbonHeight-stackedMasterHeight)+'px';

    // console.debug('resize: height: '+height);
    // console.debug('resize: width: '+width);
    // console.debug('resize: bannerHeight: '+bannerHeight);
    // console.debug('resize: masterHeight: '+masterHeight);
    // console.debug('resize: masterContentHeight: '+masterContentHeight);
    // console.debug('resize: stackedMasterHeight: '+stackedMasterHeight);
    // console.debug('resize: detailHeight: '+detailHeight);
    // console.debug('resize: detailContentHeight: '+detailContentHeight);

    Ember.run.later(function () {

      Ember.$('.page').height(height);
      Ember.$('.full').height(height);
      Ember.$('.master').height(masterHeight);
      Ember.$('.master-content').height(masterContentHeight);
      Ember.$('.detail').height(detailHeight);
      Ember.$('.detail-content').height(detailInnerHeight);
    }, 50);
  }

});

loadInitializers(App, config.modulePrefix);

export default App;

Ember.$(window).on("load resize",function() {
  App.resizer();
});
