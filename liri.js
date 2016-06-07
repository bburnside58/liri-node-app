
// Load the fs package to read and write
var fs = require('fs');
// grabs the user's command
var argument = process.argv[2];


var request = require('request');


switch(argument){
	case 'mytweets':
		twitter();
	break;

	case 'moviethis':
		movies();
	break;

	case 'dowhatitsays':
		console.log("working on this part");
	break;

	case null:
		console.log("Choose 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.");
	break;

	default:
		console.log("Choose 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.")
}

function twitter(){

}

function spotify(){

}

function movies(){
	

	var movieName = process.argv[3];
	// Then run a request to the OMDB API with the movie specified 
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';


	request(queryUrl, function(err, response, body){
		if (err) {
			return console.log(err);
		}
		body = JSON.parse(body);
		console.log(body.Title);
		console.log(body.Year);
		console.log(body.imdbRating);
		console.log(body.Country);
		console.log(body.Language);
		console.log(body.Plot);
		console.log(body.Actors);
		console.log(body.tomatoRating);
		console.log("-----------------------------------------------------------------------");
		// This line is just to help us debug against the actual URL.
		console.log("Rotten Tomatoes url: " + body.tomatoURL);
		console.log("Omdb api url: " + queryUrl);
		// console.log(body);
	})
}
















