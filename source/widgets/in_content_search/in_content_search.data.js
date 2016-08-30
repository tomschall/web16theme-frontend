'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Suche nach Weiterbildungsangeboten',
			searchFilterPageURL: '/pages/search_filter/search_filter.html'
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'In-Content Search',
				description: '',
				code: dataHelper.getTemplateCode('in_content_search.hbs'),
				documentation: dataHelper.getDocumentation('in_content_search.md')
			}
		}, templateData);

module.exports = data;
