'use strict';

/**
 * @function `gulp deploy:package`
 * @desc Copy build data into organized, predefined structure.
 */

var gulp = require('gulp');

var taskName = 'deploy:package',
	taskConfig = {
		srcTheme: './build/**/*.*',
		destTheme: './package/theme/',
		srcWidgets: './source/widgets/**/*.hbs',
		destWidgets: './package/widgets/',
		srcTiles: './build/templates/**/*.*',
		destTiles: './package/'
	};

gulp.task(taskName, function() {
	var merge = require('merge-stream'),
		tap = require('gulp-tap');

	var theme = gulp.src(taskConfig.srcTheme)
			.pipe(gulp.dest(taskConfig.destTheme)),

		widgets = gulp.src(taskConfig.srcWidgets)

			// Should go to some build step - here's just for POC
			.pipe(tap(function(file) {
				var content = file.contents.toString();

				content = content.replace(/modules\//g, 'widgets\/');

				file.contents = new Buffer(content);
			}))

			.pipe(gulp.dest(taskConfig.destWidgets)),

		tiles = gulp.src(taskConfig.srcTiles)
			.pipe(gulp.dest(taskConfig.destTiles));

	return merge(theme, widgets, tiles);
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig
};
