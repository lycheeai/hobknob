featureToggleFrontend.controller('SideBarController', function($scope, $http, etcdApiService, etcdPathService, AppsService, $timeout, $location, $window) {

    $scope.AppsService = AppsService;
    AppsService.loadApps();
    $scope.user = $window.user._json
    $scope.isActive = function(appName) {
    	return ($location.path() === '/applications/' + appName);
	}
});