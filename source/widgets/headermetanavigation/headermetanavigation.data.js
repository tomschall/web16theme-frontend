'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData  ={
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
},
data = _.merge(defaultData, {
		meta: {
			title: 'Header Metanavigation',
			description: '',
			code: dataHelper.getTemplateCode('headermetanavigation.hbs'),
			documentation: dataHelper.getDocumentation('headermetanavigation.md'),
			mocks: [
				{
					description: null,
					data: dataHelper.getFormattedJSON(templateData)
				}
			]
		}
	}, templateData);

module.exports = data;
