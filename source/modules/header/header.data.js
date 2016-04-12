'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Header',
			description: '',
			code: dataHelper.getTemplateCode('header.hbs'),
			documentation: dataHelper.getDocumentation('header.md')
		},
		modules: {
			navigation: requireNew('../navigation/navigation.data.js')
		}
	});

module.exports = data;
