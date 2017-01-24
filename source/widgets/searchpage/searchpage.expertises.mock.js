'use strict';

var data = {
	'@id': 'http://nohost',
	'category': 'expertises',
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
			title: 'Advanced Management',
			'@id': '#'
		},
		{
			title: 'Ästhetik',
			'@id': '#'
		},
		{
			title: 'Berufseinstieg und Wiedereinstieg',
			'@id': '#'
		},
		{
			title: 'Betriebliche Sozialarbeit',
			'@id': '#'
		},
		{
			title: 'Big Data',
			'@id': '#'
		},
		{
			title: 'Chor',
			'@id': '#'
		}
	]
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
