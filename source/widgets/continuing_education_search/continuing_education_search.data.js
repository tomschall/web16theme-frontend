'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
	langStrings: {
		title: 'Title add by PLONE',
		description: 'Description added by PLONE'
	}
},
		data = _.merge(defaultData, {
			meta: {
				title: 'Continuing Education Search | WI_076',
				description: '',
				code: dataHelper.getTemplateCode('continuing_education_search.hbs'),
				documentation: dataHelper.getDocumentation('continuing_education_search.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
