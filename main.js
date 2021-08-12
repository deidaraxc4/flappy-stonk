const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

const game = new Phaser.Game(config);

// first hook
function preload () {
    console.log("preloading")
};


// second hook
function create() {
    console.log("create")
};

// This method is called once per game step while the scene is running.
function update() {
    // console.log("updating")
};
