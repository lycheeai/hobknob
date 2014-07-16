'use strict';

angular.module('featureToggleFrontend')

.factory('ToggleService', function(ENV, $http, etcdApiService, App, Toggle, _) {

  var ToggleService = function() {}

  ToggleService.prototype = {
    hydrateToggles: function(app) {
      return etcdApiService.getToggles(app.key)
        .then(function(response){
          app.setToggles(response.data);
          return app;
        });
    }
  };

  return new ToggleService;

});