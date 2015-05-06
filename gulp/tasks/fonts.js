var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig();


// dev/default settings
var fonts = {
    src: config.root + "/scss/fonts/**/*",
    watch: config.root + "/scss/fonts/**/*",
    dest: config.dest + "/css/fonts/"
};

// production settings
if (config.env === "prod"){
    // defaults
}



/* copy font files */
gulp.task("fonts", function(next) {

    return gulp.src(fonts.src)
            .pipe(utils.drano())
            .pipe(gulp.dest(fonts.dest));

});


// watch fonts
if (config.watch){
    utils.logYellow("watching", "fonts:", fonts.watch);
    gulp.watch(fonts.watch, ["fonts"]);
}

