
// Load the fs package to read and write
var fs = require('fs');
//request node package to...request stuff
var request = require('request');
// grabs the user's command
var argument = process.argv[2];
// input data
var input = process.argv[3];





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

}

function spotify(){

}

function movies(inputRandomTxt){
	// console.log(input) for testing purposes
	var movieName = input;
	var movieName2 = process.argv[4];
	// If no movie name is given liri will provide the data from the movie Mr. Nobody
	if (movieName == null) {
			movieName = "Mr. Nobody";
		}
	// Then run a request to the OMDb API with the movie specified 
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';
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
        // passes array data to appropiate function
        if (randomArray[0] == 'movie-this') {
            movies(randomArray[1]);
        }
    })
}














