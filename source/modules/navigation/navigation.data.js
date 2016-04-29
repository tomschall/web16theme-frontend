'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Navigation',
			description: '',
			code: dataHelper.getTemplateCode('navigation.hbs'),
			documentation: dataHelper.getDocumentation('navigation.md')
		},
		navItems: [
			{
				title: 'Studium',
				link: '#',
				subItems: [
					{
						title: 'Some section',
						link: '#'
					},
					{
						title: 'Another one',
						link: '#'
					}
				]
			},
			{
				title: 'Weiterbildung',
				link: '#',
				subItems: [
					{
						title: 'Pokemon',
						link: '#',
						subItems: [
							{
								title: 'Pichu',
								link: '#'
							},
							{
								title: 'Pikachu',
								link: '#'
							},
							{
								title: 'Raichu',
								link: '#'
							}
						]
					}
				]
			},
			{
				title: 'Forschung & Praxis',
				link: '#',
				subItems: [
					{
						title: 'Section again',
						link: '#'
					},
					{
						title: 'Some other stuff',
						link: '#'
					},
					{
						title: 'Another one',
						link: '#'
					}
				]
			},
			{
				title: 'Die FHNW',
				link: '#'
			}
		]
	});

module.exports = data;
