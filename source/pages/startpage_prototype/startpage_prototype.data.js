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
		carousel: requireNew('../../widgets/carousel/carousel.data.js'),
		actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
		teaser: _.assign(requireNew('../../widgets/teaser/teaser.data.js'), {
			teasers: [
				{
					title: 'Campus Dreispitz (Basel)',
					url: '#',
					img: {
						src: '/assets/media/img/campus_dreispitz.jpg',
						alt: 'Campus Dreispitz'
					}
				},
				{
					title: 'Campus Brugg-Windisch',
					url: '#',
					img: {
						src: '/assets/media/img/campus_brugg.jpg',
						alt: 'Campus Brugg-Windisch'
					}
				},
				{
					title: 'Campus Muttenz',
					url: '#',
					img: {
						src: '/assets/media/img/campus_muttenz.jpg',
						alt: 'Campus Muttenz'
					}
				}
			],
			isOnStartpage: true
		}),
		fullBleedTeaser: requireNew('../../widgets/full_bleed_teaser/full_bleed_teaser.data.js')
	},
	wrapperClass: 'header__wide'
});

module.exports = data;
