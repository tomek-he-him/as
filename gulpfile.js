/*jshint node: true, globalstrict: true */
"use strict";


// Imports
// -------------------------------------------------------------------------------------------------

var del = require("del");

var gulp = require("gulp");
var to5 = require("gulp-6to5");




// Tasks
// =================================================================================================


// `gulp`
// -------------------------------------------------------------------------------------------------

gulp.task("default", ["build"]);


// `gulp build`
// -------------------------------------------------------------------------------------------------
gulp.task("build", ["scripts"]);


// `gulp scripts`
// -------------------------------------------------------------------------------------------------

gulp.task("scripts", ["scripts:es6", "scripts:es5"]);

gulp.task("scripts:es6", function () {
    return gulp.src("source/**/*.js")
        .pipe(gulp.dest("dist"))
        ;
});

gulp.task("scripts:es5", function () {
    return gulp.src("source/**/*.js")
        .pipe(to5({modules: "6-to-library"}))
        .pipe(gulp.dest("dist.es5"))
        ;
});


// `gulp prepare-test`
// -------------------------------------------------------------------------------------------------

gulp.task("prepare-test", function () {
    return gulp.src("source/**/*.js")
        .pipe(to5({modules: "common"}))
        .pipe(gulp.dest("test.modules"))
        ;
});


// `gulp teardown-test`
// -------------------------------------------------------------------------------------------------

gulp.task("teardown-test", function (done) {
  del("test.modules", done);
});
