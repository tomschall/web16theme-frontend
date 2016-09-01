'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Blockquote',
			description: '',
			code: dataHelper.getTemplateCode('blockquote.hbs'),
			documentation: dataHelper.getDocumentation('blockquote.md')
		}
	});

module.exports = data;
