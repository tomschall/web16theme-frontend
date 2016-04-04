'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Basic template'
		},
		title: 'University of Applied Sciences and Arts Northwestern Switzerland FHNW',
		modules: {
			navigation: requireNew('../../modules/navigation/navigation.data.js'),
			slideshow: requireNew('../../modules/slideshow/slideshow.data.js'),
			teaser: requireNew('../../modules/teaser/teaser.data.js')
		}
	});

module.exports = data;
