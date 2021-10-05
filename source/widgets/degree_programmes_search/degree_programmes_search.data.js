'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Degree Programmes Search',
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
				title: 'Degree Programmes | WI_077',
				description: '',
				code: dataHelper.getTemplateCode('degree_programmes_search.hbs'),
				documentation: dataHelper.getDocumentation('degree_programmes_search.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
