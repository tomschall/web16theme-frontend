'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			languages: [
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
},
data = _.merge(defaultData, {
		meta: {
			title: 'Sprach-Umschalter | WI_004',
			description: '',
			code: dataHelper.getTemplateCode('langswitcher.hbs'),
			documentation: dataHelper.getDocumentation('langswitcher.md'),
			mocks: [
				{
					description: null,
					data: dataHelper.getFormattedJSON(templateData)
				}
			]
		}
	});

module.exports = data;
