import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("background", "assets/img/background.jpg");
        this.load.image("ground", "assets/img/platform.png")
        this.load.spritesheet("player", "assets/img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        this.scene.start("MainScene");
    }
}
