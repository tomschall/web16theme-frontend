'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
		widget_data:
			'{"filterSubjectArea": false, "filterDateLine": true, "filterLocation": true, "showImages": true, ' +
			'"initialResultLayout": "teaser_layout", "subjectAreaOptions": [{"optionValue": "1003", "optionLabel": "International Studies", ' +
			'"selected": false}, {"optionValue": "1009", "optionLabel": "Technik", "selected": false}], "dateLineOptions": [{"optionValue": "cas",' +
			'"optionLabel": "CAS", "selected": false}, {"optionValue": "infoanlass", "optionLabel": "Info-Anlass", "selected": true}, ' +
			'{"optionValue": "masterofarts", "optionLabel": "Master of Arts", "selected": false}], "locationOptions": [{"optionValue": "crrsav5xc4", ' +
			'"optionLabel": "Andere", "selected": false}, {"optionValue": "basel", "optionLabel": "Basel", "selected": false}, ' +
			'{"optionValue": "muttenz", "optionLabel": "Muttenz", "selected": false}], "subject": [], ' +
			'"jsonURL": "http://localhost:8000/Plone/de/searchbar.json", "filterURL": "http://localhost:8000/Plone/de/searchbar.json"}',
	},
	data = _.merge(
		defaultData,
		{
			meta: {
				title: 'Degree Programmes | WI_077',
				description: '',
				code: dataHelper.getTemplateCode('degree_programmes_search.hbs'),
				documentation: dataHelper.getDocumentation(
					'degree_programmes_search.md'
				),
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
