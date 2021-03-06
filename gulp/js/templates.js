'use strict';

/**
 * @function `gulp js:templates`
 * @desc Precompile handlebars templates.
 */

var gulp = require('gulp');

var taskName = 'js:templates',
	taskConfig = {
		src: [
			'./source/widgets/**/_*.js.hbs',
			'./source/demo/widgets/**/_*.js.hbs'
		],
		dest: './source/assets/.tmp/',
		watch: [
			'source/widgets/**/_*.js.hbs',
			'source/demo/widgets/**/_*.js.hbs'
		]
	};

gulp.task(taskName, function(cb) {
	var helpers = require('require-dir')('../../helpers'),
		plumber = require('gulp-plumber'),
		util = require('gulp-util'),
		livereload = require('gulp-livereload'),
		defineModule = require('gulp-define-module'),
		declare = require('gulp-declare'),
		concat = require('gulp-concat'),
		tap = require('gulp-tap'),
		file = require('gulp-file'),
		handlebars = require('gulp-handlebars'),
		path = require('path');

	var c = 0;

	gulp.src(taskConfig.src)
		.pipe(plumber())
		.pipe(tap(function() {
			c++;
		}))
		.pipe(handlebars().on('error', helpers.errors))
		.pipe(defineModule('plain', { // RequireJS: use 'amd' over plain and uncomment lines below
			// require: {
			// 	Handlebars: 'handlebars'
			// },
			context: {
				handlebars: 'Handlebars.template(<%= contents %>)'
			},
			wrapper: '<%= handlebars %>'
		}))
		.pipe(declare({
			namespace: 'Handlebars.partials',
			processName: function(filePath) {
				// Use "modules/x/y" as partial name, e.g.
				var name = path.relative('./source/', filePath);

				// Remove file extension
				name = util.replaceExtension(util.replaceExtension(name, ''), '');

				// Fix path on windows
				name = name.replace(new RegExp('\\' + path.sep, 'g'), '/');

				return name;
			}
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest(taskConfig.dest))
		.pipe(livereload())
		.on('end', function() {
			if (c === 0) {
				// Create empty file if nothing was streamed
				file('templates.js', '', {
					src: true
				})
					.pipe(gulp.dest(taskConfig.dest))
					.on('finish', cb);
			} else {
				cb();
			}
		});
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig
};
