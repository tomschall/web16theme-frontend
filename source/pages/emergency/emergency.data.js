'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Notfall-Seite'
		},
		title: 'Studentengruppe im Himalaya verschollen.',
		leadText: 'Kein Kontakt seit 23.8, Gesucht wird mit 5 Helikoptern der Schweizer Flugrettung.',
		widgets: {
			header: _.assign({
				hasPromoTeaser: false,
				isCollapsible: true
			}, requireNew('../../widgets/header/header.data.js')),
			navigation: requireNew('../../widgets/navigation/navigation.data.js'),
			footer: requireNew('../../widgets/footer/footer.data.js'),
			hero: _.assign(requireNew('../../widgets/hero/hero.data.js'), {
				breadcrumb: {
					entries: [
						{
							'url': '../startpage_prototype/startpage_prototype.html',
							'title': '',
							'extraClasses': 'is_home'
						}
					]
				}
			}),
			soMeShare: requireNew('../../widgets/so_me_share/so_me_share.data.js')
		}
	});

module.exports = data;
