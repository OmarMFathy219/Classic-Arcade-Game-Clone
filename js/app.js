/**
 * @description 
 * @constructor
 * @param {number} x 
 * @param {number} y 
 * @param {number} speed
 * @param {string} sprite 
 */
var Enemy = function (x, y, speed, sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
};

/**
 * @description 
 * @param {number} dt 
 */
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var allEnemies = [];

var createEnemyDelay = 3000;

(function createEnemy() {
    var row = (getRandomNumber(1, 5) * 83) - 24;
    var speed = getRandomNumber(100, 550);
    var sprite;
    if (speed <= 250) {
        sprite = 'images/enemy-bug.png';
    } else if (speed >= 251 && speed <= 400) {
        sprite = 'images/green-enemy-bug.png';
    } else {
        sprite = 'images/purple-enemy-bug.png';
    }
    var enemy = allEnemies.push(new Enemy(-100, row, speed, sprite));
    setTimeout(createEnemy, createEnemyDelay);
})();

/**
 * @description 
 * @constructor
 * @param {number} x 
 * @param {number} y 
 * @param {string} sprite 
 */
var Gem = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allGems = [];

function createGems() {
    for (var i = 0; i < 3; i++) {
        var col = getRandomNumber(0, 6) * 101;
        var row = (getRandomNumber(1, 5) * 83) - 24;
        if (i === 0) {
            sprite = 'images/blue-gem.png';
        } else if (i === 1) {
            sprite = 'images/green-gem.png';
        } else {
            sprite = 'images/orange-gem.png';
        }
        var gem = allGems.push(new Gem(col, row, sprite));
    }
}

createGems();

/**
 * @description 
 * @constructor
 * @param {number} x 
 * @param {number} y 
 */
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.level = 1;
    this.score = 0;
    this.gems = 0;
};

Player.prototype.reset = function () {
    this.x = 303;
    this.y = 487;
    var enemiesArrayLength = allEnemies.length;
    for (var i = 0; i < enemiesArrayLength; i++) {
        allEnemies.pop();
    }
    var gemsArrayLength = allGems.length;
    for (var x = 0; x < gemsArrayLength; x++) {
        allGems.pop();
    }
    createGems();
};

/**
 * @description 
 * @param {array} target 
 * @param {number} yAlpha 
 * @param {number} wid 
 * @param {number} hgt 
 * @this Player
 * @returns {boolean} 
 */
Player.prototype.checkCollision = function (target, yAlpha, wid, hgt) {
    for (var i = 0; i < target.length; i++) {
        if (this.x + 85 > target[i].x &&
            this.x + 17 < target[i].x + wid &&
            this.y + 140 > target[i].y + yAlpha &&
            this.y + 63 < target[i].y + yAlpha + hgt) {
            target[i].y += 1000;
            return true;
        }
    }
};

Player.prototype.update = function () {
    if (this.y === -11) {
        this.level += 1;
        this.score += 100;
        if (createEnemyDelay > 200) {
            createEnemyDelay -= 100;
        }
        this.reset();
    }
    if (this.checkCollision(allEnemies, 77, 98, 66) === true) {
        this.level = 1;
        this.score = 0;
        this.gems = 0;
        createEnemyDelay = 3000;
        this.reset();
    }
    if (this.checkCollision(allGems, 77, 58, 66) === true) {
        this.score += 20;
        this.gems += 1;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '16pt Chango';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('Level: ' + this.level, 70, 80);
    ctx.fillText('Score: ' + this.score, 353, 80);
    ctx.fillText('Gems: ' + this.gems, 630, 80);
};

Player.prototype.handleInput = function (direction) {
    if (direction === 'up') {
        this.y -= 83;
    } else if (direction === 'down' && this.y < 487) {
        this.y += 83;
    } else if (direction === 'left' && this.x > 0) {
        this.x -= 101;
    } else if (direction === 'right' && this.x < 606) {
        this.x += 101;
    }
};

var player = new Player(303, 487);

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

function toggleRules() {
    var rulesDiv = document.getElementById('rules');
    if (rulesDiv.style.display === 'block') {
        rulesDiv.style.display = 'none';
    } else {
        rulesDiv.style.display = 'block';
    }
}