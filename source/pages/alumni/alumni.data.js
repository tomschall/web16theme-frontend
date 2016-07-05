'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Alumni an der FHNW'
		},
		title: 'Alumni an der FHNW',
		leadText: 'Die Alumni bzw. die Absolventinnen und Absolventen der FHNW sind nach Hochschulen in selbstständigen Alumni Vereinigungen organisiert. Alumni FHNW bildet das Dach der Alumnivereine.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign({
				heroImage: null,
				breadcrumbItems: {
					items: [
						{
							'url': '../startpage_prototype/startpage_prototype.html',
							'title': '',
							'extraClasses': 'is_home'
						}, {
							'url': '#',
							'title': 'Die FHNW',
							'extraClasses': ''
						}, {
							'url': '../about_us/about_us.html',
							'title': 'Über uns',
							'extraClasses': ''
						}
					]
				}
			}, requireNew('../../widgets/hero/hero.data.js')),
			subnav: _.assign(requireNew('../../widgets/subnav/subnav.data.js'), {
				title: null,
				logo: null,
				subtitle: null,
				entries: [
					{
						title: 'Zur FHNW',
						link: '../about_us/about_us.html',
						isBack: true
					}
				]
			}),
			extendedlinks: requireNew('../../widgets/extendedlinks/extendedlinks.data.js')
		}
	});

module.exports = data;
