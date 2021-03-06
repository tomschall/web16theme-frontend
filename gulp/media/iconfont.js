'use strict';

/**
 * @function `gulp media:iconfont`
 * @desc Generate icon font (using `gulp-iconfont`) and corresponding Sass file (based on Handlebars template).
 */

var gulp = require('gulp');

var taskName = 'media:iconfont',
	taskConfig = {
		src: [
			'./source/assets/media/icons/*.svg',
			'./source/widgets/**/icons/*.svg',
			'./source/demo/widgets/**/icons/*.svg'
		],
		dest: './build/assets/fonts/icons/',
		srcStyles: './source/assets/css/templates/_iconfont.scss',
		destStyles: './source/assets/.tmp/',
		relFont: '../fonts/icons/',
		watch: [
			'source/assets/media/icons/*.svg',
			'source/widgets/**/icons/*.svg',
			'source/demo/widgets/**/icons/*.svg'
		]
	};

gulp.task(taskName, function(cb) {
	var helpers = require('require-dir')('../../helpers'),
		plumber = require('gulp-plumber'),
		size = require('gulp-size'),
		iconfont = require('gulp-iconfont'),
		handlebars = require('gulp-hb'),
		_ = require('lodash');

	var data = {
			icons: {},
			options: {}
		};

	gulp.src(taskConfig.src)
		.pipe(iconfont({
			fontName: 'Icons',
			normalize: true
		}))
		.on('glyphs', function(glyphs, options) {
			var icons = {};
			// Normalize data to be consistent with dataurls.js and pngsprite.js
			glyphs.forEach(function(icon) {
				icons[icon.name] = {
					codepoint: icon.unicode.toString(16).toUpperCase()
				};
			});

			data.icons = icons;

			data.options = _.merge(options, {
				fontPath: taskConfig.relFont
			});
		})
		.pipe(size({
			title: taskName
		}))
		.pipe(gulp.dest(taskConfig.dest))

		// Create SCSS file
		.on('end', function() {
			gulp.src(taskConfig.srcStyles)
				.pipe(plumber())
				.pipe(handlebars({
					data: {
						icons: data.icons,
						options: data.options
					},
					bustCache: true
				}).on('error', helpers.errors))
				.pipe(gulp.dest(taskConfig.destStyles))
				.on('end', function() {
					cb();
				});
		});
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig
};
