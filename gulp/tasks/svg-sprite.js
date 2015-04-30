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


// dev/default settings 
var svg = {
    src   : config.root + "/img/svg-sprite/**/*.svg",
    watch : config.root + "/img/svg-sprite/**/*.svg",
    dest  : config.dest + "/img",

    filename : "svg-sprite.svg",

    svgmin: false
};

// production settings
if (config.env === "prod"){
    svg.svgmin = true;
}



// generate svg sprite
gulp.task("svg-sprite", function(){

    return gulp.src(svg.src)
        .pipe(utils.drano())
        .pipe(gulpif(svg.svgmin, svgmin()))
        .pipe(svgstore({
            inlineSvg: false
        }))
    
        // HACK * https://github.com/FWeinb/grunt-svgstore/issues/77
        // gulp-replace to include xmlns:xlink="http://www.w3.org/1999/xlink
        .pipe(replace(/xmlns/, 'xmlns:xlink="http://www.w3.org/1999/xlink" xmlns'))
    
        .pipe(rename(svg.filename))
        .pipe(gulp.dest(svg.dest));

});


// watch svg
if (config.watch){
    utils.logYellow("watching", "svg:", svg.watch);
    gulp.watch(svg.watch, ["svg-sprite"]);
}

