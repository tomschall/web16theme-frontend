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
			'./source/assets/svelte/public/build/bundle.js.map',
			'./source/assets/svelte/public/build/bundle.css',
			'./source/assets/svelte/public/global.css',
		],
		watch: [
			'./source/assets/svelte/**/*.js',
			'!./source/assets/svelte/node_modules',
		],
		dest: './build/assets/js/',
	};

gulp.task(taskName, function() {
	return gulp.src(taskConfig.src).pipe(gulp.dest(taskConfig.dest));
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig,
};
