'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
		button: {
			text: 'Alle ansehen',
			url: '#targetInfoEvents',
		},
		title: 'Infoveranstaltungen',
		entries: [
			{
				title: 'Info-Veranstaltung',
				dateTime: '27.06.2016 um 18:15 Uhr',
				location: 'Windisch',
				url: '/',
			},
			{
				title: 'Info-Veranstaltung',
				dateTime: '27.06.2016 um 18:15 Uhr',
				location: 'Windisch',
				url: '/',
			},
			{
				title: 'Info-Veranstaltung',
				dateTime: '27.06.2016 um 18:15 Uhr',
				location: 'Windisch',
				url: '/',
			},
			{
				title: 'Info-Veranstaltung',
				dateTime: '27.06.2016 um 18:15 Uhr',
				location: 'Windisch',
				url: '/',
			},
			{
				title: 'Info-Veranstaltung',
				dateTime: '27.06.2016 um 18:15 Uhr',
				location: 'Windisch',
				url: '/',
			},
			{
				title: 'Info-Veranstaltung',
				dateTime: '27.06.2016 um 18:15 Uhr',
				location: 'Windisch',
				url: '/',
			},
		],
	},
	data = _.merge(
		defaultData,
		{
			meta: {
				title: 'EDU Events | WI_054',
				description: '',
				code: dataHelper.getTemplateCode('edu_events.hbs'),
				documentation: dataHelper.getDocumentation('edu_events.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData),
					},
				],
			},
		},
		templateData
	);

module.exports = data;
