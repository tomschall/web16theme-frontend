## Description

Widget welches ein Dropdown mit den Kompetenzfeldern der FHNW hat. Bei einer Auswahl eines Kompetenzfeldes wird auf die dazugehörige Landingpage verweist (automatisch weitergeleitet)

## Integration

HTML und JS integrieren. Das Value eines Kompetenzfeldes muss einem Teil der Landing-Page URL enthalten. Die Seite auf die weiterverlinkt wird ist wie folgt: <br/>
landingpageURL + value des ausgewählten Kompetenzbereichs

### Fields
* **title**: Titel des Widgets
* **text**: Text der angezeigt werden soll
* **link**: Informationen zum Alle-Ansehen Link
    * **url**: Die URL zur Übersichtseite mit allen Kompetenzbereichen
    * **title**: Das Link-label
* **landingpageURL**: Beginn der landingpageURL, zusammen mit dem value wird die korrekte Seite aufgerufen
