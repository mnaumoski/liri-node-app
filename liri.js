//get node modules
var request = require('request');
var Twitter = require('twitter');
var getSpotify = require('spotify');
var keys = require('./keys.js');

// search term is the argument with 3 index
var searchTerm = process.argv[3];

//liri will have several commands; use switch
var command = process.argv[2];

function switchFunction(command, searchTerm) {
switch (command) {
    case "movie-this":
        movieThis();
        break;
    case "my-tweets":
        findTweets();
        break;
    case "spotify-this-song":
        findSong();
        break;
    case "do-what-it-says":
        var fs = require('fs');

        fs.readFile("random.txt", "utf8", function(err, data) {

            var dataArr = data.split(',');
           
            var command = dataArr[0];
            var searchTerm = dataArr[1];

            console.log(command, searchTerm);
            // console.log(searchTerm, command);

            switchFunction(command, searchTerm);
            // switchFunction(searchTerm, command);
            // switchFunction();

            if (err) {
                return console.log(err);
            }

        });

        break;

    default:
        text = "Looking forward to the Weekend";
};
}
switchFunction(command, searchTerm);

//a function that searches spotify for a song 
function findSong() {
    // spotify package
    var spotify = require('spotify');
    // if user does not type anything/space
    if (searchTerm == null) {
        // I use lookup instead of seach because I know the unique id of the song that is required in the instructions
        spotify.lookup({ type: 'track', id: '0hrBpAOgrt8RXigk83LLNE' }, function(err, data) {
            // name of song and its artists
            console.log("Song name: " + data.name);
            console.log("Band: " + data.artists[0].name);
        })

    } else {
        // search for track
        spotify.search({ type: 'track', query: searchTerm }, function(err, data) {

            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            if (!err) {

                console.log("========================");
                // name of artist
                console.log("Name of artist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
                // name of song
                console.log("Song name: " + JSON.stringify(data.tracks.items[0].name, null, 2));
                // preview of song
                console.log("Use this link for a song preview: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
                // Album where the songs come from
                console.log("Album name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
                console.log("========================");
            }
        });
    }
}

// find movie using request
function findMovie() {

    var searchTerm = process.argv[3]; //input name of movie
    // query for omdb
    queryUrl = 'http://www.omdbapi.com/?t=' + searchTerm + '&y=&plot=short&r=json&tomatoes=true';
    //request data only if there are no errors
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("========================");
            // title of movie & release year
            console.log("The title of the movie is " + JSON.parse(body)['Title'] + "." + " The release year of " + JSON.parse(body)['Title'] + " is " + JSON.parse(body)['Year'] + ".");
            // rating & country & language
            console.log("It has an imdb rating of " + JSON.parse(body)['imdbRating'] + "." + " Filmed in: " + JSON.parse(body)['Country'] + "." + " Language: " + JSON.parse(body)['Language'] + ".");
            // plot
            console.log("Plot: " + JSON.parse(body)['Plot'] + ".");
            // actors
            console.log("Actors in the movie: " + JSON.parse(body)['Actors'] + ".");
            // rotten tomatoes rating
            console.log("Rotten tomatoes rating is: " + JSON.parse(body)['tomatoRating']);
            // rotten tomatoes URL
            console.log("Rotten tomatoes URL: " + JSON.parse(body)['tomatoURL']);
            console.log("========================");
        }
    })
}

function findTweets() {
    // require twitter package
    var Twitter = require('twitter');
    //var that gets the twitter keys from keys.js
    var client = new Twitter(keys.twitterKeys);
    // parametars used to get the info we need
    var params = { screen_name: 'MarijaNaumoski', exclude_replies: true, trim_user: true };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error) {
            // for loop to display 20 tweets 
            for (var i = 0; i < 20; i++) {
                console.log("========================");
                console.log("Tweet number " + i);
                console.log(JSON.stringify("On " + tweets[i].created_at + " I posted the following: -- " + "'" + tweets[i].text + "'", null, 2));
            }
        }
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
    });
}

function movieThis() {
    if (searchTerm == null) {

        queryUrl = 'http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&r=json';

        request(queryUrl, function(error, response, body) {
            // title of movie & release year
            console.log("The title of the movie is " + JSON.parse(body)['Title'] + "." + "The release year of " + JSON.parse(body)['Title'] + " is " + JSON.parse(body)['Year'] + ".");
            // rating & country & language
            console.log("It has an imdb rating of " + JSON.parse(body)['imdbRating'] + "." + " Filmed in: " + JSON.parse(body)['Country'] + "." + " Language: " + JSON.parse(body)['Language'] + ".");
            // plot
            console.log("Plot: " + JSON.parse(body)['Plot'] + ".");
            // actors
            console.log("Actors in the movie: " + JSON.parse(body)['Actors'] + ".");
        });

    } else {
        findMovie()
    }
}
