'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Event Search',
			description: 'Lorem ipsum dolor sit amet ...',
			searchpage: _.assign(requireNew('../../widgets/searchpage/searchpage.data.js'), {
				jsonURL: '/mocks/widgets/searchpage/searchpage.category.json'
			}),
			widgets: {
					label_search: 'Suchbegriff',
					label_btn_search: 'Suchen',
					label_reset_fields: 'Reset',
					label_location: 'Ort',
					label_school: 'Hochschule',
					label_type: 'Typ',

					school_options: [
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
					eventtype_options: [
						{
							'optionLabel': 'Info-Anlass',
							'optionValue': '2008'
						},
						{
							'optionLabel': 'Ringvorlesung',
							'optionValue': '2000',
							'selected': 'selected'
						},
						{
							'optionLabel': 'Another Event',
							'optionValue': '2001'
						}
					],

					locationOptions: [
						{
							'optionLabel': 'Basel',
							'optionValue': 'basel'
						},
						{
							'optionLabel': 'Muttenz',
							'optionValue': 'muttenz'
						},
						{
							'optionLabel': 'Brugg-Windisch',
							'optionValue': 'brugg'
						},
						{
							'optionLabel': 'Olten',
							'optionValue': 'olten'
						},
						{
							'optionLabel': 'Solothurn',
							'optionValue': 'solothurn'
						}
					],
				}
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Event Search | WI_073',
				description: '',
				code: dataHelper.getTemplateCode('event_search.hbs'),
				documentation: dataHelper.getDocumentation('event_search.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
