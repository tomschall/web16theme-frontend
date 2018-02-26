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
			'path_string': '/Plone/de/test-edu-1',
			'description': '',
			'Title': 'test-edu-1',
			'portal_type': 'EduProduct',
			'@id': 'http://localhost:8000/Plone/de/test-edu-1',
			'taxonomy_eduproducttype': [
				'2000',
				'2001',
				'2008'
			],
			'Description': '',
			'title': 'test-edu-1',
			'taxonomy_competence': [
				'1001'
			],
			'fhnw_location': [
				'Brugg'
			],
			'taxonomy_subjectarea': [
				'1005',
				'1004',
				'1000'
			],
			'review_state': null,
			'@type': 'EduProduct'
		}
	],
	'facets': [
		{
			field: 'location[]',
			enable: [
				'bsl'
			]
		},
		{
			field: 'study_type[]',
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
