'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			application: {
				text: 'Anmeldung',
				url: '#targetOnlineApplication'
			},
			infoEvents: {
				text: 'Infoveranstaltungen',
				url: '#targetInfoEvents'
			}
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Mobile Content Navigation',
				description: '',
				code: dataHelper.getTemplateCode('mobile_content_navigation.hbs'),
				documentation: dataHelper.getDocumentation('mobile_content_navigation.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
