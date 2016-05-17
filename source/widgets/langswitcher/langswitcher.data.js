'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Lang Switcher',
			description: '',
			code: dataHelper.getTemplateCode('langswitcher.hbs'),
			documentation: dataHelper.getDocumentation('langswitcher.md')
		},
		languages:[
			{
				lang: 'de',
				url: '#'
			},
			{
				lang: 'en',
				url: '#'
			}
		]
	});

module.exports = data;
