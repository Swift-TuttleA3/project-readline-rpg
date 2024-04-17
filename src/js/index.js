/*
Dieser Code ist Teil eines Rollenspiels (RPG), in dem der Spieler gegen Monster kämpft, Gold sammelt und Erfahrungspunkte (XP) erhält. Der Spieler kann auch Waffen kaufen und verkaufen und seine Gesundheit verbessern.

- update Funktion aktualisiert die aktuelle Position des Spielers und zeigt die relevanten Informationen an. Sie nimmt einen Ort als Parameter und gibt den Namen des Ortes, den Text des Ortes, die Menge an Gold, Gesundheit, XP und das Inventar des Spielers aus. Sie zeigt auch die verfügbaren Aktionen an und lässt den Spieler eine Aktion auswählen. Die ausgewählte Aktion wird dann ausgeführt.

- sellWeapon Funktion ermöglicht es dem Spieler, eine Waffe zu verkaufen, wenn er mehr als eine hat. Der Spieler erhält 15 Gold für den Verkauf und die Waffe wird aus dem Inventar entfernt. Danach wird die Position des Spielers aktualisiert.

- goFight Funktion startet einen Kampf gegen ein Monster. Sie aktualisiert die Position des Spielers und setzt die Gesundheit des Monsters auf den Gesundheitswert des aktuellen Monsters. Sie gibt auch aus, gegen welches Monster der Spieler kämpft und wie viel Gesundheit das Monster hat.

- getMonsterAttackValue Funktion berechnet den Schadenswert, den ein Monster verursacht, basierend auf seinem Level und den XP des Spielers. Sie gibt einen Wert zurück, der größer als 0 ist.

- isMonsterHit Funktion bestimmt, ob ein Monster getroffen wird. Sie gibt true zurück, wenn eine zufällige Zahl größer als 0,2 ist oder wenn die Gesundheit des Spielers unter 20 ist.

- lose Funktion wird aufgerufen, wenn der Spieler stirbt. Sie gibt eine Nachricht aus, dass der Spieler gestorben ist, und aktualisiert die Position des Spielers.

- winGame Funktion wird aufgerufen, wenn der Spieler das Spiel gewinnt, d.h. wenn er den Drachen besiegt. Sie gibt eine Siegesnachricht aus und aktualisiert die Position des Spielers.


*/

import chalk from 'chalk';
import readline from 'readline-sync';

console.log("Welcome to the RPG game!");
console.log("To exit the game, press 'x'.");


let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. ☠️"
    },
    { 
        name: "win", 
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
        "button functions": [restart, restart, restart], 
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉" 
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];
function update(location) {
  console.log(chalk.bold(location.name));
  console.log(location.text);
  console.log(chalk.yellow("Gold: " + gold));
  console.log(chalk.green("Health: " + health));
  console.log(chalk.blue("XP: " + xp));
  console.log(chalk.gray("Inventory: " + inventory.join(", ")));

  const button1 = location["button text"][0];
  const button2 = location["button text"][1];
  const button3 = location["button text"][2];
  const choice = readline.keyInSelect([button1, button2, button3], "Choose an action:");

  if (choice === -1) {
    console.log(chalk.red("Game canceled."));
    return;
  }

  location["button functions"][choice]();
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
    console.log(chalk.green("You bought 10 health for 10 gold."));
  } else {
    console.log(chalk.red("You do not have enough gold to buy health."));
  }
  update(locations[0]); // Update the location after the action
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      let newWeapon = weapons[currentWeapon].name;
      console.log(chalk.green("You bought a " + newWeapon + " for 30 gold."));
      inventory.push(newWeapon);
    } else {
      console.log(chalk.red("You do not have enough gold to buy a weapon."));
    }
  } else {
    console.log(chalk.yellow("You already have the most powerful weapon!"));
    const sellChoice = readline.keyInYN("Do you want to sell your weapon for 15 gold?");
    if (sellChoice) {
      sellWeapon();
    }
  }
  update(locations[1]); // Update the location after the action
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    let currentWeapon = inventory.shift();
    console.log(chalk.green("You sold a " + currentWeapon + " for 15 gold."));
  } else {
    console.log(chalk.red("Don't sell your only weapon!"));
  }
  update(locations[1]); // Update the location after the action
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
  console.log(chalk.bold("You are fighting a " + monsters[fighting].name + "!"));
  console.log(chalk.red("Monster Health: " + monsterHealth));
}
function attack() {
  console.log(chalk.bold("You attack the " + monsters[fighting].name + " with your " + weapons[currentWeapon].name + "!"));

  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    console.log(chalk.green("You hit the " + monsters[fighting].name + " for " + (weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1) + " damage!"));
  } else {
    console.log(chalk.yellow("You miss the " + monsters[fighting].name + "!"));
  }

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }

  if (Math.random() <= .1 && inventory.length !== 1) {
    const brokenWeapon = inventory.pop();
    currentWeapon--;
    console.log(chalk.red("Your " + brokenWeapon + " breaks!"));
  }

  update(locations[3]); // Update the fight location after each action
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}
function dodge() {
  console.log(chalk.bold("You dodge the attack from the " + monsters[fighting].name + "!"));
  update(locations[3]); // Update the fight location after dodging
}

function defeatMonster() {
  const monsterLevel = monsters[fighting].level;
  const monsterGold = Math.floor(monsterLevel * 6.7);
  const monsterXP = monsterLevel;

  gold += monsterGold;
  xp += monsterXP;

  console.log(chalk.green("You defeated the " + monsters[fighting].name + "!"));
  console.log(chalk.yellow("You gained " + monsterGold + " gold and " + monsterXP + " XP."));

  update(locations[4]);
}

function lose() {
  console.log(chalk.red("You died. ☠️"));
  update(locations[5]);
}

function winGame() {
  console.log(chalk.green("You defeated the dragon! YOU WIN THE GAME! 🎉"));
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  console.log(chalk.green("Game restarted."));
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  console.log(chalk.bold("You picked " + guess + ". Here are the random numbers:"));
  numbers.forEach(number => console.log(number));

  if (numbers.includes(guess)) {
    gold += 20;
    console.log(chalk.green("Right! You win 20 gold!"));
  } else {
    health -= 10;
    console.log(chalk.red("Wrong! You lose 10 health!"));
    if (health <= 0) {
      lose();
    } else {
      update(locations[3]); // Update the fight location after each action
    }
  }
}

goTown();
