'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Subpage Prototype'
	},
	title: 'University of Applied Sciences and Arts Northwestern Switzerland FHNW',
	modules: {
		header: requireNew('../../widgets/header/header.data.js'),
		navigation: requireNew('../../widgets/navigation/navigation.data.js'),
		footer: requireNew('../../widgets/footer/footer.data.js'),
		hero: requireNew('../../widgets/hero/hero.data.js'),
		slideshow: requireNew('../../widgets/slideshow/slideshow.data.js')
	}
});

module.exports = data;
