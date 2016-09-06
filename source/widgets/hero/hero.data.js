'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			heroImg: '/assets/media/img/hero.png',
			heroAlt: 'Symbolbild'
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
				breadcrumb: requireNew('../breadcrumb/breadcrumb.data.js')
			}
		}, templateData);

module.exports = data;
