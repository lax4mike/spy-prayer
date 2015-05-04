/**
 *  Usage:
 *      Once per computer: 
 *              npm install -g gulp
 *
 *      Once per project, in gulp folder: 
 *              npm install
 *
**/

// Include gulp and plugins
var gulp           = require("gulp"),
    utils          = require("./tasks/utils"),
    notify         = require("gulp-notify"),
    runSequence    = require("run-sequence"),
    del            = require("del");

var path = require("path");

// initialize the config
var config = utils.loadConfig();


// dev task
gulp.task("dev", function(){

    // set the dev config (cache in utils.js)
    config = utils.setConfig({
        root  : path.resolve("../app"),
        dest  : path.resolve("../public"),
        env   : "dev",
        tasks : ["js", "css", "html", "bower", "svg-sprite"],
        watch : true
    });


    // clean first, then build with this config
    del([config.dest], {force: true}, function(){
        build(); 
    });

});

// prod task
gulp.task("prod", function(){  

    // set the prod config (cache in utils.js)
    config = utils.setConfig({
        root  : path.resolve("../app"),
        dest  : path.resolve("../public"),
        env   : "prod",
        tasks : ["js", "css", "html", "bower", "svg-sprite"],
        watch : false
    });

    // clean first, then build with this config
    del([config.dest], {force: true}, function(){
        build(); 
    });

});



// load and start tasks
function build() {
    
    gulp.src('').pipe(notify("Building for '" + config.env + "' environment")); // gulp.src('') is a hack

    // load each task file
    utils.loadTasks(config.tasks);

    // browserSync needs special treatment because it needs to be started AFTER the 
    // build directory has been created and filled (for livereload to work)
    if (config.watch) {
        utils.loadTasks(["browserSync"]);
        runSequence(config.tasks, "browserSync");
    }
    else {
        gulp.start(config.tasks);
    }
 
}

// Default Task (run when you run 'gulp'). dev envirnoment
gulp.task("default", [config.local.defaultTask || "dev"]);

