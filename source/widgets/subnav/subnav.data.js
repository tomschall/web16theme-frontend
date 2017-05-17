'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	title: 'Die FHNW',
	titleUrl: 'http://www.fhnw.ch/titleurl',
	logo: null,
	subtitle: 'Hochschulen',
	subtitleUrl: 'http://www.fhnw.ch/subtitleurl',
	entries: [
		{
			title: 'Organisation',
			url: '#'
		},
		{
			title: 'Beschwerdekommission',
			url: '#'
		},
		{
			title: 'Alumni',
			url: '../alumni/alumni.html'
		},
		{
			title: 'Diversity und Gleichstellung',
			url: '#'
		},
		{
			title: 'Jahresbericht',
			url: '#'
		},
		{
			title: 'Offene Stellen',
			url: '#'
		},
		{
			title: 'Medien und Öffentlichkeit',
			url: '#'
		}
	]
},
		data = _.merge(defaultData, {
			meta: {
				title: 'Unternavigation losgelöst | WI_039',
				description: '',
				code: dataHelper.getTemplateCode('subnav.hbs'),
				documentation: dataHelper.getDocumentation('subnav.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
