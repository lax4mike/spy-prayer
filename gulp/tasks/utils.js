var gulp        = require("gulp"),
    plumber     = require("gulp-plumber"),
    notify      = require("gulp-notify"),
    del         = require("del"),
    fs          = require("fs"),
    path        = require("path"),
    color       = require("cli-color");


// variable to hold config
var config = null;

// return the config that was set with setConfig
// initialize if needed
module.exports.loadConfig = function loadConfig(){

    // initialize our config if it's not already, and load local.js if it exists
    // local.js file is for config that shouldn't be checked into source control (see .gitignore)
    // these settings live in config.local (eg. config.local.hostname)
    if (config === null){
        config = {};

        // load local.js config or initalize to empty object
        config.local = (fs.existsSync(__dirname + "/../local.js")) ? require("../local") : {};
    }

    return config;
};

// settings is an object, eg:
// {
//     root: "../app/",
//     dest: "../build_dev/",
//     env: "dev",
//     tasks: ["js", "css", "html", "images", "bower"],
//     watch: true
// }
module.exports.setConfig = function setConfig(settings){

    // make sure it's initialized
    config = this.loadConfig();

    // load this config into the config variable
    for(var key in settings){
        if (!settings.hasOwnProperty(key)) { continue; }
        config[key] = settings[key];
    }

    return config;

};



// drano: make plumber with error handler attached
module.exports.drano = function drano(){
    return plumber({
        errorHandler: function(err) {
            notify.onError({ title: "<%= error.plugin %>", message: "<%= error.message %>", sound: "Beep" })(err);
            this.emit("end");
        }
    });
};



// load tasks. given an array of tasks, require them
module.exports.loadTasks = function loadTasks(tasks) {
    tasks.forEach(function(name) {
        // console.log("loading task: ", name);
        require("./" + name);
    });
};



// will log the output with the first arg as yellow
// eg. logYellow("watching", "css:", files) >> [watching] css: ["some", "files"]
module.exports.logYellow = function logYellow(){

    var args = (Array.prototype.slice.call(arguments));
    var first = args.shift();

    if (args.length){

        var argString = args.map(function(arg){
            return (typeof arg  === "object") ? JSON.stringify(arg) : arg.toString(); 
        }).join(" ");

        console.log("[" + color.yellow(first) + "]", argString);
    }
};



// delete the destination directory
module.exports.clean = function clean(cb) {

    if (config.env !== "dev") {
        console.log("Warning!! we tried to clean " + config.dest + " using the '" + config.env + "' env");
        return;
    }

    this.logYellow("cleaning", config.dest);
    del([config.dest], {force: true}, cb);

};


