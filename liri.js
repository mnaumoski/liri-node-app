//get node modules
var request = require('request');
var getTwitter = require('twitter');
var getSpotify = require('spotify');
var keys = require('./keys.js');

//liri will have several commands; use switch
var command = process.argv[2];

switch (command) {
  case "movie-this":// `node liri.js movie-this '<movie name here>'`
    findMovie();
    break;
  case "my-tweets":

        var twitterConsumerKey = keys.twitterKeys;
        console.log(twitterConsumerKey);
        break;
                    // case "spotify-this-song":
                    // break;

                    // case "do-what-it-says":

                    // break;

                    default:
                    text = "Looking forward to the Weekend";
                };

function findMovie() {
  var movieName = process.argv[3]; //input name of movie
  var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json&tomatoes=true';
  request(queryUrl, function(error, response, body) {
                    if (!error && response.statusCode == 200){
                    // title of movie
                    console.log("The title of the movie is " + JSON.parse(body)['Title']);
                    // year of release
                    console.log("The release year of " + movieName + " is " + JSON.parse(body)['Year'] + ".");
                    //rating of the movie
                    console.log("Rating: " + movieName + " has an imdb rating of " + JSON.parse(body)['imdbRating'] + ".");
                    // country
                    console.log("Country: " + movieName + " has been produced in " + JSON.parse(body)['Country'] + ".");
                    // language
                    console.log("Language: " + JSON.parse(body)['Language'] + ".");
                    // plot
                    console.log(movieName + "'s plot: " + JSON.parse(body)['Plot'] + ".");
                    // actors
                    console.log("Actors in the movie: " + JSON.parse(body)['Actors'] + ".");
                    // rotten tomatoes rating
                    console.log("Rotten tomatoes rating is: " + JSON.parse(body)['tomatoRating']);
                    // rotten tomatoes URL
                    console.log("Rotten tomatoes URL: " + JSON.parse(body)['tomatoURL']);

                       }
                     })
                  // when user search is empty
  if (movieName === null || movieName === "") {
    request('http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&r=json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
                                console.log("The title of the movie is " + JSON.parse(body)['Title']);
                            }
                      });
                    }
                  }
