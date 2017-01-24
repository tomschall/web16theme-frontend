'use strict';

var data = {
	'responseHeader': {
		'params': {
			'category': 'profiles'
		}
	},
	'response': {
		'numFound': 0,
		'start': 0,
		'length': 0,
		'docs': [
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
