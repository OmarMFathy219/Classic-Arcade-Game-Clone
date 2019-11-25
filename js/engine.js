var Engine = (function (global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 707;
    canvas.height = 689;
    doc.body.appendChild(canvas);


    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;


        update(dt);
        render();


        lastTime = now;


        win.requestAnimationFrame(main);
    }


    function init() {
        reset();
        lastTime = Date.now();
        main();
    }


    function update(dt) {
        updateEntities(dt);
    }


    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {

        var rowImages = [
                'images/water-block.png', // Top row is water
                'images/stone-block.png', // Row 1 of 5 of stone
                'images/stone-block.png', // Row 2 of 5 of stone
                'images/stone-block.png', // Row 3 of 5 of stone
                'images/stone-block.png', // Row 4 of 5 of stone
                'images/stone-block.png', // Row 5 of 5 of stone
                'images/grass-block.png' // Bottom row is grass
            ],
            numRows = 7,
            numCols = 7,
            row, col;


        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {

                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }


    function renderEntities() {

        allEnemies.forEach(function (enemy) {
            enemy.render();
        });


        allGems.forEach(function (gem) {
            gem.render();
        });

        player.render();
    }


    function reset() {

    }


    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/green-enemy-bug.png',
        'images/purple-enemy-bug.png',
        'images/blue-gem.png',
        'images/green-gem.png',
        'images/orange-gem.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);


    global.ctx = ctx;
})(this);