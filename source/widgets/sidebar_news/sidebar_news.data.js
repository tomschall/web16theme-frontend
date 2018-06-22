'use strict';

var _ = require('lodash'),
	requireNew = require('require-new'),
	dataHelper = require('../../../helpers/data.js'),
	defaultData = requireNew('../../data/default.data.js');

var templateData = {  
   'title':'Contacts',
   'langStrings':{  
      'location':'Standort',
      'telephone':'Telefonnummer',
      'email':'E-Mail'
   },
   'contacts':[  
      {  
         'email':'peter.muster@fhnw.ch',
         'jobDescr':'',
         'name':'Peter Muster',
         'img':{  
            'src': '',
            'alt':'Peter Muster'
         },
         'url': '',
         'telephone':'+41 61 000 00 00',
         'location':'Fachhochschule Nordwestschweiz FHNW<br/>Campus Muttenz<br/>Hofackerstrasse 30<br/>4132 Muttenz'
      },
      {  
         'email':'beatrice.muster@fhnw.ch',
         'jobDescr':'',
         'name':'Prof. Dr. B\xe9atrice Muster',
         'img':{  
            'src': '',
            'alt':'Prof. Dr. B\xe9atrice Muster'
         },
         'url': '',
         'telephone':'+41 79 000 00 00',
         'location':'bitte E-Mail verwenden'
      }
   ]
},
		data = _.merge(defaultData, {
			meta: {
				title: 'Sidebar News | WI_072',
				description: '',
				code: dataHelper.getTemplateCode('sidebar_news.hbs'),
				documentation: dataHelper.getDocumentation('sidebar_news.md'),
				mocks: [
					{
						description: null,
						data: dataHelper.getFormattedJSON(templateData)
					}
				]
			}
		}, templateData);

module.exports = data;
