'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Top-Link | WI_050',
			description: '',
			code: dataHelper.getTemplateCode('toplink.hbs'),
			documentation: dataHelper.getDocumentation('toplink.md')
		}
	});

module.exports = data;
