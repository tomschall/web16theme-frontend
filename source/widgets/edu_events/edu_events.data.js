'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
		button: {
			text: 'Zu den Info-Anlässen',
			url: 'http://localhost:9000/pages/university_for_applied_psychology/university_for_applied_psychology.html',
		},
		title: 'Infoveranstaltungen',
		
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
