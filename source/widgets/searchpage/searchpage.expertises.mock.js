'use strict';

var data = {
	'responseHeader': {
		'params': {
			'category': 'expertises'
		}
	},
	'response': {
		'items_total': 203,
		'start': 0,
		'length': 50,
		'docs': [
			{
				Title: 'Advanced Management',
				url: '#'
			},
			{
				Title: 'Ästhetik',
				url: '#'
			},
			{
				Title: 'Berufseinstieg und Wiedereinstieg',
				url: '#'
			},
			{
				Title: 'Betriebliche Sozialarbeit',
				url: '#'
			},
			{
				Title: 'Big Data',
				url: '#'
			},
			{
				Title: 'Chor',
				url: '#'
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

	}
};

module.exports = data;
