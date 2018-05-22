// Enemies our player must avoid
var Enemy = function(x = -100, y = 50) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 5;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x = 0, y = 0, sprite = 'images/char-cat-girl.png') {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
  }
  getSprite() {
    return this.sprite;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  update() {}

  render() {}

  handleInput() {}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for (i = 0, j=50; i < 3; i++, j += 80) {
  const enemy = new Enemy(-100, j);
  allEnemies[i] = enemy;
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
