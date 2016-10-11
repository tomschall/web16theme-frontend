## Description

Eine Mischung zwischen Accorden und Anmeldetool. Zeigt die Möglichkeiten für die Teilnahme an CAS-Kurs teil.

## Integration

HTML und JS werden benötigt. Keine speziellen Integrationsanforderungen.

### Fields

* **uid**: Unique-ID zur Identifikation des Kurses
* **eventStart**: Datum des Kursstartes
* **eventLocation**: Durchführungsort
* **availableSeats**: Anzahl verfügbare und verbleibende Plätze (optional)
* **availabilityState**: Aktueller Status (state-red oder state-green)
* **informationEntries**: Liste der Detailinformationseinträge
    * **label**: Label für den Detaileintrag (z.B. Start- und Endtermin)
    * **text**: Content für den Detaileintrag
    * **iCalURL**: URL zum iCal-File
