'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		dataHelper = require('../../../helpers/data.js'),
		defaultData = requireNew('../../data/default.data.js');

var templateData = {
			items: [
				{
					title: 'Standorte',
					url: '#'
				},
				{
					title: 'Bibliotheken',
					url: '#'
				},
				{
					title: 'Karriere an der FHNW',
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
				title: 'Support-Navigation | WI_006',
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
