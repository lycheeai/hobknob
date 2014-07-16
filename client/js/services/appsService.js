'use strict';

angular.module('featureToggleFrontend')

.factory('ApplicationService', function(ENV, $http, etcdApiService, App, Toggle, ToggleService) {

  var ApplicationService = function() {}

  ApplicationService.prototype = {
    getApplications: function(){
        return etcdApiService
          .getApplications()
            .then(function(applicationData){
              return _.map(applicationData.data.node.nodes, App.create);
            });
      },

      getApplication: function(applicationName){
        return etcdApiService
          .getApplication(applicationName)
          .then(function(applicationData){
            var app = App.create(applicationData.data.node);
            return ToggleService.hydrateToggles(app);
          });
      }

      // getApplication: function(applicationName){
      //   return etcdApiService
      //     .getApplication(applicationName)
      //     .then(function(applicationData){
      //       return App.create(applicationData.data.node);
      //     });
      // }
    };

    return new ApplicationService;


  // function AppsService(){
  //   this.apps = [];
  //   this.selectedApp = null;
  // }

  // AppsService.prototype = {

  //   loadApps:function(){
  //     return etcdApiService.getApplications()
  //       .success(this.setApps.bind(this));
  //   },

  //   loadApp:function(appName){
  //     return etcdApiService.getApplication(appName)
  //       .success(this.setSelectedApp.bind(this));
  //   },

  //   setSelectedApp: function(response) {
  //     var app = App.create(response.node);
  //     this.selectedApp = app;
  //     this.selectedApp.loadToggles();
  //   },

  //   setApps:function(response){
  //     this.apps = response.node.nodes.map(App.create);
  //     this.selectedApp = this.apps[0];
  //     this.selectedApp.loadToggles();
  //   },

  //   loadToggle:function(appName, toggleName){
  //     return etcdApiService.getToggle(appName, toggleName)
  //       .success(this.setSelectedToggle.bind(this));
  //   },

  //   setSelectedToggle: function(response) {
  //     var toggle = Toggle.create(response.node);
  //     this.selectedToggle = toggle;
  //     this.selectedToggle.loadAudit();
  //   },

  //   updateToggle: function(toggle) {
  //     return etcdApiService.updateToggle(toggle);
  //   }

  // };

  // return new AppsService();


});