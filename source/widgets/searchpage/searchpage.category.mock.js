'use strict';

var data = {
	'responseHeader': {
		'params': {
			'category': 'training'
		}
	},
	'response': {
		'items_total': 203,
		'start': 0,
		'length': 50,
		'tableHeaders': [
			'Titel',
			'Typ',
			'Fachbereich',
			'Ort',
			'URL'
		],
		'docs': [
			{
				Title: 'MAS Behinderung und Partizipation',
				type: 'MAS',
				faculty: 'Soziale Arbeit',
				location: 'Olten',
				url: '#'
			},
			{
				Title: 'MAS Ethische Entscheidungsfindung in Organisation und Gesellschaft',
				type: 'MAS',
				faculty: 'Soziale Arbeit',
				location: 'Olten',
				url: '#'
			},
			{
				Title: 'MAS FHNW in Coaching',
				type: 'MAS',
				faculty: 'Soziale Arbeit',
				location: 'Olten',
				url: '#'
			},
			{
				Title: 'CAS Eingliederungsmanagement - Zielgruppen und Methoden',
				type: 'CAS',
				faculty: 'Soziale Arbeit',
				location: 'Windisch',
				url: '#'
			},
			{
				Title: 'CAS Eingliederungsmanagement «Fallberatung»',
				type: 'CAS',
				faculty: 'Soziale Arbeit',
				location: 'Windisch',
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
