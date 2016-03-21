'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Socialwidget',
			jira: 'ESTATICO-124',
			code: dataHelper.getTemplateCode('socialwidget.hbs'),
			documentation: dataHelper.getDocumentation('socialwidget.md')
		},
		links: [
			{
				url: 'https://www.facebook.com/sharer/sharer.php?u=http://www.URL.ch',
				text: 'Share on Facebook',
				variation: 'var_facebook'
			},
			{
				url: 'https://plus.google.com/share?url=http://www.URL.ch',
				text: 'Share on Google+',
				variation: 'var_googleplus'
			},
			{
				url: 'http://twitter.com/home?status=http://www.URL.ch',
				text: 'Tweet',
				variation: 'var_twitter'
			},
			{
				url: 'https://pinterest.com/pin/create/button/?url=http://www.URL.ch',
				text: 'Pin it on Pinterest',
				variation: 'var_pinterest'
			},
			{
				url: 'mailto:?subject=SUBJECT&body=BODY:%20http://www.URL.ch',
				text: 'Tell a friend',
				variation: 'var_mail'
			}
		]
	});

module.exports = data;
