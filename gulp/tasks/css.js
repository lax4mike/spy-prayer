var gulp          = require("gulp"),
    utils         = require("./utils"),
    config        = utils.loadConfig(),
    sass          = require("gulp-sass"),
    autoprefixer  = require("gulp-autoprefixer"),
    pixrem        = require("gulp-pixrem"),
    rename        = require("gulp-rename"),
    header        = require("gulp-header"),
    concat        = require("gulp-concat"),
    spritesmith   = require("gulp.spritesmith"),
    sourcemaps    = require("gulp-sourcemaps");

// css settings
utils.setTaskConfig("styles", {
    default: {

        src: config.root + "/scss/**/*.scss",

        dest: config.dest + "/css/",

        sprite: {
            src: config.root + "/img/png-sprite/**/*.png",
            imgDest: config.dest + "/css/",
            imgName: "png-sprite.png",
            sassName: "_png-sprite-generated.scss",
            sassDest: config.root + "/scss/"
        },

        filename: "index.css",

        sass: {
            outputStyle: "nested"
            // includePaths: require("node-neat").includePaths
        },

        autoprefixer: {
            browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "ie >= 9"]
        }
    },

    prod: {
        sass: {
            outputStyle: "compressed"
        }
    }
});

// register the watch
utils.registerWatcher("css", [
    config.root + "/scss/**/*.scss",
    config.root + "/img/png-sprite/**/*.png"
]);


/**
 * png-sprite task 
 *   generate png-sprite image and sass file
 */
gulp.task("png", function(){

    var styles = utils.loadTaskConfig("styles");

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
        .pipe(gulp.dest(styles.sprite.sassDest));
});

/* css task, wait for png task to finish first, so the png sass file is available and up to date */
gulp.task("css", ["png"], function(next) {

    var styles = utils.loadTaskConfig("styles");
    
    var gulpCss = gulp.src(styles.src)
        .pipe(utils.drano())
        .pipe(sourcemaps.init())
        .pipe(sass(styles.sass))
        .pipe(autoprefixer(styles.autoprefixer))
        .pipe(pixrem())
        .pipe(concat(styles.filename, {newLine: ""}))
        .pipe(rename({
            suffix: "-generated"
        }));

    // only add the header text if this css isn't compressed
    if (styles.sass && styles.sass.outputStyle !== "compressed"){
        gulpCss.pipe(header("/* This file is generated.  DO NOT EDIT. */ \n"));
    }
        
    // write out css file
    return gulpCss
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(styles.dest));
});

