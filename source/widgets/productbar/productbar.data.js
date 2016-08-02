'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	courseType: 'CAS',
	courseTitle: 'Eingliederungsmanagement',
	infoEventsLink: '#infoEvents',
	onlineApplicationLink: '#targetOnlineApplication',
	langStrings: {
		infoEvents: 'Infoveranstaltungen',
		toApplication: 'Zur Anmeldung'
	}
},
		data = _.merge(defaultData, {
		meta: {
			title: 'Product Bar',
			description: '',
			code: dataHelper.getTemplateCode('productbar.hbs'),
			documentation: dataHelper.getDocumentation('productbar.md'),
			mocks: [
				{
					description: null,
					data: dataHelper.getFormattedJSON(templateData)
				}
			]
		}
	}, templateData);

module.exports = data;
