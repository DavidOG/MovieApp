# MovieApp
#Assignment 1 - AngularJS app.

Name: David O'Grady

###Overview.

ReviewIT the movie review app!
I wanted to create an application that would allow users to post there reviews about popular movies. Users can also post new movies to review. I wanted a netflix-esque home screen that would allow users to search for there movies on the movies home while the page was dynamically searching the list of movies based on there search query. I wanted to authentify/register users using firebase. This would allow me to limit certain aspects of the web application to signed in users only. Once a users has found a specific movie. They are able to write a review about it. There are a lot of small things I would of liked to have included in the app to make more a "real world" application but didnt get a chance to due to time contraints. For future iterations of the project I would work on connecting the user model to those movies and reviews. I would also allow users to rate the movie and then show the average rating for each movie. I have worked with other languages before and I while I found creating the controllers/models more complicated and time consuming, I can see the many benefits of using zangular for front end web application development.

 . . . . . List of user features (excluding user registration and authentication) . . . . 
 + Create Movie
 + Write review about movie
 + delete review
 + View all movies
 + View all reviews about movie
 + Edit review



###Installation requirements.
. . . .  List of software used to develop the app . . . . . . . 
+ AngularJS 1.2.18
+ Bootstrap 3.3.1
+ angularfire 1.1.4
+ firebase 2.2.4

http-server module used to run application
install with npm install http-server -g
(-g) means that the http-server command can be used directly in the cmd console

navigate to highest level movieApp folder and type http-server and press enter

open a broswer and navigate to
localhost:8000/MovieApp/ 

###Data Model Design.


![][image1]

{
    
    "description": "Fearing the actions of Superman are left unchecked, Batman takes on the man of steel, while the world wrestles with what kind of a hero it really needs. With Batman and Superman fighting each other, a new threat, Doomsday, is created by Lex Luthor. Its up to Superman and Batman to set aside their differences along with Wonder Woman to stop Lex Luthor and Doomsday from destroying Metropolis.",
    "id": "batman-v-superman", 
    "images": [
        "img/phones/batman-v-superman.jpg"
    ], 
    "name": "Batman Vs Superman",
    "reviews": [ 
                     {
                         "body": "first comment Fearing the actions of Superman are left unchecked, Batman takes on the man of steel Fearing the actions of Superman are left unchecked, Batman takes on the man of steel",
                         "author": "jbloggs", 
                         "upvotes": "2" 
                     } ,
                     {
                         "body": "Fearing the actions of Superman are left unchecked, Batman takes on the man of steel, while the world wrestles with what kind of a hero it really needs. With Batman and Superman fighting each other, a new threat, Doomsday, is created by Lex Luthor. Its up to Superman and Batman to set aside their differences along with Wonder Woman to stop Lex Luthor and Doomsday from destroying Metropolis.",
                         "author": "psmith", 
                         "upvotes": "3"
                     } 
                     
                     ]
}

###App Design.

A simple diagram showing the app's component design, in particular controllers and services (see example below).

![][image2]

###UI Design.

![][image3]
![][image4]
![][image5]



###Routing.

. . . . List each route supported and state the associated view . . . . . 
+ /movies - displays all published foos
+ /movies/:id - detail view of a particular foo (:id) and all associated reviews aswell as the create review form
+ /login
+ /logout
+ /register
+ /about
+ / - this is the home page


## Web API Endpoint Reference

This API can you be used to perform crud functionality on all the movies and reviews stored in my mongo database.


| HTTP Verb & Path |  Description |
| --- | --- |
| GET: /api/movies |return a list of movie |
| GET: /api/movies/:movie_id |return a specific movie and its reviews |
| POST: /api/movies |add a new movie |
| PUT: /api/movies/:movie_id | update a movie and its reviews|
| DELETE: /api/movies/:movie_id | delete a movie |
| DELETE: /api/movies/:movie_id/reviews/:review_id | delete a review |
| POST: /api/movies/:movie_id/reviews |add a new review to an existing movie |

###Extra features

The combination of Angular and Firebase provides a three-way data binding between the HTML, the JavaScript, and the Firebase database
for user authentification. By using the firebase I can authenticate a user and received detailed error results about incorrect passwords or if the user already exists. Firebase passes my app a session token once a user has authentificated so that the sessiion state is handles on the client side as opposed to the server. To end a session I needed to simply delete this token.
Firebase made authetification really easy and combining it with my own authentification factory made for a secure application.

I have also used an unofficial imdb api to get the imdb rating for each movie. This is done by providing the imdbid when creating the movie and then going a get request to return a movie object from imbd and then the rating is extracted from this object.

###Independent learning.


[image1]: ./model.png
[image2]: ./design.png
[image3]: ./screen1.png
[image4]: ./screen2.png
[image5]: ./screen4.PNG


