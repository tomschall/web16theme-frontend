'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'Proof of Concept - CAS E-Commerce und Online Marketing',
		hideFromListing: true
	},
	title: 'University of Applied Sciences and Arts Northwestern Switzerland FHNW',
	widgets: {
		header: _.assign({
			hasPromoTeaser: false,
			isCollapsible: true
		}, requireNew('../../widgets/header/header.data.js')),
		navigation: requireNew('../../widgets/navigation/navigation.data.js'),
		footer: requireNew('../../widgets/footer/footer.data.js'),
		hero: requireNew('../../widgets/hero/hero.data.js'),
		contentNav: requireNew('../../widgets/contentnav/contentnav.data.js')
	},
	hasPromoteaser: false,
	wrapperClass: ''
});

module.exports = data;
