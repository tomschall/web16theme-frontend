'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			button: {
				text: 'Alle ansehen',
				url: '#gotoevents'
			},
			entries: [
				{
					title: 'Info-Veranstaltung CAS-Eingliederungsmanagement',
					dateTime: '27.06.2016 um 18:15 Uhr',
					location: 'Windisch',
					url: '/'
				},
				{
					title: 'Info-Veranstlatung CAS-Eingliederungsmanagement',
					dateTime: '27.06.2016 um 18:15 Uhr',
					location: 'Windisch',
					url: '/'
				}
			]
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Sidebar Events',
				description: '',
				code: dataHelper.getTemplateCode('sidebar_events.hbs'),
				documentation: dataHelper.getDocumentation('sidebar_events.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
