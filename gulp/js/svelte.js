'use strict';

/**
 * @function `gulp js:svelte`
 * @desc Create svelte bundles
 */

var gulp = require('gulp');

var taskName = 'js:svelte',
  taskConfig = {
    src: [
      './source/assets/svelte/public/build/bundle.js',
      './source/assets/svelte/public/build/bundle.css',
      './source/assets/svelte/public/global.css',
    ],
    dest: './build/assets/svelte/',
  };

gulp.task(taskName, function() {
  var tap = require('gulp-tap');

  return gulp
    .src(taskConfig.src, {
      base: './source/',
      read: false,
    })
    .pipe(
      tap(function(file) {
        var data = require(file.path);

        file.contents = new Buffer(JSON.stringify(data));
      })
    )
    .pipe(gulp.dest(taskConfig.dest));
});

module.exports = {
  taskName: taskName,
  taskConfig: taskConfig,
};
