'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Slideshow',
			description: 'A very nice Slideshow module',
			jira: null,
			code: dataHelper.getTemplateCode('slideshow.hbs'),
			documentation: dataHelper.getDocumentation('slideshow.md'),
			testScripts: [
				dataHelper.getTestScriptPath('slideshow.test.js')
			]
		},
		slides: _.map(['1024x768', '1024x768', '1024x768'], function(size, index) {
			return {
				src: 'http://www.placehold.it/' + size,
				alt: 'Placeholder ' + (index + 1)
			};
		}),

		i18n: {
			prev: 'Previous Slide',
			next: 'Next Slide'
		}
	});

module.exports = data;
