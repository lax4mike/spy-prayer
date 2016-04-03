/**
 *  Usage:
 *      Once per computer: 
 *         $ npm install -g gulp
 *
 *      Once per project, in gulp folder: 
 *         $ npm install
 *
 *
 *      Running clumped tasks (defined in this file) -- 
 *      see tasks/utils.js config
 *         $ gulp dev
 *
 *      Running single task (task defined in /tasks.  eg. /tasks/css.js)
 *         $ gulp css            // will use the default config 
 *         $ gulp css --env prod // will use the prod config
 *
 *      For details on setConfig, see "user supplied keys" in /tasks/utils.js
**/

// Include gulp and plugins
var gulp        = require("gulp"),
    utils       = require("./tasks/utils"),
    del         = require("del"),
    path        = require("path"),
    config      = utils.loadConfig(); // initialize the config


// set some defaults
utils.setConfig({
    root  : path.resolve("../app"),
    dest  : path.resolve("../public"),
    env   : ""
});


// load the tasks
utils.loadTasks(["js", "css", "html", "bower", "svg-sprite", "fonts"]);

/**
 * dev task. builds for dev and creates server
 */
gulp.task("dev", ["clean"], function(){

    // set the dev config (cache in utils.js)
    utils.setConfig({
        env   : "dev",
        watch : true
    });

    // build with this config
    utils.build();  

});

/**
 * prod task.  builds for production.
 */
gulp.task("prod", ["clean"], function(){  

    // set the prod config (cache in utils.js)
    utils.setConfig({
        env   : "prod",
        watch : false
    });

    // build with this config
    utils.build(); 

});


/**
 *  server task.  builds for production and creates server
 */
gulp.task("server", ["clean"], function(){

    // set the prod config (cache in utils.js)
    utils.setConfig({
        env   : "prod",
        watch : true
    });

    // build with this config
    utils.build(); 
});


// delete the dest directory
gulp.task("clean", function(cb){
    del([config.dest], {force: true}, function (err, paths) {
        if (paths && paths.length) { 
            utils.logYellow("deleted folders:", paths.join("\n")); 
        }
        cb(); 
    }); 
});



// Default Task (run when you run "gulp"). dev envirnoment
gulp.task("default", [config.local.defaultTask || "dev"]);

