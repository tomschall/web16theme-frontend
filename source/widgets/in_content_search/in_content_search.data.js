'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Suche nach Weiterbildungsangeboten',
			searchFilterPageURL: '/pages/search_filter/search_filter.html',
			langStrings: {
				chooseExpertise: 'Fachbereich wählen ...',
				extendedSearch: 'Erweiterte Suche',
				showAllOffers: 'Alle Angebote anzeigen',
				search: 'Suchen'
			},
			facultyOptions: [
				{
					'optionLabel': 'Architektur, Bau & Geomatik',
					'optionValue': '1000'
				},
				{
					'optionLabel': 'International Studies',
					'optionValue': '1003',
					'selected': 'selected'
				},
				{
					'optionLabel': 'Life Sciences',
					'optionValue': '1004'
				},
				{
					'optionLabel': 'Musik',
					'optionValue': '1005'
				},
			],
			studyTypeOptions:
					[
						{
							'optionLabel': 'MAS',
							'optionValue': '2008'
						},
						{
							'optionLabel': 'CAS',
							'optionValue': '2000',
							'selected': 'selected'
						},
						{
							'optionLabel': 'DAS',
							'optionValue': '2001'
						}
					]
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'In-Content Suche | WI_059',
				description: '',
				code: dataHelper.getTemplateCode('in_content_search.hbs'),
				documentation: dataHelper.getDocumentation('in_content_search.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
