'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Actionbuttons | WI_046',
			description: '',
			code: dataHelper.getTemplateCode('actionbuttons.hbs'),
			documentation: dataHelper.getDocumentation('actionbuttons.md')
		},
		widgets: {
			searchbar: requireNew('../searchbar/searchbar.data.js')
		}
	});

module.exports = data;
