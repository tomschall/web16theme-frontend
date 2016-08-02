'use strict';

var _ = require('lodash');

var data = {
	'response':[
		{
			'category': 'topResults',
			'entries': [
				{
					'title': 'CASE',
					'text': 'Lorem ipsum, dolores sit amet',
					'target': 'fhnw.ch/CASE'
				},
				{
					'title': 'Marketing',
					'text': 'Lorem ipsum, dolores sit amet',
					'target': 'fhnw.ch/Marketing'
				}
			]
		},
		{
			'category': 'certificateCourses',
			'entries': [
				{
					'title': 'CAS Online-Marketing & E-Commerce',
					'target': 'link zum ziel'
				},
				{
					'title': 'CAS Akustik 2010',
					'target': 'link zum lehrgang'
				}
			]
		},
		{
			'category': 'courses',
			'entries': [
				{
					'title': 'Internet und Netzwerke',
					'target': 'link zum kurs'
				}
			]
		}
	]
};

module.exports = data;
