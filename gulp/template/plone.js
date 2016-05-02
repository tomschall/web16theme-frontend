'use strict';

/**
 * @function `gulp html`
 * @desc Compile Handlebars templates to HTML. Use `.data.js` files for - surprise! - data.
 */

var gulp = require('gulp'),
	_ = require('lodash'),
	path = require('path'),
	changeCase = require('change-case');

var taskName = 'template:plone',
	taskConfig = {
		src: [
			'./source/.templates/plone/**/*.hbs'
		],
		dest: './build/templates/'
	},
	transform = function(data, filePath) {
		var moduleName = changeCase.pascalCase(data.meta.title);

		data = _.merge(data, {
			modulname: moduleName,
			lcmodulname: changeCase.lowerCase(moduleName),
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
					modules: dataHelper.getDataGlob('./source/widgets/**/*.data.js', transform)
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
