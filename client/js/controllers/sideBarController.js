featureToggleFrontend.controller('SideBarController', function($scope, $http, ApplicationService, $timeout, $location) {

    //$scope.AppsService = ApplicationService;
    
    //$scope.Applications = ApplicationService.getApplications();

    ApplicationService.getApplications().then(function(applications){
    	$scope.Applications = applications;
    })
    

    $scope.isActive = function(appName) {
    	return ($location.path() === '/applications/' + appName);
	}
});