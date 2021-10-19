'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Continuing Education Search',
			description: 'Lorem ipsum dolor sit amet ...',
			searchpage: _.assign(requireNew('../../widgets/searchpage/searchpage.data.js'), {
				jsonURL: '/mocks/widgets/searchpage/searchpage.category.json'
			}),
			widgets: {
					label_search: 'Suchbegriff',
					label_reset_fields: 'Reset',
				  label_faculty: 'Fachbereich',
					label_location: 'Standort',
					label_type: 'Typ',
					subjectarea_options : [
						{
							optionValue: '1005',
							optionLabel: 'Musik',
							selected: false
						},
						{
							optionValue: '1006',
							optionLabel: 'Psychologie',
							selected: true
						},
						{
							optionValue: '1007',
							optionLabel: 'Pädagogik',
							selected: false
						},
						{
							optionValue: '1008',
							optionLabel: 'Soziale Arbeit',
							selected: false
						},
						{
							optionValue: '1009',
							optionLabel: 'Technik',
							selected: false
						},
					],
					eduproducttype_options: [
						{
							optionValue: '2000',
							optionLabel: 'CAS',
							hide: false
						},
						{
							optionValue: '2001',
							optionLabel: 'DAS',
							hide: true
						},
						{
							optionValue: '2006',
							optionLabel: 'Fachtagung',
							hide: false
						},
						{
							optionValue: '2007',
							optionLabel: 'Kurs',
							hide: false
						},
						{
							optionValue: '2008',
							optionLabel: 'MAS',
							hide: false
						},
					],
					locationOptions: [
						{
							optionValue: 'andere',
							optionLabel: 'Andere',
							selected: true
						},
						{
							optionValue: 'basel',
							optionLabel: 'Basel',
							selected: false
						},
						{
							optionValue: 'brugg_windisch',
							optionLabel: 'Brugg-Windisch',
							selected: false
						},
						{
							optionValue: 'muttenz',
							optionLabel: 'Muttenz',
							selected: false
						},
						{
							optionValue: 'olten',
							optionLabel: 'Olten',
							selected: false
						},
						{
							optionValue: 'online',
							optionLabel: 'Online',
							selected: false
						},
					],
				}
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Continuing Education Search | WI_076',
				description: '',
				code: dataHelper.getTemplateCode('continuing_education_search.hbs'),
				documentation: dataHelper.getDocumentation('continuing_education_search.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
