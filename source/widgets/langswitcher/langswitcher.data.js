'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		dataHelper = require('../../../helpers/data.js'),
		defaultData = requireNew('../../data/default.data.js');

var templateData = {
			languages: [
				{
					lang: 'de',
					langFull: 'Deutsch',
					isTheCurrently: 'Deutsch ist die aktuelle aktive Sprache',
					url: '#',
					active: 'is_active'
				},
				{
					lang: 'en',
					langFull: 'English',
					isTheCurrently: 'English is the currently active language',
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
		}, templateData);

module.exports = data;
