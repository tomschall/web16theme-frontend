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
	'items': [
		{
			'@id': 'https://www.openbsd.org/',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			Title: 'MAS Behinderung und Partizipation',
			short_eduproducttype: 'MAS',
			faculty: 'Soziale Arbeit',
			location: 'Olten'

		},
		{
			'@id': 'https://www.openbsd.org/',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			Title: 'MAS Ethische Entscheidungsfindung in Organisation und Gesellschaft',
			short_eduproducttype: 'MAS',
			faculty: 'Soziale Arbeit',
			location: 'Olten'
		},
		{
			'@id': 'https://www.openbsd.org/',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			Title: 'MAS FHNW in Coaching',
			short_eduproducttype: 'MAS',
			faculty: 'Soziale Arbeit',
			location: 'Olten'
		},
		{
			'@id': 'https://www.openbsd.org/',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			Title: 'CAS Eingliederungsmanagement - Zielgruppen und Methoden',
			short_eduproducttype: 'CAS',
			faculty: 'Soziale Arbeit',
			location: 'Windisch'
		},
		{
			'@id': 'https://www.openbsd.org/',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			Title: 'CAS Eingliederungsmanagement «Fallberatung»',
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
	],
	'items_total': 204
};

module.exports = data;
