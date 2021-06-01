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
				text: 'CAS Eingliederungsmanagement',
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
				title: 'EDU Key Datas | WI_055',
				description: '',
				code: dataHelper.getTemplateCode('edu_key_data.hbs'),
				documentation: dataHelper.getDocumentation('edu_key_data.md'),
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
