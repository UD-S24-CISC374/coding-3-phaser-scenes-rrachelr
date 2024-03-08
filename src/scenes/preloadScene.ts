import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    public money: Array<number>
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("background", "assets/img/background.jpg");
        this.load.image("ground", "assets/img/platform.png");
        this.load.spritesheet("player", "assets/img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.image("door", "assets/img/door.png");
    }

    create() {
        this.money = [500]
        this.scene.start("MainScene", this.money);
    }
}
