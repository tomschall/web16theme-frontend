'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Hero',
			description: '',
			code: dataHelper.getTemplateCode('hero.hbs'),
			documentation: dataHelper.getDocumentation('hero.md')
		},
		widgets: {
			breadcrumb: requireNew('../breadcrumb/breadcrumb.data.js')
		}
	});

module.exports = data;
