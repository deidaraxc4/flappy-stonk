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
    accountValueText;

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
        this.accountValueText = this.add.text(330, 15, "Account Value $0");
        this.accountValueText.setDepth(1);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.rocket.setScale(0.15, 0.15);
        this.rocket.body.setGravityY(500);
        this.rocket.setCollideWorldBounds(true);
    

        // event loops
        this.time.addEvent({
            delay: 1600,
            callback: this.#addNewRowOfPipes,
            callbackScope: this,
            loop: true,
        });

        this.time.addEvent({
            delay: 1,
            callback: this.#updateScore,
            callbackScope: this,
            loop: true,
        });
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            console.log("im spacebar");
            this.rocket.setVelocityY(-250);
        }

        // game over
        this.physics.overlap(this.rocket, this.pipes, () => {
            console.log("touched pipe, dead")
            this.scene.pause();
        }, null, this);
    }

    #addPipe(x, y) {
        this.pipes.add(new Pipe({scene: this, x: x, y: y, key: "greenBox"}));
    }

    #addNewRowOfPipes() {
        let hole = Math.floor(Math.random() * 7) + 1;

        for (let i = 0; i < 13; i++) {
            if (i !== hole && i !== hole + 1 && i !== hole + 2) {
              if (i === hole - 1) {
                this.#addPipe(800, i * 50, 0);
              } else if (i === hole + 3) {
                this.#addPipe(800, i * 50, 1);
              } else {
                this.#addPipe(800, i * 50, 2);
              }
            }
        }
    }

    #updateScore() {
        this.registry.values.score += 10;
        this.accountValueText.setText(`Account Value $${this.registry.values.score}`);
    }
}


const gameScene = new GameScene();


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ GameScene ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);