'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'share',
			description: '',
			code: dataHelper.getTemplateCode('share.hbs'),
			documentation: dataHelper.getDocumentation('share.md')
		}
	});

module.exports = data;
