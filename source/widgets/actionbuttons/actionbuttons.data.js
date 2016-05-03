'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'actionbuttons',
			description: '',
			code: dataHelper.getTemplateCode('actionbuttons.hbs'),
			documentation: dataHelper.getDocumentation('actionbuttons.md')
		}
	});

module.exports = data;
