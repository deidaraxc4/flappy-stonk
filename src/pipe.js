class Pipe extends Phaser.GameObjects.Image {
    constructor(params) {
        super(params.scene, params.x, params.y, params.key)

        this.setScale(1);

        this.scene.physics.world.enable(this);// adds arcade physics body to the game object
        this.body.allowGravity = false;
        this.body.setVelocityX(-200);
        this.body.setSize(50,50);

        this.scene.add.existing(this);
    }
}