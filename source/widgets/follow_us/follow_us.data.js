'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			widgetTitle: 'Folgen Sie uns:',
			links: [
				{
					type: 'facebook',
					title: 'Facebook',
					url: '#'
				},
				{
					type: 'twitter',
					title: 'Twitter',
					url: '#'
				},
				{
					type: 'youtube',
					title: 'YouTube',
					url: '#'
				},
				{
					type: 'facebook',
					title: 'Facebook',
					url: '#'
				},
				{
					type: 'twitter',
					title: 'Twitter',
					url: '#'
				},
				{
					type: 'facebook',
					title: 'Facebook',
					url: '#'
				},
				{
					type: 'twitter',
					title: 'Twitter',
					url: '#'
				}
			]
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'Follow Us | WI_066',
				description: '',
				code: dataHelper.getTemplateCode('follow_us.hbs'),
				documentation: dataHelper.getDocumentation('follow_us.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
