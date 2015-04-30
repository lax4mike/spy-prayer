var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    gulpif         = require("gulp-if"),
    uglify         = require("gulp-uglify"),
    browserify     = require("browserify"),
    through2       = require("through2");

// maybe we"ll do this someday if we can integrate it with bower
// http://lincolnloop.com/blog/speedy-browserifying-multiple-bundles/

// dev/default settings 
var js = {
    src: config.root + "/js/index.js",
    watch: [
        config.root + "/js/**/*.js",
        config.root + "/js/**/*.jsx",
    ],
    dest: config.dest + "/js",

    // js uglify options , to skip, set value to false or omit entirely
    // otherwise, pass options object (can be empty {})
    uglify: false,

    // include source maps
    browserify: {
        debug: true
    }
};

// production settings
if (config.env === "prod"){

    // uglify javascript for production
    js.uglify = {};

    // do not include sourcemaps
    js.browserify = {
        debug: false
    };
}



/* compile application javascript */
gulp.task("js", function(){

    // for browserify usage, see https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
    // ^^ we can't use vinyl-transform anymore because it breaks when trying to use b.transform()  // https://github.com/sogko/gulp-recipes/tree/master/browserify-vanilla
    var browserifyIt = through2.obj(function (file, enc, callback){

        // https://github.com/substack/node-browserify/issues/1044#issuecomment-72384131
        browserify(js.browserify || {}) // pass options
            .add(file.path) // this file
            .transform("babelify")
            .bundle(function(err, res){
                if (err){ callback(err, null); } // emit error so drano can do it's thang
                if (res){
                    file.contents = res; // assumes file.contents is a Buffer
                    callback(null, file); // pass file along
                }
            });
    });


    return gulp.src(js.src)
        .pipe(utils.drano())
        .pipe(browserifyIt)
        .pipe(gulpif((js.uglify), uglify(js.uglify)))
        .pipe(gulp.dest(js.dest));
});

// watch js
if (config.watch){
    utils.logYellow("watching", "js:", js.watch);
    gulp.watch(js.watch, ["js"]);
}

