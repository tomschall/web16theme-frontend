'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../../helpers/data.js'),
	defaultData = requireNew('../../../data/default.data.js'),
	tab3 = requireNew('./tabs_panels_content_example/tab3.data.js');

var data = _.merge(defaultData, {
		meta: {
			title: 'Demo: Tabs',
			jira: 'ESTATICO-72',
			feature: 'Feature Tabs',
			code: dataHelper.getTemplateCode('tabs.hbs'),
			documentation: dataHelper.getDocumentation('tabs.md')
		},
		variation: 'var_animated',
		idName: 'recipies',
		tabs: [
			{
				title: 'My tab 1',
				content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
			}, {
				title: 'A name for tab 2',
				content: 'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
				checked: true
			}, {
				title: 'The best tab 3',
				partial: 'demo/modules/tabs/tabs_panels_content_example/tab3',
				partialData: tab3
			}, {
				title: 'A last tab 4',
				content: 'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
			}
		]
	});

if (_.findIndex(data.tabs, 'checked') === -1) {
	data.tabs[0].checked = true;
}

module.exports = data;
