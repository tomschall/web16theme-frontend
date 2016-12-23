'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Follow Us',
			description: '',
			code: dataHelper.getTemplateCode('follow_us.hbs'),
			documentation: dataHelper.getDocumentation('follow_us.md')
		}
	});

module.exports = data;
