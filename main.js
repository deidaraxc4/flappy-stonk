const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    }
};

const game = new Phaser.Game(config);

let rocket;

// first hook
function preload () {
    console.log("preloading");
    this.load.image('rocket', 'assets/rockets.png');
};


// second hook
function create() {
    console.log("create");
    rocket = this.physics.add.image(100,300,'rocket');
    rocket.setScale(0.15, 0.15);

    rocket.setCollideWorldBounds(true);

    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};

// This method is called once per game step while the scene is running.
function update() {
    if(Phaser.Input.Keyboard.JustDown(spacebar)) {
        console.log("im spacebar")
        rocket.setVelocityY(-300)
    }
};
