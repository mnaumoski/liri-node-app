//get node modules
var request = require('request');
var Twitter = require('twitter');
var getSpotify = require('spotify');
var keys = require('./keys.js');

var movieName = process.argv[3];

//liri will have several commands; use switch
var command = process.argv[2];

switch (command) {
    case "movie-this": // `node liri.js movie-this '<movie name here>'`
        if (movieName == null) {
          // movieName = "Mr.+Nobody";
       queryUrl = 'http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&r=json';

        request(queryUrl, function(error, response, body) {
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

            });

        }
          else {
          findMovie() }
        break;
    case "my-tweets":
        var Twitter = require('twitter');

        var client = new Twitter(keys.twitterKeys);

        var params = { screen_name: 'MarijaNaumoski', count: 1, exclude_replies: true, trim_user: true };

        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                console.log(tweets);
                // console.log(tweets[1].created_at)
            }
        });
        break;
    case "spotify-this-song":
        findSong();
        // * Artist(s)
        // * The song's name
        // * A preview link of the song from Spotify
        // * The album that the song is from

        // * if no song is provided then your program will default to
        // * "The Sign" by Ace of Base

        break;

        // case "do-what-it-says":

        // break;

    default:
        text = "Looking forward to the Weekend";
};

function findSong() {

    var spotify = require('spotify');

    var songName = process.argv[3];

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        if (!err) {
          console.log(data);
          // console.log(JSON.parse(data)['tracks']);
        }
    });
}

function findMovie() {

    var movieName = process.argv[3]; //input name of movie

    queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json&tomatoes=true';
    
    request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode == 200) {
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
    // when user search is empty
    // request('http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&r=json', function(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log("The title of the movie is " + JSON.parse(body)['Title']);
    //     }
    // });
    })
}
