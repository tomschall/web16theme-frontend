'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
	meta: {
		title: 'News Detail'
	},
	widgets: {
		header: _.assign({
			hasPromoTeaser: false,
			isCollapsible: true
		}, requireNew('../../widgets/header/header.data.js')),
		navigation: requireNew('../../widgets/navigation/navigation.data.js'),
		footer: requireNew('../../widgets/footer/footer.data.js'),
		hero: _.assign({
			heroImage: '/assets/media/img/building_brugg.png',
			heroAlt: 'Symbolbild',
			breadcrumb: requireNew('../../widgets/breadcrumb/breadcrumb.data.js'),
		}, requireNew('../../widgets/hero/hero.data.js')),
		subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
			title: 'Hochschule für Soziale Arbeit',
			subtitle: 'News',
			titleUrl: '#',
			entries: [
				{
					title: 'Zurück zur Übersicht',
					url: '#',
					isBack: true
				}
			]
		}),
		mobileContentNavigation: requireNew('../../widgets/mobile_content_navigation/mobile_content_navigation.data.js'),
		actionbuttons: requireNew('../../widgets/actionbuttons/actionbuttons.data.js'),
		news_detail: requireNew('../../widgets/news_detail/news_detail.data.js'),
		contact: _.assign(requireNew('../../widgets/contact/contact.data.js'), {
			title: 'Weitere Auskünfte'
		})
	}
});

module.exports = data;
