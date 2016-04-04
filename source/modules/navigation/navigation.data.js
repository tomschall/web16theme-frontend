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
				title: 'Studies',
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
				title: 'Research',
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
				title: 'Media',
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
				title: 'Contact',
				link: '#'
			},
			{
				title: 'Other',
				link: '#',
				subItems: [
					{
						title: 'Blue/Red',
						link: '#'
					},
					{
						title: 'Yellow',
						link: '#'
					},
					{
						title: 'Gold/Silver',
						link: '#'
					},
					{
						title: 'Sapphire/Ruby',
						link: '#'
					}
				]
			}
		]
	});

module.exports = data;
