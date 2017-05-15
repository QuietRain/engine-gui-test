"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StaticServer = require("static-server");
function run(projectPath) {
    var server = new StaticServer({
        rootPath: projectPath,
        name: 'my-http-server',
        port: 1337,
        cors: '*',
        followSymlink: true,
        templates: {
            index: 'index.html',
            notFound: '404.html' // optional, defaults to undefined 
        }
    });
    server.start(function () {
        console.log('Server listening to', server.port);
    });
    // }
    // else {
    //     console.log("no")
    //     var server = new StaticServer({
    //         rootPath: '.',            // required, the root of the server file tree 
    //         name: 'my-http-server',   // optional, will set "X-Powered-by" HTTP header 
    //         port: 1337,               // optional, defaults to a random port 
    //         cors: '*',                // optional, defaults to undefined 
    //         followSymlink: true,      // optional, defaults to a 404 error 
    //         templates: {
    //             index: 'index.html',      // optional, defaults to 'index.html' 
    //             notFound: '404.html'    // optional, defaults to undefined 
    //         }
    //     });
    //     server.start(function () {
    //         console.log('Server listening to', server.port);
    //     });
}
exports.run = run;
//# sourceMappingURL=run.js.map