'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'page_search',
			description: '',
			code: dataHelper.getTemplateCode('pagesearch.hbs'),
			documentation: dataHelper.getDocumentation('pagesearch.md')
		}
	});

module.exports = data;
