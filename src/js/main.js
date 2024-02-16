let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
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
];
const monsters = [
  { name: "slime", level: 2, health: 20 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 },
];
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
    text:  "You die. &#x2620;",
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
  console.log(location.name, location.text, location["button text"], location["button functions"]
  , button1.innerText, button2.innerText, button3.innerText, button1.onclick, button2.onclick, button3.onclick, invSlot.innerText, text.innerHTML, monsterStats.style.display);
}
function displayInventory() {
  let inventoryText = "Inventory: ";
  for (let i = 0; i < inventory.length; i++) {
    inventoryText += inventory[i];
    if (i < inventory.length - 1) {
      inventoryText += ", ";
    }
  }
  return inventoryText
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
      currentWeapon++; //Waffe upgraden indem der Zähler (currentWeapon) um 1 erhöht wird
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
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else { 
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  //Use the += operator to add " Your <weapon> breaks.", with a space in front of Your, to the end of text.innerText. Replace <weapon> with the last item in the inventory array using inventory.pop(), which will remove the last item in the array AND return it so it appears in your string.
  if (Math.random() > 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon --;
  }
}
function getMonsterAttackValue(level) {
  const hit = (level * 5 ) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}
function isMonsterHit() {
  return Math.random() > 0.5 || health < 20;
}

function dodge() {
  text.innerText =
    "You dodge the attack from the " + monsters[fighting].name + ".";
}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function lose() {
  update(locations[0]);
}
function winGame() {
  update(locations[6]);
}
function restart () {
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

}
function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}
