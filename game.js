// Create a Phaser game object
var game = new Phaser.Game(
    800, 600,
    Phaser.AUTO, '',
    { preload: preload, create: create, update: update }
  );
  
  // Load game assets
  function preload() {
    game.load.image('snake', 'assets/snake.png');
    game.load.image('body', 'assets/body.png');
    game.load.image('food', 'assets/food.png');
  }
  
  // Create game objects
  var player;
  var snakeBody = [];
  var cursors;
  var foodGroup;
  
  function create() {
    // Set up game physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
  
    // Create player snake
    player = game.add.sprite(400, 300, 'snake');
    player.anchor.set(0.5);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
  
    // Set up player movement
    cursors = game.input.keyboard.createCursorKeys();
  
    // Create food group and spawn initial food
    foodGroup = game.add.group();
    for (var i = 0; i < 20; i++) {
      spawnFood();
    }
  }
  
  function update() {
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
    if (cursors.up.isDown) {
      player.body.velocity.y = -150;
    }
    else if (cursors.down.isDown) {
      player.body.velocity.y = 150;
    }
    else {
      player.body.velocity.y = 0;
    }
  
    // Check for collision with food
    game.physics.arcade.overlap(player, foodGroup, function(player, food) {
      food.destroy();
      spawnFood();
      addBodyPart();
    });
  
    // Move snake body parts
    for (var i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i].x = snakeBody[i-1].x;
      snakeBody[i].y = snakeBody[i-1].y;
    }
    if (snakeBody.length > 0) {
      snakeBody[0].x = player.x + 20;
      snakeBody[0].y = player.y;
    }
  }
  
  // Spawn a new piece of food at a random location
  function spawnFood() {
    var foodX = Math.floor(Math.random() * 700) + 50;
    var foodY = Math.floor(Math.random() * 500) + 50;
    var food = game.add.sprite(foodX, foodY, 'food');
    food.anchor.set(0.5);
    game.physics.arcade.enable(food);
    foodGroup.add(food);
  }
  
// Add a new body part to the snake
function addBodyPart() {
    var newBodyPart = game.add.sprite(-100, -100, 'body');
    newBodyPart.anchor.set(0.5);
    snakeBody.push(newBodyPart);

    // Position new body part behind the head
    var lastIndex = snakeBody.length - 1;
    newBodyPart.x = snakeBody[lastIndex].x + 20;
    newBodyPart.y = snakeBody[lastIndex].y + 20;
}
  