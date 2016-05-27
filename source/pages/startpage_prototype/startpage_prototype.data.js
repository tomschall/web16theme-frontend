'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Startpage'
	},
	title: 'University of Applied Sciences and Arts Northwestern Switzerland FHNW',
	widgets: {
		header: _.assign({
			hasPromoTeaser: true,
			isCollapsible: false
		}, requireNew('../../widgets/header/header.data.js')),
		navigation: requireNew('../../widgets/navigation/navigation.data.js'),
		footer: requireNew('../../widgets/footer/footer.data.js'),
		breadcrumb: requireNew('../../widgets/breadcrumb/breadcrumb.data.js'),
		carousel: requireNew('../../widgets/carousel/carousel.data.js')
	},
	wrapperClass: 'header__wide'
});

module.exports = data;
