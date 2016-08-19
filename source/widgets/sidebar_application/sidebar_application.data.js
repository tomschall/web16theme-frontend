'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Sidebar Application',
			description: '',
			code: dataHelper.getTemplateCode('sidebar_application.hbs'),
			documentation: dataHelper.getDocumentation('sidebar_application.md')
		}
	});

module.exports = data;
