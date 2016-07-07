'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Promo-Teaser | WI_037',
			description: '',
			code: dataHelper.getTemplateCode('promoteaser.hbs'),
			documentation: dataHelper.getDocumentation('promoteaser.md')
		}
	});

module.exports = data;
