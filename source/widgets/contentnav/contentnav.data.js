'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Content Navigation | WI_031',
			description: '',
			code: dataHelper.getTemplateCode('contentnav.hbs'),
			documentation: dataHelper.getDocumentation('contentnav.md')
		},
		entries: [
			{
				title: 'Lern- und Ausbildungsziele',
				url: '#learn',
				bubble: false
			},
			{
				title: 'Zielpublikum',
				url: '#focus-group',
				bubble: false
			},
			{
				title: 'Struktur und Methodik',
				url: '#structure',
				bubble: false
			},
			{
				title: 'Inhaltsbeschreibung',
				url: '#content',
				bubble: false
			},
			{
				title: 'Durchführungen',
				url: '#dates',
				bubble: 2
			}
		]
	});

module.exports = data;
