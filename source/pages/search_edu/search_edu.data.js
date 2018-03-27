'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Suche: Studies'
		},
		title: 'Studienangebot der FHNW',
		langStrings: {
			labels: {
				faculty: 'Fachbereich',
				studyType: 'Typ',
				location: 'Ort',
				term: 'Suchbegriff'
			},
			resetFields: 'Alle Felder zurücksetzen',
			resultsFound: 'Kontaktpersonen gefunden'
		},
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: false
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			searchpage: _.assign(requireNew('../../widgets/searchpage/searchpage.data.js'), {
				jsonURL: '/mocks/widgets/searchpage/searchpage.profiles.json'
			}),
			hero: _.assign(requireNew('../../widgets/hero/hero.data.js'), {
				heroImage: '/assets/media/img/cas_eingl_mgmt_hero.png',
				heroAlt: 'Symbolbild',
				breadcrumb: null
			}),
			actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),

			label_search: 'Suchbegrif',
			label_btn_search: 'Suchen',
			label_reset_fields: 'Reset',
			label_location: 'Ort',
			label_faculty: 'Fachbereich',
			label_study_type: 'Typ',

			facultyOptions: [
				{
					'optionLabel': 'Architektur, Bau & Geomatik',
					'optionValue': '1000'
				},
				{
					'optionLabel': 'International Studies',
					'optionValue': '1003'
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
			studyTypeOptions: [
				{
					'optionLabel': 'MBA',
					'optionValue': 'mba'
				},
				{
					'optionLabel': 'MAS',
					'optionValue': 'mas'
				},
				{
					'optionLabel': 'DAS',
					'optionValue': 'das'
				},
				{
					'optionLabel': 'CAS',
					'optionValue': 'cas'
				},
				{
					'optionLabel': 'Kurs',
					'optionValue': 'kurs'
				}
			],
			locationOptions: [
				{
					'optionLabel': 'Basel',
					'optionValue': 'basel'
				},
				{
					'optionLabel': 'Muttenz',
					'optionValue': 'mtz'
				},
				{
					'optionLabel': 'Brugg-Windisch',
					'optionValue': 'brg'
				},
				{
					'optionLabel': 'Olten',
					'optionValue': 'olt'
				},
				{
					'optionLabel': 'Solothurn',
					'optionValue': 'slt'
				}
			]
		}
	});

module.exports = data;
