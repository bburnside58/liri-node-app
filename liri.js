
var argument = process.argv[2];



// if (argument = null) {
// 	console.log("Try again")
// }
if (argument == "mytweets") {

}

if (argument == "spotifythissong") {

	console.log("yo momma house")
}

if (argument == "moviethis") {
	movies();
}

if (argument == "dowhatitsays") {

} 
// if (argument == "") {} {
// 	console.log("Choose 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.")
// }

function movies(){
	var request = require('request');

	var movieName = process.argv[3];
	// Then run a request to the OMDB API with the movie specified 
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';


	request(queryUrl, function(err, response, body){
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
		console.log("Rotten Tomatoes url: " + body.tomatoURL);
		console.log("Omdb api url: " + queryUrl);
		// console.log(body);
	})



	// This line is just to help us debug against the actual URL.  
	
}



