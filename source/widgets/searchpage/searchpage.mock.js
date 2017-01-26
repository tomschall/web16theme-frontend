'use strict';

var data = {
	'@id': '#',
	'category': 'training',
	'template': 'livesearch',
	'categoryUrl': '#',
	'categoryTitle': 'Weiterbildung',
	'categoryUrlText': 'Alle anzeigen (12)',
	'items': [
		{
			'@id': '#',
			'@type': 'EduProduct',
			title: 'MAS Sozialmanagement',
			description: 'Lorem Ipsum',
			short_eduproducttype: 'MAS'
		},
		{
			'@id': '#',
			'@type': 'EduProduct',
			'title': 'DAS Eingliederungsmanagement',
			description: 'Lorem Ipsum',
			short_eduproducttype: 'MAS'
		},
		{
			'@id': '#',
			'@type': 'EduProduct',
			'title': 'CAS Forschung in den Sozialwissenschaften',
			description: 'Lorem Ipsum',
			short_eduproducttype: 'MAS'
		},
		{
			'@id': '#',
			'@type': 'EduProduct',
			'title': 'DAS Eingliederungsmanagement',
			description: 'Lorem Ipsum',
			short_eduproducttype: 'MAS'
		},
		{
			'@id': '#',
			'@type': 'EduProduct',

			'title': 'MAS Sozialmanagement',
			description: 'Lorem Ipsum',
			short_eduproducttype: 'MAS'
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
	'items_total': 206
};

module.exports = data;
