'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			title: 'Call To Action',
			text: 'Soon, there will be a Call To Action Button.',
			buttonText: 'Mehr Informationen',
			url: 'https://webteam.pages.fhnw.ch/web16theme-frontend/pages/universities_overview/universities_overview.html'
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Call To Action | WI_071',
				description: '',
				code: dataHelper.getTemplateCode('calltoaction.hbs'),
				documentation: dataHelper.getDocumentation('calltoaction.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
