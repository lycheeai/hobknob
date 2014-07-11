'use strict';

angular.module('featureToggleFrontend')

.factory('App', function(etcdApiService) {

  function App(data){
    angular.extend(this, data);
    this.toggles = [];
  }

  App.create = function(data){
    return new App(data);
  };

  App.prototype = {

    loadToggles:function(){
      etcdApiService.getToggles(this.key)
        .success(this.setToggles.bind(this));
    },

    setToggles:function(response){
      this.toggles = response.node.nodes;
    }


  };


  return App;

});