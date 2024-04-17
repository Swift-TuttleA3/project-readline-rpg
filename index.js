
import chalk from 'chalk';
import readline from 'readline-sync';

let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting = 0;
let monsterHealth;
let inventory = ['staff'];



const weapons = [
  { name: 'staff', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'sword', power: 50 },
  { name: 'thor`s hammer', power: 100 }
];

const angriffe = ['fireball', 'icestorm', 'thunderstrike', 'brainsmasher', 'headsmasher'];
class Monster {
    constructor(name, spezialAngriff, health, level) {
        this.name = name;
        this.spezialAngriff = spezialAngriff;
        this.health = health;
        this.level = level;
    }
    static generateMonsterName() {
        const nameSegments = [
            ['bex', 'zig', 'fluff', 'quirk', 'fizz', 'snicker', 'waldo', 'glimmer', 'noodle', 'bumble'],
            ['blitz', 'wobble', 'sprocket', 'whisker', 'muffin', 'doodle', 'pickle', 'bumblebee', 'nugget', 'sizzle'],
            ['fizzle', 'whiz', 'crinkle', 'whisk', 'zap', 'flap', 'zing', 'crackle', 'pop', 'buzz'],
            ['schmorr', 'schmiert', 'schmuck', 'schmoo', 'schmizz', 'schmoodle', 'schmickle', 'schmumble', 'schmugget', 'schmizzle']
        ];

        const getRandomSegment = (segment) => segment[Math.floor(Math.random() * segment.length)];
        const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

        const name = nameSegments.slice(0, 4).map(segment => capitalize(getRandomSegment(segment))).join('');

        return capitalize(name);
    }
    /*
    objectToString() {
        return `${this.name} (Spezialangriff: ${this.spezialAngriff}, Gesundheit: ${this.gesundheit}, Level: ${this.verteidigung})`;
    }
    */
}


function createMonster() {
    const spezialAngriff = angriffe[Math.floor(Math.random() * angriffe.length)];
    const health = Math.floor(Math.random() * 80) + 20; // zwischen 20 und 80
    const level = Math.floor(Math.random() * 10) + 1; // zwischen 1 und 10

    return new Monster(Monster.generateMonsterName(), spezialAngriff, health, level); 

}

const monster = createMonster();

const monsters = [
  createMonster(),
  createMonster(),
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
    name: chalk.bold.red("The town square of a small and completely random village. "),
    "button text": [chalk.red("Go to store"), chalk.red("Go to cave"), chalk.red("Fight dragon")],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the middle of the cursed village. You see a sign that says \"General-Store\"."
  },
  {
    name: chalk.bold.red("store"),
    "button text": [chalk.red("Buy 10 health (10 gold)"), chalk.red("Buy weapon (30 gold)"), chalk.red("Go back to town square")],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: chalk.bold.red("cave"),
    "button text": [chalk.red("Fight unknown creature"), chalk.red("Fight the other unique creature"), chalk.red("Go back to town square")],
    "button functions": [fightRndMonster1, fightRndMonster2, goTown],
    text: "You enter the cave. You see some monsters. They look dangerous and hungry."
  },
  {
    name: chalk.bold.red("fight"),
    "button text": [chalk.red("Attack"), chalk.red("Dodge"), chalk.red("Run")],
    "button functions": [attack, dodge, goTown],
    text: `You are fighting a ${chalk.blue(monsters[fighting].name)}!`
  },
  {
    name: chalk.bold.red("kill monster"),
    "button text": [chalk.red("Go to town square"), chalk.red("Go to town square"), chalk.red("Go to town square")],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: chalk.bold.red("lose"),
    "button text": [chalk.red("REPLAY?"), chalk.red("REPLAY?"), chalk.red("REPLAY?")],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
  },
  { 
    name: chalk.bold.red("win"), 
    "button text": [chalk.red("REPLAY?"), chalk.red("REPLAY?"), chalk.red("REPLAY?")], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉" 
  },
  {
    name: chalk.bold.red("easter egg"),
    "button text": [chalk.red("2"), chalk.red("8"), chalk.red("Go to town square?")],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

console.log("Welcome to a total common and well known RPG game!");

function update(location) {
  console.log(chalk.bold(location.name));
  console.log(location.text);
  console.log(chalk.yellow("Gold: " + gold));
  console.log(chalk.green("Health: " + health));
  console.log(chalk.blue("XP: " + xp));
  console.log(chalk.gray("Inventory: " + inventory.join(", ")));
  const button1 = chalk.cyan(location["button text"][0]);
  const button2 = chalk.cyan(location["button text"][1]);
  const button3 = chalk.cyan(location["button text"][2]);
  const choice = readline.keyInSelect([button1, button2, button3], chalk.yellow("Choose an action:"));

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
  update(locations[0]); 
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
  update(locations[1]); 
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    let currentWeapon = inventory.shift();
    console.log(chalk.green("You sold a " + currentWeapon + " for 15 gold."));
  } else {
    console.log(chalk.red("Don't sell your only weapon!"));
  }
  update(locations[1]); 
}

function fightRndMonster1() {
  fighting = 0;
  goFight();
}

function fightRndMonster2() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  monsterHealth = monsters[fighting].health;
  update(locations[3]);
}
function attack() {
  console.log(chalk.bold("You are fighting a " + monsters[fighting].name + "!"));
  console.log(chalk.red("Monster Health: " + monsterHealth));
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

  update(locations[3]); 
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
  update(locations[3]); 
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
      update(locations[3]); 
    }
  }
}

goTown();

