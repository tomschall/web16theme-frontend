'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {
			xingURL: 'http://www.xing.com',
			xingTitle: 'FHNW on Xing',
			twitterURL: 'http://www.twitter.com',
			twitterTitle: 'FHNW on Twitter',
			fbURL: 'http://www.facebook.com',
			fbTitle: 'FHNW on Facebook',
			linkedinURL: 'https://www.linkedin.com/organization/50566',
			linkedinTitle: 'FHNW on LinkedIn',
			instagramURL: 'https://www.instagram.com/fhnw.ch/',
			instagramTitle: 'FHNW on Instagram'
		},
		data = _.merge(defaultData, {
			meta: {
				title: 'SocialMedia Links | WI_038',
				description: '',
				code: dataHelper.getTemplateCode('somelinks.hbs'),
				documentation: dataHelper.getDocumentation('somelinks.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
