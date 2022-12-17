const fs = require('fs');

module.exports = (range, videoPath) => {
    const videoSize = fs.statSync(videoPath).size;
    
    const chunkSize = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, videoSize - 1);
    
    const contentLength = end - start + 1;
    const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
    };

    return { headers, start, end };
}