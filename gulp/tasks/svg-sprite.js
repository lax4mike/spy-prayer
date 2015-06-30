var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    svgmin         = require("gulp-svgmin"),
    svgstore       = require("gulp-svgstore"),
    replace        = require("gulp-replace"),
    rename         = require("gulp-rename"),
    gulpif         = require("gulp-if");

/** 
 * Usage: put svg's in svg.src directory.  eg. /img/svg-sprite/my-icon.svg
 *        They will be compiled into svg.filename. eg. /img/svg-sprite.svg
 *
 * In html: <svg><use xlink:href="/img/svg-sprite.svg#my-icon"></use></svg>
 *
 * In css: svg { fill: BlanchedAlmond; }
 */


// svg settings 
utils.setTaskConfig("svg", {
    default: {
        src   : config.root + "/img/svg-sprite/**/*.svg",
        dest  : config.dest + "/img",

        filename : "svg-sprite.svg",

        svgmin: false
    },

    prod: {
        svgmin: true
    }
});


// register the watch
utils.registerWatcher("svg-sprite", [
    config.root + "/img/svg-sprite/**/*.svg"
]);



// generate svg sprite
gulp.task("svg-sprite", function(){

    var svg = utils.loadTaskConfig("svg");

    return gulp.src(svg.src)
        .pipe(utils.drano())
        .pipe(gulpif(svg.svgmin, svgmin()))
        .pipe(svgstore({
            inlineSvg: false
        }))
        .pipe(rename(svg.filename))
        .pipe(gulp.dest(svg.dest));

});



