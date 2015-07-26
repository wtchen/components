// Very simple file server for displaying static web content
/* Copyright (c) 2014 William Chen

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

// non-exhaustive dictionary of file extensions and HTTP content-types
var contentTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".mp3": "audio/mpeg", // not supported on FF, but works on Chrome and others
    ".mpeg": "video/mpeg",
    ".mpg": "video/mpeg"
};

http.createServer(function(req, res) {
    var currPath = path.join(process.cwd(), url.parse(req.url).pathname);
    fs.exists(currPath, function(fileExists) {
        if (fileExists) {
            var fullPath = currPath;
            if (fs.lstatSync(currPath).isDirectory()) {
                fullPath += '/index.html';
            }
            fs.readFile(fullPath, "binary", function(err, file) {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/html"});
                    res.write("<h1>500 Internal Server Error</h1>");
                    res.end();
                    return;
                }
                var extension = path.extname(fullPath);
                var contentType = "text/plain";
                if (contentTypes[extension]) {
                    contentType = contentTypes[extension];
                }
                res.writeHead(200, {"Content-Type": contentType});
                res.write(file, "binary");
                res.end();
            });
        }
        else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write("<h1>404 Not Found</h1><p>Page does not exist</p>");
            res.end();
        }
    });
}).listen(parseInt(3000, 10));

console.log("File server running at http://localhost:3000/");