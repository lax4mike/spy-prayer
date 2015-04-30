var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    concat         = require("gulp-concat"),
    filter         = require("gulp-filter"),
    gulpif         = require("gulp-if"),
    uglify         = require("gulp-uglify"),
    minifyCSS      = require("gulp-minify-css"),
    sourcemaps     = require("gulp-sourcemaps"),
    mainBowerFiles = require("main-bower-files");


// dev/default settings
var bower = {
    root: config.root + "/vendor/",

    js: {
        filename: "vendor.js",
        dest: config.dest + "/js"
    },
    
    css: {
        filename: "vendor.css",
        dest: config.dest + "/css",
    },

    // to skip, set value to false or omit entirely
    // otherwise, pass options object (can be empty {})
    uglify: false,

    // to skip, set value to false or omit entirely
    // otherwise, pass options object (can be empty {})
    minifyCSS: false,

    sourcemaps: true
};

// production settings
if (config.env === "prod"){
    bower.uglify = {};
    bower.minifyCSS = {};
    bower.sourcemaps = false;
}



/* bundle up bower libraries */
// http://engineroom.teamwork.com/hassle-free-third-party-dependencies/
gulp.task("bower", function(next){

    if (!bower || !bower.root){
        utils.logYellow("bower", "not configured");
        next(); return;
    }

    // https://github.com/ck86/main-bower-files
    // mainBowerFiles returns array of "main" files from bower.json
    var bowerfiles = mainBowerFiles({
        checkExistence: true,
        paths: bower.root,
        debugging: false
    });

    if (bowerfiles.length === 0){
        next(); return;
    }

    // log the bower files to the gulp output
    utils.logYellow("bower files", "\n\t" + bowerfiles.join("\n\t"));

    // make js
    gulp.src(bowerfiles)
        .pipe(utils.drano())
        .pipe(filterByExtension("js"))
        .pipe(gulpif(bower.sourcemaps,  sourcemaps.init() ))  // start sourcemaps

        // putting a ; between each file to avoid problems when a library doesn't end in ;        
        .pipe(concat(bower.js.filename, {newLine: ";"}))

        .pipe(gulpif((bower.uglify), uglify(bower.uglify)))
        .pipe(gulpif(bower.sourcemaps, sourcemaps.write() )) // end sourcemaps
        .pipe(gulp.dest(bower.js.dest));

    // make css
    gulp.src(bowerfiles)
        .pipe(utils.drano())
        .pipe(filterByExtension("css"))
        .pipe(concat(bower.css.filename))
        .pipe(gulpif((bower.minifyCSS), minifyCSS(bower.minifyCSS)))
        .pipe(gulp.dest(bower.css.dest));


    next();

});

// watch bower.json to regenerate bundle
if (config.watch){
    var bowerJson = bower.root + "bower.json";
    utils.logYellow("watching", "bower:", bowerJson);
    gulp.watch(bowerJson, ["bower"]);
}



function filterByExtension(extension){  
    return filter(function(file){
        return file.path.match(new RegExp("." + extension + "$"));
    });
}
