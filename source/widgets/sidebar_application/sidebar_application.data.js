'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		dataHelper = require('../../../helpers/data.js'),
		defaultData = requireNew('../../data/default.data.js');

var templateData = {
	text: 'Das ist der Text für die Anmeldung',
	note: 'Anmeldehinweis - eher klein',
	button: {
		text: 'Durchführung wählen',
		url: '#gotoapplication'
	}
}, data = _.assign(defaultData, {
	meta: {
		title: 'Sidebar Application',
		description: '',
		code: dataHelper.getTemplateCode('sidebar_application.hbs'),
		documentation: dataHelper.getDocumentation('sidebar_application.md'),
		mocks: [
			{
				description: null,
				data: dataHelper.getFormattedJSON(templateData)
			}
		]
	}
}, templateData);

module.exports = data;
