'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Continuing Education Search',
			description: 'Lorem ipsum dolor sit amet ...',
			searchpage: _.assign(requireNew('../../widgets/searchpage/searchpage.data.js'), {
				jsonURL: '/mocks/widgets/searchpage/searchpage.category.json'
			}),
			widgets: {
					label_search: 'Suchbegriff',
					label_reset_fields: 'Reset',
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
