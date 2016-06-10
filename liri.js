
// Load the fs package to read and write
var fs = require('fs');
//request node package to...request stuff
var request = require('request');
// twitter require module
var Twitter = require('twitter');
// grabs twitter api keys from keys.js 
var key = require('./keys.js');
// npm for spotify
var spotifyReq = require('spotify');
// grabs the user's command
var argument = process.argv[2];
// input data
// var input = process.argv[3];
// Load the NPM Package inquirer
var inquirer = require('inquirer');




// Created a series of choices with a question 
inquirer.prompt([
	{
		type: "input",
		name: "doWhat",
		message: "What info would you like? Type 'tweets', 'spotify', 'movie', or 'whatitsays'.",
	},

	{
		type: "input",
		name: "name",
		message: "Enter the twitter username, song's name, or movie name based on your previous choice. For whatitsays, type nothing and hit enter.",
	}

]).then(function(user) {
	var input = user.name;
	// User command / function execution
	switch(user.doWhat){
		case 'tweets':
			twitter(input);
		break;

		case 'spotify':
			spotify(input);
		break;

		case 'movie':
			movies(input);
		break;

		case 'whatitsays':
			whatever(input);
		break;

		// case null:
		// 	console.log("Type 'tweets', 'spotify', 'movie', or 'whatitsays'.");
		// break;

		// default:
		// 	console.log("Type 'tweets', 'spotify', 'movie', or 'whatitsays'.");
	}
})





function twitter(input){
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
	        console.log("To search type 'my-tweets', space, and then the 'username'.");
	        console.log("----------------------------------------------------------------");
      	}
    });
}

function spotify(input, inputRandomTxt){
	if (inputRandomTxt != null) {
		input = inputRandomTxt;
	}
	if (input == null) {
		input = "what's my age again";
	}
	// if the song length is longer than 1 word process.argv array gets concatenated from i = 4 onward
	if(process.argv.length > 4){
            for(var i = 4; i < process.argv.length; i++){
                input += "+" +process.argv[i];
            }
        }
	spotifyReq.search({ type: 'track', query: input }, function(err, response) {
    if ( err ) {
        return console.log('Error occurred: ' + err);
    }
 		console.log('--------------------------------------------------------------');
        console.log('Artist(s): ' + response.tracks.items[0].artists[0].name);
        console.log('Song Name: ' + response.tracks.items[0].name);
        console.log('Preview Link: ' + response.tracks.items[0].preview_url);
        console.log('Album: ' + response.tracks.items[0].album.name);
        console.log('--------------------------------------------------------------');
 
	});
}

function movies(input, inputRandomTxt){
    // If no movie name is given liri will provide the data from the movie Mr. Nobody
	if (input == null || input == undefined) {
			console.log("Come on Mr. Nobody");
			input = "Mr. Nobody";
	}
	// dynamic url 
	var queryUrl = 'http://www.omdbapi.com/?t=' + input +'&y=&plot=short&r=json&tomatoes=true';
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
    	// var evensHolder = [];
		// for (var i = 0; i < randomArray.length; ++i) { 
		//     if ((randomArray[i] % 2) === 0) {
		//         evensHolder.push(randomArray[i]);
		//     }
		//     if (evensHolder[i] == 'spotify-this-song') {
		//     	spotify(evensHolder[i]);
		//     }
		//     if (evensHolder[i] == 'movie-this') {
		//     	movies(evensHolder[i]);
		//     }
		// }
        // passes array data to appropriate function
        if (randomArray[0] == 'spotify-this-song') {
        	spotify(randomArray[1]);
        }
        if (randomArray[0] == 'movie-this') {
            movies(randomArray[1]);
        }
    })
}