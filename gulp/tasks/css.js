var gulp          = require("gulp"),
    utils         = require("./utils"),
    config        = utils.loadConfig(),
    sass          = require("gulp-sass"),
    autoprefixer  = require("gulp-autoprefixer"),
    pixrem        = require("gulp-pixrem"),
    header        = require("gulp-header"),
    concat        = require("gulp-concat"),
    rename        = require("gulp-rename"),
    spritesmith   = require("gulp.spritesmith");



// dev/default settings
var styles = {
    src: config.root + "/scss/**/*.scss",
    watch: [
        config.root + "/scss/**/*.scss",
        config.root + "/img/png-sprite/**/*.png"
    ],
    dest: config.dest + "/css/",

    filename: "index-generated.css",

    sprite: {
        src: config.root + "/img/png-sprite/**/*.png",
        imgDest: config.dest + "/css/",
        imgName: "png-sprite.png",
        sassName: "_png-sprite-generated.scss",
        sassDest: config.root + "/scss/"
    },

    sass: {
        outputStyle: "nested",
        errLogToConsole: true
    },

    autoprefixer: {
        browsers: ["> 1%", "last 2 versions", "Firefox ESR", "ie >= 9"]
    }
};



// production settings
if (config.env === "prod"){

    // compress the sass output on production
    styles.sass.outputStyle = "compressed";

}

/**
 * png-sprite task 
 *   generate png-sprite image and sass file
 */
gulp.task("png", function(){

    // https://www.npmjs.com/package/gulp.spritesmith
    var spriteStreams = gulp.src(styles.sprite.src)
        .pipe(spritesmith({
            imgName: styles.sprite.imgName,
            cssName: "not-used-but-required.css",
            cssOpts: {
                cssSelector: function (item) {
                    return "." + item.name;
                }
            }
        }));

    // write png-sprite.png
    spriteStreams.img
        .pipe(gulp.dest(styles.sprite.imgDest));

    // write _png-sprite-generated.scss
    return spriteStreams.css
        .pipe(rename(styles.sprite.sassName))
        .pipe(gulp.dest(styles.sprite.sassDest))
});

/* css task, wait for png task to finish first, so the png sass file is available and up to date */
gulp.task("css", ["png"], function(next) {

    // compile sass
    var gulpCss = gulp.src(styles.src)
        .pipe(utils.drano())
        .pipe(sass(styles.sass))
        .pipe(autoprefixer(styles.autoprefixer))
        .pipe(pixrem());

    // only add the header text if this css isn't compressed
    if (styles.sass && styles.sass.outputStyle !== "compressed"){
        gulpCss.pipe(header("/* This file is generated.  DO NOT EDIT. */ \n"));
    }

    // write out css file
    return gulpCss
        .pipe(concat(styles.filename))
        .pipe(gulp.dest(styles.dest));

});


// watch css
if (config.watch){
    utils.logYellow("watching", "css:", styles.watch);
    gulp.watch(styles.watch, ["css"]);
}

