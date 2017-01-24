'use strict';

var data = {
	'responseHeader': {
		params: {
			category: 'training'
		}
	},
	'response':
		{
			'categoryTitle': 'Weiterbildung',
			'categoryUrl': '#',
			'categoryUrlText': 'Alle anzeigen (12)',
			'docs': [
				{
					'type': 'normal',
					'Title': 'MAS Sozialmanagement',
					'url': '#',
					'study_type': 'MAS'
				},
				{
					'type': 'normal',
					'Title': 'DAS Eingliederungsmanagement',
					'url': '#',
					'study_type': 'MAS'
				},
				{
					'type': 'normal',
					'Title': 'CAS Forschung in den Sozialwissenschaften',
					'url': '#',
					'study_type': 'MAS'
				},
				{
					'type': 'normal',
					'Title': 'MAS Gesundheitsförderung und Prävention',
					'url': '#',
					'study_type': 'MAS'
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
