'use strict';

/**
 * @function `gulp html`
 * @desc Compile Handlebars templates to HTML. Use `.data.js` files for - surprise! - data.
 */

var gulp = require('gulp'),
	_ = require('lodash'),
	path = require('path'),
	handlebarsHelper = require('../../helpers/handlebars.js');

var taskName = 'template:plone',
	taskConfig = {
		src: [
			'./source/.templates/plone/**/*.hbs'
		],
		dest: './build/templates/'
	},
	transform = function(data, filePath) {
		data = _.merge(data, {
			modulname: data.meta.title.replace(/ /g, ''),
			lcmodulname: data.meta.title.toLowerCase().replace(/ /g, ''),
			moduldesc: data.meta.description,
			moduletemplate: path.basename(filePath, '.data.js'),
			mockdata: JSON.stringify(_.pickBy(data, function(value, key) {
				return ['meta', 'project', 'env'].indexOf(key) === -1;
			}), null, 4)
		});

		return data;
	};

gulp.task(taskName, function(cb) {
	var helpers = require('require-dir')('../../helpers'),
		plumber = require('gulp-plumber'),
		tap = require('gulp-tap'),
		rename = require('gulp-rename'),
		handlebars = require('gulp-hb');

	gulp.src(taskConfig.src)
		.pipe(tap(function(file) {
			var dataHelper = require('../../helpers/data.js'),
				data = {
					modules: dataHelper.getDataGlob('./source/modules/**/*.data.js', transform)
				};

			// Save data by file name
			file.data = data;
		}))
		.pipe(plumber())
		.pipe(handlebars({
			bustCache: true,
			dataEach: function(context, file) {
				return file.data;
			}
		}).on('error', helpers.errors))
		.pipe(rename({
			extname: ''
		}))
		.pipe(gulp.dest(taskConfig.dest))
		.on('finish', function() {
			cb();
		});
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig
};
