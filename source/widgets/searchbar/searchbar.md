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
	'@id': '#',
	'category': 'training',
	'template': 'livesearch',
	'categoryUrl': '#',
	'categoryTitle': 'Weiterbildung',
	'categoryUrlText': 'Alle anzeigen (12)',
	'items': [
		{
			'@id': '#',
			'@type': 'EduProduct',
			title: 'MAS Sozialmanagement',
			description: 'Lorem Ipsum',
			short_eduproducttype: 'MAS'
		},
		{
			'@id': '#',
			'@type': 'EduProduct',
			'title': 'DAS Eingliederungsmanagement',
			description: 'Lorem Ipsum',
			short_eduproducttype: 'MAS'
		},
		{
			'@id': '#',
			'@type': 'EduProduct',
			'title': 'CAS Forschung in den Sozialwissenschaften',
			description: 'Lorem Ipsum',
			short_eduproducttype: 'MAS'
		},
	],
	'items_total': 206
};
```
