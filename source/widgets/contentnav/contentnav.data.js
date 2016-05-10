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
				link: '#1',
				bubble: false
			},
			{
				title: 'Zielpublikum',
				link: '#2',
				bubble: false
			},
			{
				title: 'Struktur und Methodik',
				link: '#3',
				bubble: false
			},
			{
				title: 'Inhaltsbeschreibung',
				link: '#4',
				bubble: false
			},
			{
				title: 'Durchführungen',
				link: '#5',
				bubble: 2
			}
		]
	});

module.exports = data;
