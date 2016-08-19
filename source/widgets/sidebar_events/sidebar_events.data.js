'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Sidebar Events',
			description: '',
			code: dataHelper.getTemplateCode('sidebar_events.hbs'),
			documentation: dataHelper.getDocumentation('sidebar_events.md')
		}
	});

module.exports = data;
