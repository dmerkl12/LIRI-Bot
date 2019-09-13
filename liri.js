require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api")
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

const getEvents = function (artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            //   console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                console.log("Name of the venue: " + response.data[i].venue.name)
                console.log("Venue location: " + response.data[i].venue.region + ", " + response.data[i].venue.city)
                console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"))
                console.log("-------")
            }
        })
        .catch(function (error) {
            console.log(error.response);
        });
};

const getSongs = function (songName) {
    if (!songName) {
        songName = "The Sign Ace of Base"
        console.log(songName)
    };
    spotify.search({ type: 'track', query: songName, limit: 1 }).then(function (data) {
        let spotifyArr = data.tracks.items;
        for (i = 0; i < spotifyArr.length; i++) {
            console.log("-------")
            console.log("Artists: " + data.tracks.items[i].artists[0].name)
            console.log("Name: " + data.tracks.items[i].name)
            console.log("URL: " + data.tracks.items[i].external_urls.spotify)
            console.log("Album: " + data.tracks.items[i].album.name)
            console.log("-------")
        };
    })
        .catch(function (err) {
            console.log('Error occurred: ' + err);
        })
};


const getMovies = function (movieName) {
    if (!movieName) {
        movieName = "Mr. Nobody."
        console.log(movieName)
    };
    axios.get("http://www.omdbapi.com/?apikey=trilogy&limit=1&t=" + movieName)
        .then(function (response) {
            console.log("Title: " + response.data.Title)
            console.log("Year: " + response.data.Year)
            console.log("IMBD Rating: " + response.data.imdbRating)
            console.log("RottenTomatoes Rating: " + response.data.Ratings[1].Value)
            console.log("Country: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Actors: " + response.data.Actors)
            console.log("Plot: " + response.data.Plot)
        })
        .catch(function (error) {
            console.log(error.response);
        })
};

const doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        let dataArr = data.split(",");
        runCommand(dataArr[0], dataArr[1])
    })
}

let pick = function (response, userChoice) {

    let savePick = "\n" + response + "," + userChoice + ",";
    fs.appendFile("log.txt", savePick, function(err) {
        if (err) {
            console.log(err);
        }

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
    )
};
const runCommand = function (arg1, arg2) {
    pick(arg1, arg2)
}
runCommand(process.argv[2], process.argv.slice(3).join(" "))
