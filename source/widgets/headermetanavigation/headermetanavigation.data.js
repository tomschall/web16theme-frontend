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
		},
		items: [
			{
				title: 'Kontakt',
				url: '#'
			},
			{
				title: 'Offene Stellen',
				url: '#'
			},
			{
				title: 'Medien',
				url: '#'
			}
		]
	});

module.exports = data;
