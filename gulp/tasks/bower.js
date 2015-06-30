var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    concat         = require("gulp-concat"),
    filter         = require("gulp-filter"),
    gulpif         = require("gulp-if"),
    uglify         = require("gulp-uglify"),
    minifyCSS      = require("gulp-minify-css"),
    sourcemaps     = require("gulp-sourcemaps"),
    through2       = require("through2"),
    browserify     = require("browserify"),
    source         = require("vinyl-source-stream"), 
    gStreamify     = require("gulp-streamify"), // to fix uglify https://github.com/nfroidure/gulp-streamify
    mainBowerFiles = require("main-bower-files");

var fs = require("fs");

var bowerRoot = config.root + "/vendor"

// bower settings
utils.setTaskConfig("bower", {
    
    default: {
        root: bowerRoot,

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

        browserify: {
            debug: true // include sourcemaps
        }
    },

    prod: {
        uglify: {},
        minifyCSS: {},
        browserify: {
            debug: false // include sourcemaps
        }
    }
});

// watch bower.json to regenerate bundle
utils.registerWatcher("bower", [
    bowerRoot + "/bower.json"
]);


/* bundle up bower libraries */
// http://engineroom.teamwork.com/hassle-free-third-party-dependencies/
gulp.task("bower", function(next){

    var bower = utils.loadTaskConfig("bower");

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


    // create browserify bundle with the bower packages exposed
    var browserifiedFiles = (function(){

        var b = browserify(bower.browserify || {}) // pass options

        bowerfiles
            .filter(function(file){
                return file.match(new RegExp(".js$"));
            })
            .forEach(function(filepath){
                // use .require instead of .add so it'a available from other bundles
                b.require(filepath, { expose: getBowerPackageName(filepath) })  
            });

        return b.bundle();
    }());

    // make js
    browserifiedFiles
        .pipe(source(bower.js.filename)) // convert node stream to gulp stream
        .pipe(utils.drano())
        .pipe(gulpif((bower.uglify), gStreamify(uglify(bower.uglify))))
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


function filterByExtension(extension){  
    return filter(function(file){
        return file.path.match(new RegExp("." + extension + "$"));
    });
}

// given /app/vendor/bower_components/classnames/index.js returns "classnames"
function getBowerPackageName(filepath) {
    return filepath.replace(/.*?\/bower_components\/(.*?)\/.*/, "$1");
}


