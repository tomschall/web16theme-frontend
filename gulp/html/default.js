'use strict';

/**
 * @function `gulp html`
 * @desc Compile Handlebars templates to HTML. Use `.data.js` files for - surprise! - data.
 * By default, a very basic dependency graph makes sure that only the necessary files are rebuilt on changes. Add the `--skipHtmlDependencyGraph` flag to disable this behavior and just build everything all the time.
 */

var gulp = require('gulp'),
	util = require('gulp-util');

var taskName = 'html',
	taskConfig = {
		src: [
			'./source/*.hbs',
			'./source/pages/**/*.hbs',
			'./source/demo/pages/**/*.hbs',
			'./source/widgets/**/!(_)*.hbs',
			'./source/demo/widgets/**/!(_)*.hbs',
			'./source/preview/styleguide/*.hbs'
		],
		srcWidgetPreview: './source/preview/layouts/module.hbs',
		partials: [
			'source/layouts/*.hbs',
			'source/widgets/**/*.hbs',
			'source/demo/widgets/**/*.hbs',
			'source/preview/**/*.hbs'
		],
		partialPathBase: './source',
		dest: './build/',
		watch: [
			'source/*.hbs',
			'source/layouts/*.hbs',
			'source/pages/**/*.hbs',
			'source/demo/pages/**/*.hbs',
			'source/widgets/**/*.hbs',
			'source/demo/widgets/**/*.hbs',
			'source/preview/**/*.hbs',
			'source/data/**/*.data.js',
			'source/pages/**/*.data.js',
			'source/demo/pages/**/*.data.js',
			'source/widgets/**/*.data.js',
			'source/demo/widgets/**/*.data.js',
			'source/preview/**/*.data.js',
			'source/widgets/**/*.md',
			'source/demo/widgets/**/*.md',
			'source/assets/css/data/colors.html'
		]
	},
	task = function(config, cb) {
		var helpers = require('require-dir')('../../helpers'),
			plumber = require('gulp-plumber'),
			livereload = require('gulp-livereload'),
			requireNew = require('require-new'),
			path = require('path'),
			fs = require('fs'),
			tap = require('gulp-tap'),
			rename = require('gulp-rename'),

			// Format HTML (disabled due to incorrect resulting indentation)
			// prettify = require('gulp-prettify'),
			_ = require('lodash'),
			handlebars = require('gulp-hb');

	    var widgetPreviewTemplate;

		gulp.src(config.src, {
				base: './source'
			})
			.pipe(tap(function(file) {
				var dataFile = util.replaceExtension(file.path, '.data.js'),
					data = (function() {
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
				})(),

				widgetTemplate,
				mergedData;

			    // Precompile module demo and variants
				if (file.path.indexOf(path.sep + 'widgets' + path.sep) !== -1) {
                    widgetTemplate = file.contents.toString();
                    widgetPreviewTemplate = widgetPreviewTemplate || fs.readFileSync(taskConfig.srcWidgetPreview, 'utf8');

                    data.demo = helpers.handlebars.Handlebars.compile(widgetTemplate)(data);

                    // Compile variants
                    if (data.variants) {
                        data.variants = data.variants.map(function(variant) {
                            variant.demo = helpers.handlebars.Handlebars.compile(widgetTemplate)(variant);

                            return variant;
                        });

                        mergedData = _.extend({}, _.omit(data, ['project', 'env', 'meta', 'variants']), {
                                meta: {
                                    title: 'Default',
                                    desc: 'Default implemention.'
                                }
                            }
                        );
                        data.variants.unshift(mergedData);
                    }

					// Replace file content with preview template
					file.contents = new Buffer(widgetPreviewTemplate);
				}

				// Save data by file name
				file.data = data;
			}))
			.pipe(plumber())
			.pipe(handlebars({
				handlebars: helpers.handlebars.Handlebars,
				partials: config.partials,
				bustCache: true,
				dataEach: function(context, file) {
					return file.data;
				},
				parsePartialName: function(options, file) {
					var filePath = file.path;

					// Relative to base
					filePath = path.relative(config.partialPathBase, filePath);

					// Remove extension
					filePath = filePath.replace(path.extname(filePath), '');

					// Use forward slashes on every OS
					filePath = filePath.replace(new RegExp('\\' + path.sep, 'g'), '/');
					return filePath;
				}
			})
			.on('error', helpers.errors))
			.pipe(rename({
				extname: '.html'
			}))
			.pipe(gulp.dest(config.dest))
			.on('finish', function() {
				livereload.reload();
				cb();
			});
	};

gulp.task(taskName, function(cb) {
	return task(taskConfig, cb);
});

module.exports = {
	taskName: taskName,
	taskConfig: taskConfig,
	task: task
};
