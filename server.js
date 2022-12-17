const fs = require('fs');
const http = require('http');

const express = require('express')
const prepareStream = require('./helpers/prepareStream');

const app = express()
const port = 443

const server = http.createServer(app);
server.listen(port);

app.get("/video/got/:season/:episode", function (req, res) {
    try{
        let range = req.headers.range;

        if (!range) {
        range = 'bytes-';
        }

        const seasonNumber = req.params.season;
        const episodeNumber = req.params.episode;

        if(!seasonNumber || !episodeNumber) throw new Error('Episode or season does not exist');

        const videoPath = `D:/VIDEOS/GOT/${seasonNumber}/mp4/got_${seasonNumber}_e${episodeNumber}.mp4`;

        const prepareStreamObject = prepareStream(range, videoPath);

        const start = prepareStreamObject.start;
        const end = prepareStreamObject.end;

        res.writeHead(206, prepareStreamObject.headers);
    
        const videoStream = fs.createReadStream(videoPath, { start, end });

        videoStream.pipe(res);
    }catch(error) {
        res.send(`Error: ${error}`)
    }
});