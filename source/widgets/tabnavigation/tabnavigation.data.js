'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	entries: [
		{
			type: 'contact',
			title: 'Leitung',
			name: 'contact',
			templateData: _.assign(requireNew('../../widgets/contact/contact.data.js'), {})
		}
	]
},

data = _.merge(defaultData, {
		meta: {
			title: 'Tabulatoren | WI_011',
			description: '',
			code: dataHelper.getTemplateCode('tabnavigation.hbs'),
			documentation: dataHelper.getDocumentation('tabnavigation.md'),
			mocks: {
				documentation: null,
				data: dataHelper.getFormattedJSON(templateData)
			}
		}
	}, templateData);

module.exports = data;
