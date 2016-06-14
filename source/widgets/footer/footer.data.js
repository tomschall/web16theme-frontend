'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Footer | WI_023',
			description: '',
			code: dataHelper.getTemplateCode('footer.hbs'),
			documentation: dataHelper.getDocumentation('footer.md')
		},
		widgets: {
			navigationMeta: requireNew('../navigation_meta/navigation_meta.data.js')
		}
	});

module.exports = data;
