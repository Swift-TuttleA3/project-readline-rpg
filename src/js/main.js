let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon,
  startingWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector("#button1"); //Das erste Element mit der ID button1 wird in der Variable button1 gespeichert
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text"); //Das erste Element mit der ID text wird in der Variable text gespeichert
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const invSlot = document.querySelector("#invSlot");

const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
]; //Array mit Waffen und deren Werten
const monsters = [
  { name: "slime", level: 2, health: 20 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 },
]; //Array mit Monstern und deren Werten
const charClasses = [
  {
    name: "warrior",
    str: 10,
    dex: 5,
    con: 10,
    int: 5,
    wis: 5,
    cha: 5,
    health: 100,
  },
  {
    name: "mage",
    str: 5,
    dex: 5,
    con: 5,
    int: 10,
    wis: 10,
    cha: 5,
    health: 80,
  },
  {
    name: "rogue",
    str: 5,
    dex: 10,
    con: 5,
    int: 5,
    wis: 5,
    cha: 10,
    health: 90,
  },
]; //Array mit Klassen und deren Werten

const locations = [
  {
    name: "town square",
    "button text": ["Tante Emma-Laden", "Zur Höhle", "Drachen grillen"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "10Pkt. Gesundheit (10 gold)",
      "Verbesserte Waffe (30 gold)",
      "Zurück zum Dorfplatz",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Schleim bekämpfen", "Böses Biest!", "Schwanz einziehen"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function chooseChar() {
  let vorName = prompt("Vorname: ");
  let nachName = prompt("Nachname: ");
  return vorName + " " + nachName;
}

function update(location) {
  monsterStats.style.display = `none`;
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  invSlot.innerText = displayInventory();
  console.log(
    location.name,
    location.text,
    location["button text"],
    location["button functions"],
    button1.innerText,
    button2.innerText,
    button3.innerText,
    button1.onclick,
    button2.onclick,
    button3.onclick,
    invSlot.innerText,
    text.innerHTML,
    monsterStats.style.display
  );
} //Funktion update() mit dem Parameter location wird definiert. Die Funktion aktualisiert die Textausgabe und die Buttons. Die Funktion wird
//später in den anderen Funktionen aufgerufen, um die Textausgabe sowie Text und Funktion der Buttons zu aktualisieren.

function displayInventory() {
  let inventoryText = "Inventory: ";
  for (let i = 0; i < inventory.length; i++) {
    //For-Schleife, die das Inventar durchläuft um die Waffen anzuzeigen
    inventoryText += inventory[i]; //Die Waffe wird an den Text angehängt
    if (i < inventory.length - 1) {
      //Wenn die Waffe nicht die letzte im Inventar ist
      inventoryText += ", "; //Werden ein Komma und ein Leerzeichen an den Text angehängt
    }
  }
  return inventoryText;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    //The currentWeapon variable is the index of the weapons array, but array indexing starts at zero. The index of the last element in an array is one less than the length of the array.
    if (gold >= 30) {
      gold -= 30; //direkt mal 30 Gold abziehen
      currentWeapon++; //Waffe upgraden indem der Zähler (currentWeapon) um 1 erhöht und der Marker im Array auf das nächste Item gesetzt wird
      goldText.innerText = gold; //Goldanzeige aktualisieren
      let newWeapon = weapons[currentWeapon].name; //neue Waffe aus dem Inventar, sprich dem Array (weapons) holen
      text.innerText = "You now have a " + newWeapon + "."; //Textausgabe aktualisieren
      inventory.push(newWeapon); //neue Waffe in das Inventar packen
      text.innerText += " In your inventory you have: " + inventory; //Textausgabe aktualisieren und das Inventar anzeigen
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 Gold"; //Button2 Text ändern
    button2.onclick = sellWeapon; //Button2 Funktion ändern
  }
}
function sellWeapon() {
  if (inventory.length > 1) {
    //Wenn das Inventar mehr als 1 Waffe enthält
    gold += 15; //Gold um 15 erhöhen
    goldText.innerText = gold; //Goldanzeige aktualisieren
    let currentWeapon = inventory.shift(); //Die erste Waffe aus dem Inventar entfernen
    text.innerText = "You sold a " + currentWeapon + "."; //Textausgabe aktualisieren
    text.innerText += " In your inventory you have: " + inventory + "."; //Textausgabe aktualisieren und das Inventar anzeigen
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = `block`;
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsters[fighting].health;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks."; //Textausgabe aktualisieren wenn der Spieler angreift
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + "."; //Textausgabe aktualisieren und die Waffe anzeigen
  health -= getMonsterAttackValue(monsters[fighting].level); //Lebenspunkte des Spielers um den Wert des Angriffs des Monsters reduzieren
  if (isMonsterHit()) {
    //Wenn das Monster getroffen wird (Funktion isMonsterHit() gibt true zurück)
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; //Lebenspunkte des Monsters um den Wert der Waffe des Spielers reduzieren
  } else {
    text.innerText += " You miss."; //Textausgabe aktualisieren wenn der Spieler das Monster verfehlt
  }
  healthText.innerText = health; //Lebenspunkte des Spielers in der Anzeige aktualisieren
  monsterHealthText.innerText = monsterHealth; //Lebenspunkte des Monsters in der Anzeige aktualisieren
  if (health <= 0) {
    //Wenn die Lebenspunkte des Spielers kleiner oder gleich 0 sind
    lose(); //Funktion lose() aufrufen
  } else if (monsterHealth <= 0) {
    //Wenn die Lebenspunkte des Monsters kleiner oder gleich 0 sind
    if (fighting === 2) {
      //Wenn das Monster ein Drache ist
      winGame(); //Funktion winGame() aufrufen
    } else {
      defeatMonster(); //Funktion defeatMonster() aufrufen
    }
  }
  //Use the += operator to add " Your <weapon> breaks.", with a space in front of Your, to the end of text.innerText. Replace <weapon> with the last item in the inventory array using inventory.pop(), which will remove the last item in the array AND return it so it appears in your string.
  if (Math.random() > 0.1 && inventory.length !== 1) {
    //Wenn die Zufallszahl größer als 0.1 ist und das Inventar mehr als 1 Waffe enthält
    text.innerText += " Your " + inventory.pop() + " breaks."; //Textausgabe aktualisieren und die zerbrochene Waffe anzeigen
    currentWeapon--; //Waffe downgraden indem der Zähler (currentWeapon) um 1 verringert und der Marker im Array auf das vorherige Item gesetzt wird
  }
}
function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp); // Der Wert des Angriffs des Monsters wird berechnet indem das Level des Monsters mit 5 multipliziert und von dem Ergebnis eine Zufallszahl zwischen 0 und der Anzahl der Erfahrungspunkte des Spielers abgezogen wird
  return hit > 0 ? hit : 0; //Wenn der Wert des Angriffs des Monsters größer als 0 ist, wird der Wert über den befehl return an die Funktion zurückgegeben, ansonsten 0
}
function isMonsterHit() {
  return Math.random() > 0.5 || health < 20; //Wenn die Zufallszahl größer als 0.5 ist oder die Lebenspunkte des Spielers kleiner als 20 sind, gibt die Funktion true zurück, ansonsten false
}

function dodge() {
  text.innerText =
    "You dodge the attack from the " + monsters[fighting].name + "."; //Textausgabe aktualisieren wenn der Spieler ausweicht
}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7); //Gold um den Wert des Levels des Monsters mal 6.7 erhöhen
  xp += monsters[fighting].level; //Erfahrungspunkte um den Wert des Levels des Monsters erhöhen
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]); //Funktion update() aufrufen und das Array locations an der Stelle 4 übergeben. damit wird die Textausgabe aktualisiert und die Buttons angepasst
}
function lose() {
  update(locations[0]);
}
function winGame() {
  update(locations[6]);
}
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
function easterEgg() {
  update(locations[7]);
}
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
}
function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}
