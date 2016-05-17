'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'SoMe Links',
			description: '',
			code: dataHelper.getTemplateCode('somelinks.hbs'),
			documentation: dataHelper.getDocumentation('somelinks.md')
		}
	});

module.exports = data;
