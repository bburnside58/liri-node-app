
// Load the fs package to read and write
var fs = require('fs');
//request node package to...request stuff
var request = require('request');
// twitter require module
var Twitter = require('twitter');
// grabs twitter api keys from keys.js 
var key = require('./keys.js');
// grabs the user's command
var argument = process.argv[2];
// input data
var input = process.argv[3];

// User command - function execution
switch(argument){
	case 'mytweets':
		twitter();
	break;

	case 'moviethis':
		movies();
	break;

	case 'dowhatitsays':
		whatever();
	break;

	case null:
		console.log("Choose 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.");
	break;

	default:
		console.log("Choose 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.")
}

function twitter(){
   	// twitter keys from keys.js
    var client = new Twitter(key.twitterKeys);
    // twitter parameters screen_name is equal to process.argv[3] a.k.a. user's input
    var params = {screen_name: input, count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      	if (!error) {
	        for (var i = 0; i < tweets.length; i++) {
	        	console.log(tweets[i].text + " " + tweets[i].created_at);
	        	console.log('\n');
	        }
	        console.log("To search again type 'mytweets', space, and then the 'username'.")
      	}
    });
}

function spotify(){

}

function movies(inputRandomTxt){
	// console.log(input) for testing purposes
	var movieName = input;
	var movieName2 = process.argv[4];
	// dynamic url 
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';
	// If no movie name is given liri will provide the data from the movie Mr. Nobody
	if (movieName == null) {
			movieName = "Mr. Nobody";
		}
	// In case the movie title is 2 words (Sorry long movie names ;) )
	if (movieName2 != null) {
		var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '+' + movieName2 +'&y=&plot=short&r=json&tomatoes=true';
	}
	// if user chooses dowhatitsays command, grabs data from random.txt file
	if (inputRandomTxt != null) {
		var queryUrl = 'http://www.omdbapi.com/?t=' + inputRandomTxt +'&y=&plot=short&r=json&tomatoes=true';
	}
	// request function OMDb
	request(queryUrl, function(err, response, body){
		// In case anything catches fire
		if (err) {
			return console.log(err);
		}
		// string to JSON object
		body = JSON.parse(body);
		// Just in case the user searches for nonsense. 
		if (body.Title == undefined) {
			return console.log("Movie not found.")
		}
		// Main purpose of function below. Console.log movie data that we want.
		console.log(body.Title);
		console.log(body.Year);
		console.log(body.imdbRating);
		console.log(body.Country);
		console.log(body.Language);
		console.log(body.Plot);
		console.log(body.Actors);
		console.log(body.tomatoRating);
		console.log("-----------------------------------------------------------------------");
		console.log("Rotten Tomatoes url: " + body.tomatoURL);
		console.log("Omdb api url: " + queryUrl);
		// console.log(body);
	})
}

function whatever() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        // text converted to array
        var randomArray = data.split(",");
        // passes array data to appropriate function
        if (randomArray[0] == 'movie-this') {
            movies(randomArray[1]);
        }
    })
}














