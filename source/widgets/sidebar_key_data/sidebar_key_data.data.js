'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Sidebar KeyData',
			description: '',
			code: dataHelper.getTemplateCode('sidebar_key_data.hbs'),
			documentation: dataHelper.getDocumentation('sidebar_key_data.md')
		}
	});

module.exports = data;
