require("dotenv").config();
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var input1 = process.argv[2];
var input2 = process.argv[3];

function myTweets(){
  var params = {screen_name: 'Ron Burgundy'};
  client.get('statuses/user_timeline', params, function(error, tweets, response)
  {
   if(!error){
     for (var i = 0; i < tweets.length; i++){
        console.log(tweets[i].created_at);
        console.log(' ');
        console.log(tweets[i].text);
     }
    }
  });
}

function spotfiySearch(songName) {
    if (!songName) {
      songName = "the sign artist:ace of base";
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      else {
        var firstItem = data.tracks.items[0];
        if (firstItem) {
          console.log("\nArtist: " + firstItem.artists[0].name);
          console.log("\nSong: " + firstItem.name);
          console.log("\nPreview URL: " + firstItem.preview_url);
          console.log("\nAlbum: " + firstItem.album.name);
        }
      }
    });
  };
  
  
function movieSearch(movieName){
    if (!movieName) {
        movieName = "mr.nobody";
      };
      var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
      request(queryURL, function (error, response, body) {
        if (error) {
          return console.log("error: ", error); 
        }
        
        else if (!error && response.statusCode === 200) {
            console.log("\nTitle: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
      });
}

function openFile(){
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
          return console.log(error);
        }
        var textArray = data.split(",");
        getInput(textArray[0], textArray[1]);
      });
}

var getInput = function(command1, command2){
  switch(command1){
      case 'my-tweets':
        myTweets()
        break;

      case 'spotify-this-song':
         spotfiySearch(command2);
         break;

      case 'movie-this':
        movieSearch(command2);
        break;
      
      case 'do-what-it-says':
        openFile();
        break;
    default:
    console.log("LIRI doesn't recognize this command");
  }
}

getInput(input1, input2);