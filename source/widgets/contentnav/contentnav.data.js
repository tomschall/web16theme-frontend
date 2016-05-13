'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Content Navigation',
			description: '',
			code: dataHelper.getTemplateCode('contentnav.hbs'),
			documentation: dataHelper.getDocumentation('contentnav.md')
		},
		items: [
			{
				title: 'Lern- und Ausbildungsziele',
				link: '#learn',
				bubble: false
			},
			{
				title: 'Zielpublikum',
				link: '#focus-group',
				bubble: false
			},
			{
				title: 'Struktur und Methodik',
				link: '#structure',
				bubble: false
			},
			{
				title: 'Inhaltsbeschreibung',
				link: '#content',
				bubble: false
			},
			{
				title: 'Durchführungen',
				link: '#dates',
				bubble: 2
			}
		]
	});

module.exports = data;
