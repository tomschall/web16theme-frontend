'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	entries: [
		{
			title: 'Hausdienst',
			content: '<h2>Test</h2><p>Inhalt, inhalt, inhalt, inhalt</p>'
		},
		{
			title: 'ICT Helpdesk',
			content: '<h2>Test</h2><p>Inhalt, inhalt, inhalt, inhalt</p>'
		},
		{
			title: 'Raumvermietung',
			content: '<h2>Test</h2><p>Inhalt, inhalt, inhalt, inhalt</p>'
		},
		{
			title: 'FH-Card',
			content: '<h2>Test</h2><p>Inhalt, inhalt, inhalt, inhalt</p>'
		}
	],
	langStrings: {
		moreInformation: 'mehr Informationen'
	}
},
	data = _.merge(defaultData, {
		meta: {
			title: 'Accordeon',
			description: '',
			code: dataHelper.getTemplateCode('accordeon.hbs'),
			documentation: dataHelper.getDocumentation('accordeon.md'),
			mocks: {
				documentation: null,
				data: dataHelper.getFormattedJSON(templateData)
			}
		}
	}, templateData);

module.exports = data;
