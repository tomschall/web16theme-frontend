'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../helpers/data.js'),
	defaultData = requireNew('./data/default.data.js'),
	path = require('path'),
	transform = function(data, filePath) {
		var previewUrl = path.relative('./source/', filePath).replace('.data.js', '.html');

		data = _.merge(data, {
			meta: {
				previewUrl: previewUrl
			}
		});

		return data;
	};

var data = _.merge(defaultData, {
		pages: dataHelper.getDataGlob('./source/pages/**/*.data.js', transform),
		demoPages: dataHelper.getDataGlob('./source/demo/pages/**/*.data.js', transform),
		widgets: dataHelper.getDataGlob('./source/widgets/**/*.data.js', transform),
		demoModules: dataHelper.getDataGlob('./source/demo/modules/**/*.data.js', transform),
		styleguide: dataHelper.getDataGlob('./source/preview/styleguide/*.data.js', transform)
	});

data.pages = _.sortBy(data.pages, function(item) {
	return item.meta.title;
});

data.widgets = _.sortBy(data.widgets, function(item) {
	return item.meta.title;
});

data.styleguide = _.sortBy(data.styleguide, function(item) {
	return item.meta.title;
});

module.exports = data;
