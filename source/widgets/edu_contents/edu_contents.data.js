'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	message: 'Der Anmeldeschluss ist am 15.4.2021 abgelaufen. Nächstes Anmeldefenster öffnet ab 1. Oktober 2025.',
	langStrings: {
		application: 'Anmeldung',
		events: 'Info-Anlässe',
		contact: 'Kontakt'
	}
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
				keydata: _.assign(
					requireNew('../../widgets/edu_key_data/edu_key_data.data.js')
				),
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
