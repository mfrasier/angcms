'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
    .value('version', '0.1')
    .factory('pagesFactory', ['$http', function($http) {
      return {
        getPages: function() {
          return $http.get('/api/pages');
        },

        savePage: function(pageData) {
          var id = pageData._id;

          if (id === 0) {
            return $http.post('/api/pages/add', pageData);
          }
          else {
            return $http.post('/api/pages/update', pageData);
          }
        },

        deletePage: function(id) {
          return $http.delete('/api/pages/delete/' + id);
        },

        getPageContent: function(url) {
          return $http.get('/api/pages/details/' + url);
        }
      }
    }])
    .factory('AuthService', ['$http', function($http) {
      return {
        login: function(credentials) {
          return $http.post('/api/login', credentials);
        },
        logout: function() {
          return $http.get('/api/logout');
        }
      }
    }]);
