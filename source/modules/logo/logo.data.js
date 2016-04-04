'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Logo',
			description: '',
			code: dataHelper.getTemplateCode('logo.hbs'),
			documentation: dataHelper.getDocumentation('logo.md')
		}
	});

module.exports = data;
