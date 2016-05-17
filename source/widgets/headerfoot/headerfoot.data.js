'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Header Foot',
			description: '',
			code: dataHelper.getTemplateCode('headerfoot.hbs'),
			documentation: dataHelper.getDocumentation('headerfoot.md')
		},
		widgets: {
			languageSwitcher: requireNew('../langswitcher/langswitcher.data.js'),
			headerMetaNavigation: requireNew('../headermetanavigation/headermetanavigation.data.js'),
			soMeLinks: requireNew('../somelinks/somelinks.data.js')
		}
	});

module.exports = data;
