'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Header | WI_044',
			description: '',
			code: dataHelper.getTemplateCode('header.hbs'),
			documentation: dataHelper.getDocumentation('header.md')
		},
		widgets: {
			navigation: requireNew('../navigation/navigation.data.js'),
			logo: requireNew('../logo/logo.data.js'),
			languageSwitcher: requireNew('../langswitcher/langswitcher.data.js'),
			headerMetaNavigation: requireNew('../headermetanavigation/headermetanavigation.data.js'),
			soMeLinks: requireNew('../somelinks/somelinks.data.js'),
			promoteaser: requireNew('../promoteaser/promoteaser.data.js')
		}
	});

module.exports = data;
