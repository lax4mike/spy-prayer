var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    gulpif         = require("gulp-if"),
    uglify         = require("gulp-uglify"),
    sourcemaps     = require("gulp-sourcemaps"),
    browserify     = require("browserify"),
    through2       = require("through2");

var fs = require("fs");

// dev/default settings 
utils.setTaskConfig("js", {

    default: {

        src: config.root + "/js/index.js",
        dest: config.dest + "/js",

        // js uglify options , to skip, set value to false or omit entirely
        // otherwise, pass options object (can be empty {})
        uglify: false,

        // browserify options
        browserify: {}
    },

    prod: {

        // uglify javascript for production
        uglify: {}
    }
});


// register the watch
utils.registerWatcher("js", [
    config.root + "/js/**/*.js",
    config.root + "/js/**/*.jsx"
]);



/* compile application javascript */
gulp.task("js", function(){

    var js = utils.loadTaskConfig("js");

     // for browserify usage, see https://medium.com/@sogko/gulp-browserify-the-gulp-y-way-bb359b3f9623
    // ^^ we can't use vinyl-transform anymore because it breaks when trying to use b.transform()  // https://github.com/sogko/gulp-recipes/tree/master/browserify-vanilla
    var browserifyIt = through2.obj(function (file, enc, callback){

        // https://github.com/substack/node-browserify/issues/1044#issuecomment-72384131
        var b = browserify(js.browserify || {}) // pass options
            .add(file.path) // this file
            .transform("babelify") 
            // .external("react")

        // externalize all bower components if defined
        try {
            var bowerComponents = config.taskConfig.bower.default.root + "/bower_components";
            var packages = fs.readdirSync(bowerComponents);

            packages.forEach(function(package){
                b.external(package);
            });
        }
        catch(e) { console.log("ERRR"); /* do nothing */ }


        b.bundle(function(err, res){
            if (err){
                callback(err, null); // emit error so drano can do it's thang
            }
            else {
                file.contents = res; // assumes file.contents is a Buffer
                callback(null, file); // pass file along
            }
        });

    });

    return gulp.src(js.src)
        .pipe(utils.drano())
        .pipe(sourcemaps.init())
        .pipe(browserifyIt)
        .pipe(gulpif((js.uglify), uglify(js.uglify)))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(js.dest));

});


