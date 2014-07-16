'use strict';

angular.module('featureToggleFrontend')

.factory('App', function(etcdPathService, Toggle) {

  function App(data){
    angular.extend(this, data);
    this.toggles = [];
    var parts = etcdPathService.explode(data.key);
    this.version = parts[0];
    this.appName = parts[2];
  }

  App.create = function(data){
      return new App(data);
    }

  App.prototype = {

    setToggles:function(response){
      this.toggles = response.node.nodes.map(Toggle.create);
    }

  };

  return App;

});