// Enemies our player must avoid
var Enemy = function(y = 50) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  // helper arrays to list the possible starting points for x and y positions
  this.stepsx = [-503, -402, -302, -201, -100];
  this.stepsy = [240, 157, 74];
  // calculate randomly the place where the enemy starts
  this.yPosition = Math.floor(Math.random() * 4);
  this.xPosition = Math.floor(Math.random() * 5);
  this.x = this.stepsx[this.xPosition];
  this.y = this.stepsy[this.yPosition];

  this.sprite = 'images/enemy-bug.png';
  // indicates the width and height of an enemy
  this.width = 50;
  this.height = 70;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // checks if the enemy reached the end of the screen
  // if it did it will return to the start
  if (this.x > 505) {
    this.yPosition = Math.floor(Math.random() * 4);
    this.xPosition = Math.floor(Math.random() * 5);
    this.y = this.stepsy[this.yPosition];
    this.x = this.stepsx[this.xPosition];
  } else {
    this.x += (Math.random() * 500 + 1) * dt;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(sprite = 'images/char-cat-girl.png') {
    this.sprite = sprite;
    // helper arrays of the steps available for the player
    this.stepsx = [1, 102, 203, 304, 405];
    this.stepsy = [406, 323, 240, 157, 74, -9];
    // sets starting point for the player
    this.xPosition = 2;
    this.yPosition = 0;
    this.x = this.stepsx[this.xPosition];
    this.y = this.stepsy[this.yPosition];
    this.width = 90;
    this.height = 70;
  }

  // resets back the player position
  resetPosition() {
    this.xPosition = 2;
    this.yPosition = 0;
    this.x = this.stepsx[this.xPosition];
    this.y = this.stepsy[this.yPosition];
  }

  // gets direction from handle input and update the player's position accordingly
  update(direction) {
    let finishGame = false;
    // checks if we reached the end point for the game and if so set finishGame to true;
    if (this.yPosition == this.stepsy.length - 1) {
      finishGame = true;
    }
    switch (direction) {
      case 'up':
      this.yPosition++;
      this.y = this.stepsy[this.yPosition];
      break;
      case 'down':
      this.yPosition--;
      this.y = this.stepsy[this.yPosition];
      break;
      case 'right':
      this.xPosition++;
      this.x = this.stepsx[this.xPosition];
      break;
      case 'left':
      this.xPosition--;
      this.x = this.stepsx[this.xPosition];
      break;
    }
    if (finishGame) {
      alert('you win!');
      player.resetPosition();
    }
  }

  // renders the player image
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyCode) {
    // return direction into update only if it's not taking us outside of the limits
    if (keyCode == 'up' && this.yPosition + 1 < this.stepsy.length) {
      this.update(keyCode);
    }
    if (keyCode == 'down' && this.yPosition - 1 >= 0) {
      this.update(keyCode);
    }
    if (keyCode == 'right' && this.xPosition + 1 < this.stepsx.length) {
      this.update(keyCode);
    }
    if (keyCode == 'left' && this.xPosition - 1 >= 0) {
      this.update(keyCode);
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for (i = 0, j=50; i < 3; i++, j += 80) {
  for(n = 0; n < 2; n++) {
    const enemy = new Enemy(j);
    allEnemies.push(enemy);
  }
}

const player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
