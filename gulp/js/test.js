'use strict';

var gulp = require('gulp'),
	util = require('gulp-util'),
	plumber = require('gulp-plumber'),
	handlebars = require('gulp-hb'),
	path = require('path'),
	del = require('del'),
	Server = require('karma').Server;

var taskName = 'js:test',
	taskConfig = {
		src: [
			'./source/widgets/**/*.hbs',
			'!./source/widgets/**/_*.hbs'
		],
		partials: [
			'source/layouts/*.hbs',
			'source/widgets/**/*.hbs',
			'source/demo/widgets/**/*.hbs',
			'source/preview/**/*.hbs'
		],
		partialPathBase: './source',
		dest: './build/',
		watch: [
			'./source/widgets/**/*.hbs',
			'!./source/widgets/**/_*.hbs'
		]
	};


gulp.task('js:test-templates', function(done) {
	var helpers = require('require-dir')('../../helpers'),
		requireNew = require('require-new'),
		_ = require('lodash'),
		rename = require('gulp-rename'),
		tap = require('gulp-tap');

	gulp
		.src(taskConfig.src)

		.pipe(tap(function(file) {
			var dataFile = util.replaceExtension(file.path, '.data.js');
			file.data = (function() {
				try {
					return requireNew(dataFile);
				} catch (err) {
					helpers.errors({
						task: taskName,
						message: 'Error reading "' + path.relative('./', dataFile) + '": ' + err,
						stack: err.stack
					});
					return {};
				}
			})();
		}))

		.pipe(plumber())
		.pipe(handlebars({
			handlebars: helpers.handlebars.Handlebars,
			partials: taskConfig.partials,
			bustCache: true,
			dataEach: function(context, file) {
				return file.data;
			},
			parsePartialName: function(options, file) {
				var filePath = file.path;

				// Relative to base
				filePath = path.relative(taskConfig.partialPathBase, filePath);

				// Remove extension
				filePath = filePath.replace(path.extname(filePath), '');

				// Use forward slashes on every OS
				filePath = filePath.replace(new RegExp('\\' + path.sep, 'g'), '/');
				return filePath;
			}
		}).on('error', helpers.errors))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(gulp.dest('.test'))
		.on('error', helpers.errors)
		.on('finish', done);
});

gulp.task('js:test', ['js:test-templates'], function (done) {
	new Server({
		configFile: path.join(__dirname, '..', '..', 'karma.conf.js'),
		singleRun: true
	}, function() {
		del('./.test', done);
		done();
	}).start();
});


gulp.task('js:watch-test-templates', ['js:test-templates'], function () {
	gulp.watch(taskConfig.watch, ['js:test-templates']);
});

gulp.task('js:tdd', ['js:watch-test-templates'], function (done) {
	var conf = {
		configFile: path.join(__dirname, '..', '..', 'karma.conf.js'),
		singleRun: false
	};

	// --chrome switch
	if (util.env.chrome) {
		conf.browsers = ['Chrome']
	}

	new Server(conf, function() {
		del('./.test', done);
		done();
	}).start();
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig
};
