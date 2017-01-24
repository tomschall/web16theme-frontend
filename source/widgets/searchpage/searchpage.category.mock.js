'use strict';

var data = {
	'@id': 'http://nohost',
	'category': 'training',
	'template': 'livesearch',
	'categoryUrl': '#',
	'categoryTitle': 'Weiterbildung',
	'categoryUrlText': 'Alle anzeigen (12)',
	'tableHeaders': [
			'Titel',
			'Typ',
			'Fachbereich',
			'Ort',
			'URL'
		],
	}
	'items': [
		{
			'@id': '#',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			'title': 'MAS Behinderung und Partizipation',
			short_eduproducttype: 'MAS',
			faculty: 'Soziale Arbeit',
			location: 'Olten'

		},
		{
			'@id': '#',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			'title': 'MAS Ethische Entscheidungsfindung in Organisation und Gesellschaft',
			short_eduproducttype: 'MAS',
			faculty: 'Soziale Arbeit',
			location: 'Olten'
		},
		{
			'@id': '#',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			'title': 'MAS FHNW in Coaching',
			short_eduproducttype: 'MAS',
			faculty: 'Soziale Arbeit',
			location: 'Olten'
		},
		{
			'@id': '#',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			'title': 'CAS Eingliederungsmanagement - Zielgruppen und Methoden',
			short_eduproducttype: 'CAS',
			faculty: 'Soziale Arbeit',
			location: 'Windisch'
		},
		{
			'@id': '#',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			'title': 'CAS Eingliederungsmanagement «Fallberatung»',
			short_eduproducttype: 'CAS',
			faculty: 'Soziale Arbeit',
			location: 'Windisch'
		}
	],
	'facets': [
		{
			field: 'location',
			enable: [
				'bsl'
			]
		},
		{
			field: 'study_type',
			enable: [
				'cas'
			]
		},
		{
			field: 'topic',
			enable: [
				'7200',
				'7203'
			]
		}
	]
	'items_total': 204
};

module.exports = data;
