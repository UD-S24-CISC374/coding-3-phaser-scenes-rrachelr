import Phaser from "phaser";

export default class thirdScene extends Phaser.Scene {
    private player: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private wallet: Phaser.GameObjects.Text;
    exit: Phaser.GameObjects.Rectangle;

    constructor() {
        super({ key: "door1" });
    }

    preload() {
        this.load.image("shop", "assets/img/shop.jpg");
        this.load.spritesheet("player", "assets/img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create(money: Array<number>) {
        const background = this.add.image(600, 300, "shop");
        background.setScale(0.7);

        this.player = this.physics.add.sprite(200, 200, "player").setScale(1.5);
        this.player.setCollideWorldBounds(true);

        this.wallet = this.add.text(1000, 16, `Money: ${money}`, {
            fontSize: "27px",
            color: "black",
        });

        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            400,
            700,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();

        this.platforms.create(900, 700, "ground").setScale(2).refreshBody();

        this.platforms.setVisible(false);

        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "player", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.exit = this.add.rectangle(50, 50, 50, 50, 0x000000);
        this.exit.setInteractive().on("pointerdown", () => {
            this.exit.setVisible(false);
            this.scene.stop("door1").launch("MainScene", money);
        });

        this.add
            .rectangle(520, 300, 200, 100, 0x73e600)
            .setInteractive()
            .on("pointerdown", () => {
                if(money[0] > 0){
                    money[0] = money[0] - 50;
                    this.wallet.setText(`Money: ${money}`);
                }
            });

        this.add.text(451, 270, "Shop", {
            fontSize: "60px",
            color: "black",
        });
    }

    update() {
        if (!this.cursors) {
            return;
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn");
        }
    }
}
