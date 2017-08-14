'use strict';

var _ = require('lodash'),
		requireNew = require('require-new'),
		dataHelper = require('../../../helpers/data.js'),
		defaultData = requireNew('../../data/default.data.js');

var templateData = {
	news_date: '26.7.2017',
	university: 'Hochschule für Soziale Arbeit'
},
data = _.merge(defaultData, {
	meta: {
		title: 'News Detail | WI_067',
		code: dataHelper.getTemplateCode('news_detail.hbs'),
		documentation: dataHelper.getDocumentation('news_detail.md'),
		mocks: [
			{
				description: null,
				data: dataHelper.getFormattedJSON(templateData)
			}
		]
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
		contact: _.assign(requireNew('../../widgets/contact/contact.data.js'), {
			title: 'Weitere Auskünfte'
		})
	}
}, templateData);

module.exports = data;
