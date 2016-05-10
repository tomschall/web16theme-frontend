'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Content Navigation',
			description: '',
			code: dataHelper.getTemplateCode('contentnav.hbs'),
			documentation: dataHelper.getDocumentation('contentnav.md')
		}
	});

module.exports = data;
