'use strict';

var data = {
	'@id': 'http://nohost',
	'category': 'training',
	'template': 'livesearch',
	'categoryUrl': '#',
	'categoryTitle': 'Weiterbildung',
	'categoryUrlText': 'Alle anzeigen (12)',
	'fieldHeaders': {
		title: 'Titel',
		study_type: 'Typ',
		faculty: 'Fachbereich',
		location: 'Ort',
		path_string: ''
	},
	'items': [
		{
			'@id': 'https://www.openbsd.org/',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			Title: 'MAS Behinderung und Partizipation',
			taxonomy_eduproducttype: 'MAS',
			taxonomy_subjectarea: 'Soziale Arbeit',
			city: 'Olten'
		},
		{
			'@id': 'https://www.openbsd.org/',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			Title: 'MAS Ethische Entscheidungsfindung in Organisation und Gesellschaft',
			taxonomy_eduproducttype: 'MAS',
			taxonomy_subjectarea: 'Soziale Arbeit',
			city: 'Olten'
		},
		{
			'@id': 'https://www.openbsd.org/',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			Title: 'MAS FHNW in Coaching',
			taxonomy_eduproducttype: 'MAS',
			taxonomy_subjectarea: 'Soziale Arbeit',
			city: 'Olten'
		},
		{
			'@id': 'https://www.openbsd.org/',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			Title: 'CAS Eingliederungsmanagement - Zielgruppen und Methoden',
			taxonomy_eduproducttype: 'CAS',
			taxonomy_subjectarea: 'Soziale Arbeit',
			city: 'Windisch'
		},
		{
			'@id': 'https://www.openbsd.org/',
			'@type': 'EduProduct',
			'description': 'Lorem Ipsum',
			Title: 'CAS Eingliederungsmanagement «Fallberatung»',
			taxonomy_eduproducttype: 'CAS',
			taxonomy_subjectarea: 'Soziale Arbeit',
			city: 'Windisch'
		}
	],
	'facets': [
		{
			field: 'city',
			enable: [
				'bsl'
			]
		},
		{
			field: 'taxonomy_eduproducttype',
			enable: [
				'cas'
			]
		},
		{
			field: 'taxonomy_competence',
			enable: [
				'7200',
				'7203'
			]
		}
	],
	'items_total': 204
};

module.exports = data;
