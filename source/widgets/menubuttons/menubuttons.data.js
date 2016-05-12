'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Menu Buttons',
			description: '',
			code: dataHelper.getTemplateCode('menubuttons.hbs'),
			documentation: dataHelper.getDocumentation('menubuttons.md')
		}
	});

module.exports = data;
