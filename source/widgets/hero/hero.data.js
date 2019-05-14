'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			isHero2: false,
			heroImg: '/assets/media/img/hero.png',
			heroAlt: 'Symbolbild',
			breadcrumb: {
				entries: [
					{
						'url': '../startpage_prototype/startpage_prototype.html',
						'title': '',
						'extraClasses': 'is_home'
					}, {
						'url': '#',
						'title': 'Weiterbildung',
						'extraClasses': ''
					}, {
						'url': '.#',
						'title': 'Fachbereiche',
						'extraClasses': ''
					}, {
						'url': '#',
						'title': 'Fachbereich für Soziale Arbeit',
						'extraClasses': ''
					}
				]
			}
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'TopBild | WI_043',
				description: '',
				code: dataHelper.getTemplateCode('hero.hbs'),
				documentation: dataHelper.getDocumentation('hero.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			},
			widgets: {
				breadcrumb: requireNew('../breadcrumb/breadcrumb.data.js'),
				calltoaction: requireNew('../calltoaction/calltoaction.data.js')
			}
		}, templateData);

module.exports = data;
