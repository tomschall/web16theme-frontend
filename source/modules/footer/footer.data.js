'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Footer',
			description: '',
			code: dataHelper.getTemplateCode('footer.hbs'),
			documentation: dataHelper.getDocumentation('footer.md')
		}
	});

module.exports = data;
