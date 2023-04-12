/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Phaser from 'phaser';
import config from '../utils/config';

export interface GameProps {
  skin: string;
}

const WIDTH = window.screen.availWidth;
const HEIGHT = window.screen.availHeight;

export default function Index(props: GameProps) {
  // Create game objects
  let player: any;
  let snakeBody: any[] = [];
  let cursors: any;
  let foodGroup: any;

  useEffect(() => {
    class Game extends Phaser.Scene {
      constructor() {
        super('GameScene');
      }

      spawnFood() {
        const foodX = Math.floor(Math.random() * HEIGHT);
        const foodY = Math.floor(Math.random() * WIDTH);
        const food = this.add.sprite(foodX, foodY, 'food');
        food.setOrigin(0.5);
        foodGroup.add(food);
      }

      eatFood(player: any, food: any) {
        // food.disableBody(true, true);
        // this.spawnFood();
        // this.addBodyPart();
      }

      // Add a new body part to the snake
      addBodyPart() {
        const newBodyPart = this.add.sprite(-100, -100, 'body');
        newBodyPart.setOrigin(0.5);
        snakeBody.push(newBodyPart);

        // Position new body part behind the head
        const lastIndex = snakeBody.length - 1;
        newBodyPart.x = snakeBody[lastIndex].x;
        newBodyPart.y = snakeBody[lastIndex].y;
      }

      preload() {
        this.load.image('snake', 'assets/snake.png');
        this.load.image('body', 'assets/body.png');
        this.load.image('food', 'assets/food.png');
      }

      create() {
        // Set up game physics
        this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);
        this.physics.world.gravity.y = 0;

        // Create player snake
        player = this.add.sprite(400, 300, 'snake');
        player.setOrigin(0.5);
        this.physics.add.existing(player);
        player.body.setCollideWorldBounds(true);

        // Set up player movement
        cursors = this.input.keyboard.createCursorKeys();

        // Create food group and spawn initial food
        foodGroup = this.physics.add.group();
        for (var i = 0; i < 20; i++) {
          this.spawnFood();
        }

        // Start the game loop
        this.physics.add.overlap(player, foodGroup, this.eatFood);
        this.events.on('update', this.update, this);
      }


      update() {
        // Move player snake
        if (cursors.left.isDown) {
          player.body.velocity.x = -150;
        }
        else if (cursors.right.isDown) {
          player.body.velocity.x = 150;
        }
        else {
          player.body.velocity.x = 0;
        }

        // Check for collision with food
        this.physics.add.overlap(player, foodGroup, this.eatFood, function (player, food) {
          food.destroy(); // @ts-ignore
        }, null, this);

        // Move snake body parts
        for (let i = snakeBody.length - 1; i > 0; i--) {
          snakeBody[i].x = snakeBody[i - 1].x;
          snakeBody[i].y = snakeBody[i - 1].y;
        }
        if (snakeBody.length > 0) {
          snakeBody[0].x = player.x + 20;
          snakeBody[0].y = player.y;
        }
      }
    }

    const loadGame = async () => {
      new Phaser.Game(
        Object.assign(config, {
          scene: [Game]
        })
      );
    };

    loadGame();
  }, []);

  return null;
}
