featureToggleFrontend.controller('DashboardController',
  function($scope, $http, etcdApiService, etcdPathService, AppsService) {

    // $scope.applicationList = {};
    // $scope.selectedApplication = {};
    // $scope.featureToggles = {};
    $scope.AppsService = AppsService;
    AppsService.loadApps()
    // $scope.alerts = [];

    // function getApplicationList() {
    //   etcdApiService.getApplications()
    //     .success(function (nodes) {
    //       $scope.applicationList = nodes;
    //       $scope.selectedApplication = nodes.node.nodes[0];
    //     })
    //     .error(function (error) {
    //       console.log('error getting app');
    //       $scope.alerts.push({type: "danger", msg: "Unable to retrieve application list from etcd"});
    //     });
    // }

    // $scope.getTogglesForApplication = function() {
    //   if ($scope.selectedApplication) {
    //     etcdApiService.getToggles($scope.selectedApplication.key)
    //       .success(function (nodes) {
    //         $scope.featureToggles = nodes;
    //       })
    //       .error(function (error) {
    //         $scope.alerts.push({type: "danger", msg: "Unable to retrieve toggles for application"});
    //       });
    //   }
    // }

    // getApplicationList();
});