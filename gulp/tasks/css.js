var gulp          = require("gulp"),
    utils         = require("./utils"),
    config        = utils.loadConfig(),
    sass          = require("gulp-sass"),
    autoprefixer  = require("gulp-autoprefixer"),
    pixrem        = require("gulp-pixrem"),
    rename        = require("gulp-rename"),
    header        = require("gulp-header"),
    concat        = require("gulp-concat");



// dev/default settings
var css = {
    src: config.root + "/scss/**/*.scss",
    watch: config.root + "/scss/**/*.scss",
    dest: config.dest + "/css/",

    filename: "index.css",

    sass: {
        outputStyle: "nested"
        // includePaths: require("node-neat").includePaths
    },

    autoprefixer: {
        browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "ie >= 9"]
    }
};

// production settings
if (config.env === "prod"){

    // compress the sass output on production
    css.sass.outputStyle = "compressed";

}



/* css task */
gulp.task("css", function() {

    var gulpCss = gulp.src(css.src)
        .pipe(utils.drano())
        .pipe(sass(css.sass))
        .pipe(autoprefixer(css.autoprefixer))
        .pipe(pixrem())
        .pipe(concat(css.filename))
        .pipe(rename({
            suffix: "-generated"
        }));

    // only add the header text if this css isn't compressed
    if (css.sass && css.sass.outputStyle !== "compressed"){
        gulpCss.pipe(header("/* This file is generated.  DO NOT EDIT. */ \n"));
    }
        
    return gulpCss.pipe(gulp.dest(css.dest));
});


// watch css
if (config.watch){
    utils.logYellow("watching", "css:", css.watch);
    gulp.watch(css.watch, ["css"]);
}

