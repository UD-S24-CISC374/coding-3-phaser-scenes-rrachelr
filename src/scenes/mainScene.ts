import Phaser from "phaser";
export default class MainScene extends Phaser.Scene {
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    private instructions: Phaser.GameObjects.Text;


    constructor() {
        super({ key: "MainScene" });
    }

    create(money: Array<number>) {
        const message = `Phaser v${Phaser.VERSION}`;
        this.add
            .text(this.cameras.main.width - 15, 15, message, {
                color: "#000000",
                fontSize: "24px",
            })
            .setOrigin(1, 0);

        this.add.image(500, 250, "background").setScale(0.3, 0.3);

        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            400,
            650,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();

        this.platforms.create(900, 650, "ground").setScale(2).refreshBody();

        this.platforms.setVisible(false);

        this.player = this.physics.add.sprite(200, 200, "player").setScale(1.5);
        this.player.setCollideWorldBounds(true);

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

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.instructions = this.add.text(
            16,
            16,
            "Click on a door to go inside!",
            {
                fontSize: "27px",
                color: "black",
            }
        );

        this.add.text(1000, 16, `Money: ${money}`, {
            fontSize: "27px",
            color: "black",
        });

        const door1 = this.add
            .image(126, 530, "door")
            .setScale(0.3)
            .setName("door1")
            .setInteractive().on("pointerdown", () => {
                this.scene.stop("MainScene").launch(door1.name, money)
            });
        const door2 = this.add
            .image(430, 530, "door")
            .setScale(0.3)
            .setName("door2")
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.stop("MainScene").launch(door2.name, money);
            });
        const door3 = this.add
            .image(632, 530, "door")
            .setScale(0.3)
            .setName("door3")
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.stop("MainScene").launch(door3.name, money);
            });
        const door4 = this.add
            .image(850, 530, "door")
            .setScale(0.3);
        door4.setInteractive().on("pointerdown", () => {
            this.instructions.setText("This door is locked, try another.");
        });
        const door5 = this.add
            .image(1160, 530, "door")
            .setScale(0.3);
        door5.setInteractive().on("pointerdown", () => {
               this.instructions.setText("This door is locked, try another.");
        });
        const door6 = this.add
            .image(1250, 530, "door")
            .setScale(0.3);
        door6.setInteractive().on("pointerdown", () => {
                this.instructions.setText("This door is locked, try another.");
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
