'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			formLabel: 'Für den Newsletter der Musikhochschulen anmelden',
			buttonLabel: 'Anmelden',
			fieldLabel: 'E-Mail-Adresse',
			msg: {
				required: 'Feld muss angegeben werden',
				email: 'Ungültiges E-Mail Format'
			}
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Newsletter Subscription',
				description: '',
				code: dataHelper.getTemplateCode('newsletter_subscription.hbs'),
				documentation: dataHelper.getDocumentation('newsletter_subscription.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
