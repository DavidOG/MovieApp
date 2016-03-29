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

. . . . . Screenshots of app's views (see example below) with appropriate captions (excluding user regeneration and login views) . . . . . . . 



###Routing.

. . . . List each route supported and state the associated view . . . . . 
+ /foos - displays all published foos
+ /foos/:id - detail view of a particular foo (:id)
+ etc
+ etc

###Extra features

. . . . . Briefly explain any non-standard features, functional or non-functional (e.g. user registration, authentication) developed for the app . . . . . .  

###Independent learning.

. . . . . State the non-standard aspects of Angular (or other related technologies) that you researched and applied in this assignment . . . . .  

[image1]: ./model.png
[image2]: ./design.png

