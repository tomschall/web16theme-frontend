'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	title: 'Die FHNW',
	logo: null,
	subtitle: null,
	entries: [
		{
			title: 'Organisation',
			link: '#'
		},
		{
			title: 'Beschwerdekommission',
			link: '#'
		},
		{
			title: 'Alumni',
			link: '../alumni/alumni.html'
		},
		{
			title: 'Diversity und Gleichstellung',
			link: '#'
		},
		{
			title: 'Jahresbericht',
			link: '#'
		},
		{
			title: 'Offene Stellen',
			link: '#'
		},
		{
			title: 'Medien und Öffentlichkeit',
			link: '#'
		}
	]
},
		data = _.merge(defaultData, {
			meta: {
				title: 'Subnavigation',
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
