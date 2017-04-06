'use strict';

/**
 * @function `gulp deploy`
 * @desc Build an assets package - containg whole build result together with additional enrinoment specific files organized in predefined directory stucture.
 */

var gulp = require('gulp');

var taskName = 'deploy',
	taskConfig = {};

gulp.task(taskName, function(cb) {
	var helpers = require('require-dir')('../../helpers'),
		runSequence = require('run-sequence'),
		runTasks = [
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
