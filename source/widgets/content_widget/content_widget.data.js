'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Content Widget',
			description: '',
			code: dataHelper.getTemplateCode('content_widget.hbs'),
			documentation: dataHelper.getDocumentation('content_widget.md')
		},
		title: 'Content',
		widgetContent: '<p>Test</p>'
	});

module.exports = data;
