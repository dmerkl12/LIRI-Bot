// Require .env file
require("dotenv").config();
// Linking key page
const keys = require("./keys.js");
// 

const Spotify = require("node-spotify-api")

const spotify = new Spotify(keys.spotify);

const axios = require("axios");

const moment = require("moment");

const fs = require("fs");

var getEvents = function (artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      // handle success
    //   console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
          console.log("Name of the venue: " + response.data[i].venue.name)
          console.log("Venue location: " + response.data[i].venue.region + ", " + response.data[i].venue.city)
          console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
          console.log("-------")
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

var getSongs = function () {

}

var getMovies = function () {

}

var doWhatItSays = function () {

}

var pick = function (response, userChoice) {
    switch (response) {
        case "concert-this":
            getEvents(userChoice);
            break;
        case "spotify-this-song":
            getSongs(userChoice);
            break;
        case "movie-this":
            getMovies(userChoice);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI doesn't recognize command")
    }
}
const runCommand = function(arg1, arg2) {
    pick(arg1, arg2)
}
runCommand(process.argv[2],process.argv.slice(3).join(" "))