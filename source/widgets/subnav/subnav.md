## Description

Due Unternavigation die auf den einzelnen Seiten optional ist. Mobile Ansicht befindet sich unter dem Page-Content auf Desktop befindet es sich daneben.

## Integration

HTML und JS einbauen. 

### Fields

* **title**: String, Titel für das Widget (optional)
* **logo**: Pfad zum Logo / beliebigem Bild (optional)
* **titleUrl**: String, wohin soll der Titel verlinken (Übergeordnete Seite)
* **subtitle**: Subtitel, String (optional)
* **entries**: Array, Array mit den einzelnen Navigationseinträgen
	* **title**: String, Listeneintragstitel,
	* **url**: String, URL zur darzugehörigen Seite,
	* **isBack**: Boolean, ob der Link der "zurück" link ist. 
