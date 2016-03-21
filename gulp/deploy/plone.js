'use strict';

/**
 * @function `gulp`
 * @desc Create static webserver with livereload functionality, serve build directory on port 9000, watch source files.
 */

var gulp = require('gulp');

var taskName = 'deploy:plone',
	taskConfig = {};

gulp.task(taskName, function(cb) {
	var helpers = require('require-dir')('../../helpers'),
		runSequence = require('run-sequence'),
		runTasks = [
				'build',
				'template:plone',
				'deploy:package',
				function(err) {
					if (err) {
						helpers.errors(err);
					}

					cb();
				}
			];

	runSequence.apply(this, runTasks);
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig
};
