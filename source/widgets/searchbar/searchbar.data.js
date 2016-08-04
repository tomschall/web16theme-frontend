'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Globales Suchfeld | WI_005',
			description: '',
			code: dataHelper.getTemplateCode('searchbar.hbs'),
			documentation: dataHelper.getDocumentation('searchbar.md')
		}
	});

module.exports = data;
