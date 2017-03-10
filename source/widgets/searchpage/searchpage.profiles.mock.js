'use strict';

var data = {
	'@id': '#',
	'category': 'profiles',
	'categoryUrl': '#',
	'categoryTitle': 'Weiterbildung',
	'categoryUrlText': 'Alle anzeigen (12)',
	'items': [
		{
				title: 'Prof. Dr. Barbara Gorssenbacher Künzler',
				'@id': '#',
				description: 'Co-Leiterin der Professur für Französischdidaktik und ihre Disziplinen',
				standortadresse: 'Pädagogische Hochschule FHNW<br/>Institut Primarstufe<br/>Obere Sternengasse 7<br/>CH - 4502 Solothurn',
				telefonnummer: '+ 41 62 957 24 26',
				telefonnummer_central: '+ 41 62 957 24 26',
				email: 'barbara.grossenbacher@fhnw.ch'
			},
			{
				Title: 'Prof. Dr. Barbara Gorssenbacher Künzler',
				'@id': '#',
				description: 'Co-Leiterin der Professur für Französischdidaktik und ihre Disziplinen',
				standortadresse: 'Pädagogische Hochschule FHNW<br/>Institut Primarstufe<br/>Obere Sternengasse 7<br/>CH - 4502 Solothurn',
				telefonnummer: '+ 41 62 957 24 26'
			},
			{
				Title: 'Prof. Peter Muster',
				'@id': '#',
				description: 'Leiterin der Professur für Französischdidakt',
				standortadresse: 'Pädagogische Hochschule FHNW<br/>CH - 4502 Solothurn',
				telefonnummer: '+ 41 62 957 24 26'
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
			field: 'faculty',
			enable: [
					'it'
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
