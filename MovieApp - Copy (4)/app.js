var moviesApp = angular.module('movieCatApp', ['firebase','ngRoute']);
moviesApp.constant('FBMSG','https://reviewitproject.firebaseio.com/movies');

    moviesApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/movies', {
            templateUrl: 'partials/movie-list.html',
            controller: 'movieListCtrl',
              resolve: {
              "currentAuth" : ["authFactory", function(authFactory){
                var auth = authFactory.auth();
                return auth.$requireAuth();
              }]
            }
          })
          .when('/movies-info', {
            templateUrl: 'partials/movie-list-info.html',
            controller: 'movieListCtrl',
              resolve: {
              "currentAuth" : ["authFactory", function(authFactory){
                var auth = authFactory.auth();
                return auth.$requireAuth();
              }]
            }
          })
           .when('/logout', {
            templateUrl: 'partials/movie-list-info.html',
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl',
            controllerAs: 'loginCtl',
            resolve: {
              "logout": ['authFactory', function(authFactory){
                authFactory.logout();
              }]
            }
          })
            .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl',
            controllerAs: 'loginCtl'
          })

              .when('/', {
            templateUrl: 'partials/front-page.html'
          })
            .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'loginCtrl',
            controllerAs: 'loginCtl'
          })
            .when('/about', {
            templateUrl: 'partials/about.html'
          })
          .when('/movies/:movieId', {
            templateUrl: 'partials/movie-detail.html',
            controller: 'movieDetailCtrl',
               resolve: {
              "currentAuth" : ["authFactory", function(authFactory){
                var auth = authFactory.auth();
                return auth.$requireAuth();
              }]
            }
          })
          .otherwise({
            redirectTo: '/movies'
          });
      }])

.run(['$rootScope', '$location', function($rootScope, $location){

  $rootScope.$on('$routeChangeError', function(event, next, previous, error){
    console.log(error);
      if(error = 'AUTH_REQUIRED'){

        console.log('Error in Auth');
        $location.path("/login");
    }
  })
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

        moviesApp.controller('loginCtrl', ['FBMSG','authFactory','$window',
          function(FBMSG,authFactory,$window) {
              var self = this;
              self.signUp = function(){
                var result = authFactory.createUser(self.email, self.password);

                result.then(function(userData){
                  console.log("User created successfully with uid: ", userData.uid);
                },function(error){
                  console.log(error);
                })
              }

                 self.login = function(){
                var result = authFactory.authUser(self.email, self.password);

                result.then(function(userData){
                  console.log("User logged in successfully with uid: ", userData.uid);
                  $window.location.href = '/movieapp/#/movies';
                },function(error){
                  console.log(error);
                })
              }
         
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


          moviesApp.factory('authFactory',['FBMSG','$firebaseAuth',function(FBMSG, $firebaseAuth){
            var authFactory = {};
            var ref = new Firebase(FBMSG);
            var auth = $firebaseAuth(ref);


            authFactory.createUser = function(email,password){
            return auth.$createUser({
              email: email,
              password: password
            })};

               authFactory.authUser = function(email,password){
            return auth.$authWithPassword({
              email: email,
              password: password
            })};
            

            authFactory.auth = function(){
              return auth;
            }

            authFactory.logout = function(){
              auth.$unauth();
            }


            return authFactory;
          
          }])




