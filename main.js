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


class GameScene extends Phaser.Scene {
    rocket;
    pipes;
    spacebar;

    constructor() {
        super("GameScene");
    }

    init() {
        console.log("init");
        this.registry.set("score",-1)
    }

    preload() {
        console.log("preloading");
        this.load.image('rocket', 'assets/rockets.png');
        this.load.image('greenBox', 'assets/GreenBox.png');
    }

    create() {
        console.log("create");
        this.rocket = this.physics.add.image(100,300,'rocket');
        this.pipes = this.add.group({ classType: Pipe });
        this.#addPipe(800,80);
        this.rocket.setScale(0.15, 0.15);
    
        this.rocket.setCollideWorldBounds(true);
    
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            console.log("im spacebar");
            this.rocket.setVelocityY(-300);
        }
    }

    #addPipe(x, y) {
        this.pipes.add(new Pipe({scene: this, x: x, y: y, key: "greenBox"}));
    }

    #addNewRowOfPipes() {
        // update score
        this.registry.values.score += 1;
    }
}


const gameScene = new GameScene();


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ GameScene ],
    // scene: {
    //     init: init,
    //     preload: preload,
    //     create: create,
    //     update: update,
    // },
    // scene: [ MenuScene, MainScene ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    }
};

const game = new Phaser.Game(config);
let pipes;

let rocket;
//TODO convert all this to a class scene
function init() {
    console.log("init");
    this.registry.set("score",-1)
}

function preload() {
    console.log("preloading");
    this.load.image('rocket', 'assets/rockets.png');
    this.load.image('greenBox', 'assets/GreenBox.png');
};

function addPipe(scene, x, y) {
    pipes.add(new Pipe({scene: scene, x: x, y: y, key: "greenBox"}));
    console.log("here!")
    // pipes.create(x,y,"greenBox")
}

function addNewRowOfPipes() {
    // update score
    this.registry.values.score += 1;
}

function create() {
    console.log("create");
    rocket = this.physics.add.image(100,300,'rocket');
    pipes = this.add.group({ classType: Pipe });
    addPipe(this,800,60)
    // pipes.add(new Pipe({scene: this, x: 800, y: 60, key: "greenBox"}));
    // pipes = this.physics.add.group();
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
