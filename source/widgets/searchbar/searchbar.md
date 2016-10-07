## Description



## Integration

Copy HTML.

###Ajax-Call

```json
{
	"q": 'CAS Online-M'
}
```

###Ajax-Response

Anhand des Pitch-Screens für die globale Suche (nicht final!)

```json
var data = {
	'responseHeader': {
		'status': 0,
		'QTime': 5,
		'params': {
			'category': 'training',
			'template': 'livesearch'
		}
	},
	'response':
		{
			'categoryTitle': 'Weiterbildung',
			'categoryUrl': '#',
			'categoryUrlText': 'Alle anzeigen (12)',
			'docs': [
				{
					'type': 'normal',
					'Title': 'MAS Sozialmanagement',
					'path_string': '#'
				},
				{
					'type': 'normal',
					'Title': 'DAS Eingliederungsmanagement',
					'path_string': '#'
				},
				{
					'type': 'normal',
					'Title': 'CAS Forschung in den Sozialwissenschaften',
					'path_string': '#'
				},
				{
					'type': 'normal',
					'Title': 'MAS Sozialmanagement',
					'path_string': '#'
				},
				{
					'type': 'normal',
					'Title': 'DAS Eingliederungsmanagement',
					'path_string': '#'
				},
				{
					'type': 'normal',
					'Title': 'CAS Forschung in den Sozialwissenschaften',
					'path_string': '#'
				}
			]
		}
};
```
