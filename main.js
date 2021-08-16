class MenuScene extends Phaser.Scene {
    constructor () {
        super("MenuScene");
    }

    preload () {
        console.log("preloading in menu scene")
    }

    create() {
        this.add.text(350, 300, "hello from menu")
        const rect = new Phaser.Geom.Rectangle(300,200,80,40)
        const graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
        graphics.fillRectShape(rect)

        this.input.on('pointerdown', (pointer) => {
            if(rect.contains(pointer.x, pointer.y)) {
                console.log('rect clicked')
                this.scene.start('MainScene')
            }
        })
    }
}

class MainScene extends Phaser.Scene {
    constructor () {
        super("MainScene");
    }

    preload () {
        console.log("preloading in main scene")
    }

    create() {
        this.add.text(350, 300, "hello from main")
        const rect = new Phaser.Geom.Rectangle(300,200,80,40)
        const graphics = this.add.graphics({ fillStyle: { color: 0xFF0000 } });
        graphics.fillRectShape(rect)

        this.input.on('pointerdown', (pointer) => {
            if(rect.contains(pointer.x, pointer.y)) {
                console.log('rect clicked')
                this.scene.start('MenuScene')
            }
        })
    }
}



const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // scene: {
    //     preload: preload,
    //     create: create,
    //     update: update,
    // },
    scene: [ MenuScene, MainScene ],
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

function preload () {
    console.log("preloading");
    this.load.image('rocket', 'assets/rockets.png');
    this.load.image('greenBox', 'assets/GreenBox.png');
};


function create() {
    console.log("create");
    rocket = this.physics.add.image(100,300,'rocket');
    rocket.setScale(0.15, 0.15);

    rocket.setCollideWorldBounds(true);

    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};


function update() {
    if(Phaser.Input.Keyboard.JustDown(spacebar)) {
        console.log("im spacebar");
        rocket.setVelocityY(-300);
    }
};
