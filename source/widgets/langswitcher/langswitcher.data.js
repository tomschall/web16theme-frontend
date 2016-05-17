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
				url: '#',
				active: 'is_active'
			},
			{
				lang: 'en',
				url: '#',
				active: ''
			}
		]
	});

module.exports = data;
