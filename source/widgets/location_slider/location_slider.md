## Description

Der Slider mit den Locations, kann neben Locations auch theoretisch Inhalt erhalten. Dies wurde aber im Design bisher nicht vorgesehen und ist daher im Frontend auch nicht gestyled.

## Integration

HTML und JS integrieren. Funktionert mit slick.js-Slider, wie Startseiten Carousel

### Fields

* **marker**: String mit Pfadangabe des Markers
* **oneMapOnly**: Boolean (true/false) falls auf true, werden die einzelnen auf eine Karte gesetzt und nicht auf x-verschiedene Karten
* **locationTitle**: Der Title für das Widget
* **locationDescription**: Zusätzlicher Beschreibungstext
	* **type**: String, bisher nur «location» vorgesehen
	* **title**: Titel für den Standort wird in der Info Box des Standorts angezegit
	* **navTitle**: Wird in der Navigationsleiste angezeigt
	* **address**: Objekt mit den Informationen zur Addresse
		* **name**: Name der Adresse (1. Adresszeile)
		* **department**: Abteilung (2. Adresszeile)
		* **street**: Strasse und Ort
		* **zipCity**: PLZ und Ort
	* **contactData**: Objekt mit den Kontaktdaten
		* **telephone**: Telefonnummer des Standorts
		* **email**: E-Mail-Adresse des Standorts
	* **locationPageURL**: Link zur Standort-Seite auf fhnw.ch
	* **routeURL**: Die URL auf maps.google.ch, welche Route mit Ziel FHNW bereits ausgewählt ist.
	* **coordinates**: Objekt mit den x und y Koordinaten
		* **x/y**: x und y Koordinaten
