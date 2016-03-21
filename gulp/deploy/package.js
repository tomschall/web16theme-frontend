'use strict';

/**
 * @function `gulp deploy:package`
 * @desc Copy specific media files to build directory.
 */

var gulp = require('gulp');
var merge = require('merge-stream');

var taskName = 'deploy:package',
	taskConfig = {
		themeSrc: './build/**/*.*',
		themeDest: './package/theme/',
		widgetsSrc: './source/modules/**/*.hbs',
		widgetsDest: './package/widgets/',
		tilesSrc: './build/templates/**/*.*',
		tilesDest: './package/'
	};

gulp.task(taskName, function() {
	var theme = gulp.src(taskConfig.themeSrc)
			.pipe(gulp.dest(taskConfig.themeDest)),

		widgets = gulp.src(taskConfig.widgetsSrc)
			.pipe(gulp.dest(taskConfig.widgetsDest)),

		tiles = gulp.src(taskConfig.tilesSrc)
			.pipe(gulp.dest(taskConfig.tilesDest));

	return merge(theme, widgets, tiles);
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig
};
