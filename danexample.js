//get node modules
var request = require('request');
var Twitter = require('twitter');
var getSpotify = require('spotify');
var keys = require('./keys.js');
var child_process = require('child_process');

// var arg3 = process.argv[3];

// //liri will have several commands; use switch
// var command = process.argv[2];

function switchStatement(arg2, arg3){
    switch (arg2) {
        case "movie-this": // `node liri.js movie-this '<movie name here>'`
            if (arg3 == null) {
                // arg3 = "Mr.+Nobody";
                queryUrl = 'http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&r=json';

                request(queryUrl, function(error, response, body) {
                    // title of movie
                    console.log("The title of the movie is " + JSON.parse(body)['Title'] + "." + "The release year of " + arg3 + " is " + JSON.parse(body)['Year'] + ".");
                    // rating
                    console.log("It has an imdb rating of " + JSON.parse(body)['imdbRating'] + ".");
                    // country
                    console.log("Country: " + JSON.parse(body)['Country'] + ".");
                    // language
                    console.log("Language: " + JSON.parse(body)['Language'] + ".");
                    // plot
                    console.log("Plot: " + JSON.parse(body)['Plot'] + ".");
                    // actors
                    console.log("Actors in the movie: " + JSON.parse(body)['Actors'] + ".");
                    // rotten tomatoes rating
                    console.log("Rotten tomatoes rating is: " + JSON.parse(body)['tomatoRating']);
                    // rotten tomatoes URL
                    console.log("Rotten tomatoes URL: " + JSON.parse(body)['tomatoURL']);

                });

            } else {
                findMovie()
            }
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
                    console.log (dataArr[0]);
                    console.log (dataArr[1]);

                    // console.log(process.argv[2]);



                    if(err) {
                        return console.log(err);
                    }

                    });

            break;

        default:
            text = "Looking forward to the Weekend";
    }
};

switchStatement(process.argv[2], process.argv[3]);

function findSong() {

    var spotify = require('spotify');

    // var songName = process.argv[3];

    if (arg3 == null) {

        spotify.lookup({ type: 'track', id: '0hrBpAOgrt8RXigk83LLNE' }, function(err, data) {
            console.log ("Song name: " + data.name);
            console.log ("Band: " + data.artists[0].name);

                })

    } else {

        spotify.search({ type: 'track', query: songName }, function(err, data) {

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

                    console.log("Use this link for a song preview: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));

                    // Album where the songs come from
                    console.log("Album name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));

                    console.log("========================");
                    }
        });
    }
}
function findMovie() {

    var arg3 = process.argv[3]; //input name of movie
    // query for omdb
    queryUrl = 'http://www.omdbapi.com/?t=' + arg3 + '&y=&plot=short&r=json&tomatoes=true';
    //request data only if there are no errors
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("========================");
            // title of movie
            console.log("The title of the movie is " + JSON.parse(body)['Title']);
            // year of release
            console.log("The release year of " + arg3 + " is " + JSON.parse(body)['Year'] + ".");
            //rating of the movie
            console.log("Rating: " + arg3 + " has an imdb rating of " + JSON.parse(body)['imdbRating'] + ".");
            // country
            console.log("Country: " + arg3 + " has been produced in " + JSON.parse(body)['Country'] + ".");
            // language
            console.log("Language: " + JSON.parse(body)['Language'] + ".");
            // plot
            console.log(arg3 + "'s plot: " + JSON.parse(body)['Plot'] + ".");
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
