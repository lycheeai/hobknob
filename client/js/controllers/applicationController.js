featureToggleFrontend.controller('ApplicationController', function($scope, $http, etcdApiService, etcdPathService, ApplicationService, $timeout, $routeParams) {


    ApplicationService.getApplication($routeParams.appName).then(function(app){
    	console.log(app);
    	$scope.Application = app;	
    })

    $scope.updateThisToggle = function(toggle) {
      $timeout(function(){
        ApplicationService.updateToggle(toggle);
      });
    }
});