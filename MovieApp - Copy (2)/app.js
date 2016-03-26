var moviesApp = angular.module('movieCatApp', ['ngRoute']);


    moviesApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/movies', {
            templateUrl: 'partials/movie-list.html',
            controller: 'movieListCtrl'
          })
          .when('/movies-info', {
            templateUrl: 'partials/movie-list-info.html',
            controller: 'movieListCtrl'
          })
           .when('/', {
            templateUrl: 'partials/front-page.html'
          })
            .when('/about', {
            templateUrl: 'partials/about.html'
          })
          .when('/movies/:movieId', {
            templateUrl: 'partials/movie-detail.html',
            controller: 'movieDetailCtrl'
          })
          .otherwise({
            redirectTo: '/movies'
          });
      }]);

    moviesApp.controller('movieListCtrl', ['$scope', 'movieService',
          function($scope, movieService) {
             movieService.getmovies().success(function(data) {
                   $scope.movies = data
                 })
              $scope.addMovie = function(){
          $scope.movies.push({
            name: $scope.newMovie.name,
            id: $scope.newMovie.id,
            imageUrl: $scope.newMovie.imageUrl,
            age: $scope.addMovie.age
 
          })
          $scope.newMovie = {} 
        }
             $scope.orderProp = 'age';

          }]) 

   moviesApp.controller('movieDetailCtrl', 
         ['$scope', '$location', '$routeParams', 'movieService', 
         function($scope, $location, $routeParams, movieService) {
             movieService.getmovie($routeParams.movieId)
                .success(function(data) {
                   $scope.movie = data
                   $scope.img = $scope.movie.images[0]
                   })
                .error(function(err) {
                    $location.path('./pnones') 
                  })
            $scope.addReview = function(){
          $scope.movie.reviews.push({
            author: $scope.newReview.author,
            body: $scope.newReview.body
        
 
          })
          $scope.newReview= {} 
        }
             $scope.setImage = function(img) {
                  $scope.img = img
               }
      }])

          moviesApp.factory('movieService', ['$http' , function($http){
            var api = {
                getmovies : function() {
                    return $http.get('movies/movies.json')            
                }, 
                getmovie : function(id) {  // NEW
                     return $http.get('movies/' + id + '.json')
                }
            }
            return api
        }])

