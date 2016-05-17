'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Header Metanavigation',
			description: '',
			code: dataHelper.getTemplateCode('headermetanavigation.hbs'),
			documentation: dataHelper.getDocumentation('headermetanavigation.md')
		}
	});

module.exports = data;
