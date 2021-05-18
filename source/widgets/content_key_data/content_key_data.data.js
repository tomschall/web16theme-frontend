'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
		title: 'Eckdaten',
		entries: [
			{
				title: 'Abschluss',
				text: 'CAS Lorem Ipsum Management',
			},
			{
				title: 'ECTS Punkte',
				text: '15 Credits',
			},
			{
				title: 'Zeitraum & Dauer',
				text: '1.4.2016 – 24.12.2016, 2 Semester',
			},
			{
				title: 'Unterrichtssprache',
				text: 'Deutsch',
			},
		],
	},
	data = _.assign(
		defaultData,
		{
			meta: {
				title: 'Content EDU-Product | WI_055',
				description: '',
				code: dataHelper.getTemplateCode('content_key_data.hbs'),
				documentation: dataHelper.getDocumentation('content_key_data.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData),
					},
				],
			},
			widgets: {
				application: _.assign(
					requireNew(
						'../../widgets/sidebar_application/sidebar_application.data.js'
					)
				),
				events: _.assign(
					requireNew('../../widgets/sidebar_events/sidebar_events.data.js')
				),
			},
		},
		templateData
	);

module.exports = data;
