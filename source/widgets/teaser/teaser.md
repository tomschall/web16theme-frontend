## Description

Teaser mit/ohne Bilder. Können in verschiedenen Varianten angezeigt werden

## Integration

HTML und JS einabuen. Sonst keine speziellen Integrationanforderungen

### Fields

* **teasers**: Array, mit den einzelnen Teasers,
	* **img**: Objekt, Bild des Teasers (optional)
	* **date**: String, Datum (optional)
	* **projectTime**: String, Projektdauer bei Projektreferenzen (optional)
	* **category**: String, Kategorie (optional)
	* **title**: String, Titel
	* **text**: String, Text zum Teaser, wird automatisch auf 160 Zeichen reduziert
* **moreButton**: Objekt, mit Infos zum zusätzlichen Button (optional)
	* **url**: URL zum Button
	* **label**: String, Button-Label
