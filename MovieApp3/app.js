var phonesApp = angular.module('phoneCatApp', ['ngRoute']);

    phonesApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/phones', {
            templateUrl: 'partials/phone-list.html',
            controller: 'PhoneListCtrl'
          })
          .when('/phones/:phoneId', {
            templateUrl: 'partials/phone-detail.html',
            controller: 'PhoneDetailCtrl'
          })
          .otherwise({
            redirectTo: '/phones'
          });
      }]);

    phonesApp.controller('PhoneListCtrl', ['$scope', 'PhoneService',
          function($scope, PhoneService) {
             PhoneService.getPhones().success(function(data) {
                   $scope.phones = data
                 })
             $scope.orderProp = 'age';
          }])

    phonesApp.controller('PhoneDetailCtrl', 
         ['$scope', '$location', '$routeParams', 'PhoneService', 
         function($scope, $location, $routeParams, PhoneService) {
             PhoneService.getPhone($routeParams.phoneId)
                .success(function(data) {
                   $scope.phone = data
                   $scope.img = $scope.phone.images[0]
                   })
                .error(function(err) {
                    $location.path('./pnones') 
                  })
             $scope.setImage = function(img) {
                  $scope.img = img
               }
      }])

          phonesApp.factory('PhoneService', ['$http' , function($http){
            var api = {
                getPhones : function() {
                    return $http.get('phones/phones.json')            
                }, 
                getPhone : function(id) {  // NEW
                     return $http.get('phones/' + id + '.json')
                }
            }
            return api
        }])

