# Einleitung

    Dieser Code ist Teil eines Rollenspiels (RPG), in dem der Spieler gegen Monster kämpft, Gold sammelt und Erfahrungspunkte (XP) erhält. Der Spieler kann auch Waffen kaufen und verkaufen und seine Gesundheit verbessern.

        Start: 
        $ node index.js

        Abbruch:
        Taste "0" 

## Aufgabenstellung

    Erstellung eines Codebeispiels für die Verwendung von Variablen, Klassen, Objekte, Arrays, Schleifen und Callback-Funktionen.

## Eingesetzte Methoden und Funktionsweise

    - update Funktion aktualisiert die aktuelle Position des Spielers und zeigt die relevanten Informationen an. Sie nimmt einen Ort als Parameter und gibt den Namen des Ortes, den Text des Ortes, die Menge an Gold, Gesundheit, XP und das Inventar des Spielers aus. Sie zeigt auch die verfügbaren Aktionen an und lässt den Spieler eine Aktion auswählen. Die ausgewählte Aktion wird dann ausgeführt.

    - sellWeapon Funktion ermöglicht es dem Spieler, eine Waffe zu verkaufen, wenn er mehr als eine hat. Der Spieler erhält 15 Gold für den Verkauf und die Waffe wird aus dem Inventar entfernt. Danach wird die Position des Spielers aktualisiert.

    - goFight Funktion startet einen Kampf gegen ein Monster. Sie aktualisiert die Position des Spielers und setzt die Gesundheit des Monsters auf den Gesundheitswert des aktuellen Monsters. Sie gibt auch aus, gegen welches Monster der Spieler kämpft und wie viel Gesundheit das Monster hat.

    - getMonsterAttackValue Funktion berechnet den Schadenswert, den ein Monster verursacht, basierend auf seinem Level und den XP des Spielers. Sie gibt einen Wert zurück, der größer als 0 ist.

    - isMonsterHit Funktion bestimmt, ob ein Monster getroffen wird. Sie gibt true zurück, wenn eine zufällige Zahl größer als 0,2 ist oder wenn die Gesundheit des Spielers unter 20 ist.

    - lose Funktion wird aufgerufen, wenn der Spieler stirbt. Sie gibt eine Nachricht aus, dass der Spieler gestorben ist, und aktualisiert die Position des Spielers.

    - winGame Funktion wird aufgerufen, wenn der Spieler das Spiel gewinnt, d.h. wenn er den Drachen besiegt. Sie gibt eine Siegesnachricht aus und aktualisiert die Position des Spielers.

    - generateMonsterName Funktion erstellt einen zufälligen Namen für ein Monster, indem sie zufällige Segmente aus einer Liste von Namen auswählt und sie zusammenfügt.

    - createMonster Funktion erstellt ein Monster mit einem zufälligen Spezialangriff, Gesundheitswert und Level. Sie gibt das erstellte Monster zurück.

    - Die Monster-Klasse repräsentiert ein Monster im Spiel. Sie hat Eigenschaften wie Name, Spezialangriff, Gesundheit und Level. Sie hat auch eine statische Methode generateMonsterName, die einen zufälligen Namen für ein Monster generiert.


