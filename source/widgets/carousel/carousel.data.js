'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Carousel',
			description: '',
			code: dataHelper.getTemplateCode('carousel.hbs'),
			documentation: dataHelper.getDocumentation('carousel.md')
		}
	});

module.exports = data;
