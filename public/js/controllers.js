'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('AdminPagesCtrl', ['$scope', '$log', 'pagesFactory',
      function($scope, $log, pagesFactory) {
        pagesFactory.getPages().then(function(response) {
            $scope.allPages = response.data;
        },
        function(err) {
            $log.error(err);
        });

        $scope.deletePage = function(id) {
          pagesFactory.deletePage(id);
        }
  }])
    .controller('AdminLoginCtrl',
    ['$scope', '$location', '$cookies', 'AuthService', 'flashMessageService', '$log',
    function($scope, $location, $cookies, AuthService, flashMessageService, $log) {
        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.login = function(credentials) {
            AuthService.login(credentials).then(
                function(res, err) {
                    $cookies.loggedInUSer = res.data;
                    $location.path('/admin/pages');
                },
                function(err) {
                    flashMessageService.setMessage(err.data);
                    $log.log(err);
                }
            )
        }
    }]);
