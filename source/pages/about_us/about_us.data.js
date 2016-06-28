'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Über uns'
		},
		title: 'Über uns',
		leadText: 'Vielfältig, praxisnah und marktorientiert. Die Fachhochschule Nordwestschweiz FHNW hat sich als eine der führenden und innovationsstärksten Fachhochschulen der Schweiz etabliert.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: 'about_us_hero.png',
				breadcrumbItems: {
					items: [
						{
							'url': '../startpage_prototype/startpage_prototype.html',
							'title': '',
							'extraClasses': 'is_home'
						}, {
							'url': '',
							'title': 'Die FHNW',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: requireNew('../../widgets/subnav/subnav.data.js')
		}
	});

module.exports = data;
