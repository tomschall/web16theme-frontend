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
			facultyOptions: [
				{
					'optionLabel': 'International Studies',
					'optionValue': 'is'
				},
				{
					'optionLabel': 'Informatik',
					'optionValue': 'it'
				},
				{
					'optionLabel': 'Life Sciences',
					'optionValue': 'ls'
				},
				{
					'optionLabel': 'Musik',
					'optionValue': 'mc'
				},
				{
					'optionLabel': 'Pädagogik',
					'optionValue': 'ph'
				},
				{
					'optionLabel': 'Psychologie',
					'optionValue': 'ps'
				},
				{
					'optionLabel': 'Soziale Arbeit',
					'optionValue': 'sw'
				},
				{
					'optionLabel': 'Technik',
					'optionValue': 'tn'
				}
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
					'optionValue': 'bsl'
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
