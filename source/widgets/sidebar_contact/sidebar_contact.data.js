'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Sidebar Contact',
			description: '',
			code: dataHelper.getTemplateCode('sidebar_contact.hbs'),
			documentation: dataHelper.getDocumentation('sidebar_contact.md')
		}
	});

module.exports = data;
