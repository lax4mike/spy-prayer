var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig();


// dev/default settings
var html = {
    src: [
        config.root + "/html/**/*.html",
        config.root + "/html/**/*.htm",
        config.root + "/index.html",
        config.root + "/favicon.ico",
        config.root + "/img/**/*.png"
    ],
    watch: [
        config.root + "/html/**/*.html",
        config.root + "/html/**/*.htm",
        config.root + "/index.html",
        config.root + "/favicon.ico",
        config.root + "/img/**/*.png"
    ],
    dest: config.dest
};

// production settings
if (config.env === "prod"){
    // defaults
}



/* copy html files */
gulp.task("html", function(next) {

    return gulp.src(html.src, { base: config.root })
            .pipe(utils.drano())
            .pipe(gulp.dest(html.dest));

});


// watch html
if (config.watch){
    utils.logYellow("watching", "html:", html.watch);
    gulp.watch(html.watch, ["html"]);
}
