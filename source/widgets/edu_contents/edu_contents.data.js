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
			{
				title: 'Lorem ipsum',
				text: 'Dolor sit amet',
			},
			{
				title: 'Lorem ipsum',
				text: 'Dolor sit amet',
			},
			{
				title: 'Lorem ipsum',
				text: 'Dolor sit amet',
			},
			{
				title: 'Lorem ipsum',
				text: 'Dolor sit amet',
			},
			{
				title: 'Lorem ipsum',
				text: 'Dolor sit amet',
			},
		],
	},
	data = _.assign(
		defaultData,
		{
			meta: {
				title: 'EDU Contents | WI_075',
				description: '',
				code: dataHelper.getTemplateCode('edu_contents.hbs'),
				documentation: dataHelper.getDocumentation('edu_contents.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData),
					},
				],
			},
			widgets: {
				application: _.assign(
					requireNew('../../widgets/edu_application/edu_application.data.js')
				),
				events: _.assign(
					requireNew('../../widgets/edu_events/edu_events.data.js')
				),
			},
		},
		templateData
	);

module.exports = data;
