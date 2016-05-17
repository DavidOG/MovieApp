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
        var movie = {
            name: $scope.newMovie.name,
            imageUrl: $scope.newMovie.imageUrl,
            age: $scope.newMovie.age,
            imdbID:  $scope.newMovie.imdbID
            }
       movieService.addmovie(movie)
          .success(function(newMovie) {
             $scope.movies.push(newMovie);
             $scope.newMovie = { }
          });
    }

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
         ['$scope', '$location', '$routeParams', 'movieService', '$window',
         function($scope, $location, $routeParams, movieService) {
             movieService.getmovie($routeParams.movieId)
                .success(function(data) {
                   $scope.movie = data
                         movieService.getimdbinfo( $scope.movie.imdbID)
                .success(function(data) {
                   console.log(data.imdbRating)
                    $scope.movie.imdbRating = data.imdbRating

                   
                   })

                   })
                .error(function(err) {
                    $location.path('./movies') 
                  })

                  $scope.deletemovie = function(){
                movieService.deletemovie($routeParams.movieId)
                .success(function(data) {
                $scope.movies.splice( $scope.movies.indexOf(movie), 1 );
                 $window.location.href = '/movieapp/#/movies';
                   })
              }
            
     
    $scope.addReview = function(){
        var review = {
            author: $scope.newReview.author,
            body: $scope.newReview.body,
            rating: $scope.newReview.rating
            }
       movieService.addReview($scope.movie._id,review)
          .success(function(added_review) {
             $scope.movie.reviews.push(added_review);
             $scope.newReview = { }
             $scope.newReview.rating = 0

               movieService.getmovie($routeParams.movieId)
                .success(function(data) {
                   $scope.movie = data
                   })
                .error(function(err) {
                    $location.path('./movies') 
                  });
          });

         
    }
             $scope.setImage = function(img) {
                  $scope.img = img
               }

            $scope.deleteReview = function(review) {
            review.state = "deleted";
           }

           $scope.undoDelete = function(review) {
           review.state = "normal";
        }

            $scope.confirmDelete = function(index) {
                if ($scope.movie.reviews[index].state == "deleted") {
                  movieService.deletereview($routeParams.movieId,$scope.movie.reviews[index]._id )
                .success(function(data) {
                $scope.movie.reviews.splice(index, 1) 
                     movieService.getmovie($routeParams.movieId)
                .success(function(data) {
                   $scope.movie = data
                   })
                .error(function(err) {
                    $location.path('./movies') 
                  });
                   })      
                }
            }


              $scope.deletemovie = function(){
                movieService.deletemovie($routeParams.movieId)
                .success(function(data) {
                $scope.movies.splice( $scope.movies.indexOf(movie), 1 );
                 $window.location.href = '/movieapp/#/movies';
                   })
              }

            $scope.editReview = function(review) {
              review.oldAuthor= review.author;
              review.oldBody = review.body;
             
              review.state = "edit";
            }



             $scope.saveReview = function(review) {
              review.state = "normal";
          movieService.update($routeParams.movieId,$scope.movie)
            movieService.getmovie($routeParams.movieId)
                .success(function(data) {
                   $scope.movie = data
                   })
                .error(function(err) {
                    $location.path('./movies') 
                  });

          }

            $scope.cancelEdit = function(review) {
               review.author = review.oldAuthor;
              review.body = review.oldBody;
              review.state = "normal";
            }
      }])

          moviesApp.factory('movieService', ['$http' , function($http){
            var api = {
                getmovies : function() {
                    return $http.get('http://localhost:8000/api/movies')            
                }, 
                getmovie : function(id) {  // NEW
                     return $http.get('http://localhost:8000/api/movies/' + id)
                },
                  addmovie : function(movie) {
          return $http.post('http://localhost:8000/api/movies',movie)
            },
             deletemovie : function(id) {  // NEW
                     return $http.delete('http://localhost:8000/api/movies/' + id)
                },
                addReview : function(movie_id, review) {
          return $http.post('http://localhost:8000/api/movies/' + movie_id + '/reviews' ,review)
     }
     , deletereview : function(movie_id, review_id) {  // NEW
                     return $http.delete('http://localhost:8000/api/movies/' + movie_id + '/reviews/' + review_id)
                }
          , update : function(movie_id, movie) {  // NEW
                     return $http.put('http://localhost:8000/api/movies/' + movie_id, movie)
                },
            getimdbinfo : function(id) {  // NEW
                     return $http.get('http://www.omdbapi.com/?i=' + id)
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




