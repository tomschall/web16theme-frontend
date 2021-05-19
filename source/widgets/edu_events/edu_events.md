## Description

Sidebar-Item mit der Übersicht der Info-Veranstaltungen

## Integration

HTML und JS einbauen. Wird unabhängig eingefügt für Mobile Ansicht, funktioniert aber auf Desktop nur wenn es in der Sidebar korrekt ist.

### Fields

* **button**: Objekt mit Informationen zum Button
	* **text**: Button-Label
	* **url**: Hash-Url zum Infoveranstaltungs Modul
* **title**: Titel
* **entries**: Array mit den Info-Veranstaltungsobjekten die hier angezeigt werden sollen
	* **title**: String, Titel der Veranstaltung
	* **dateTime**: String, Datum und Uhrzeit der Veranstaltung
	* **location**: String, Durchführungsort
	* **url**: String, URL zur Veranstaltungsseite
