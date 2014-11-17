var FrogAdventures = FrogAdventures || {};

//title screen
FrogAdventures.level1 = function(){

	var player;
	var ground;
	var platforms;
	var cursors;

	var flies;
	var score = 0;
	var scoreText;
};

FrogAdventures.level1.prototype = {
	
	create: function() {
		// create background
		game.add.sprite(0, 0, 'background');

		// contains ground and ledges, enabling physics to the group
		platforms = game.add.group();
		platforms.enableBody = true;

		// create the ground
		var ground = platforms.create(0, game.world.height - 64, 'ground');

		// scale it to fit the width of the game
		ground.scale.setTo(1, 1);

		// stops it from falling when you jump on it
		ground.body.immovable = true;

		// create two ledges
		var ledge = platforms.create(400, 400, 'platform');
		ledge.body.immovable = true;

		ledge = platforms.create(-150, 250, 'platform');
		ledge.body.immovable = true;

		// player and its settings
		player = game.add.sprite(38, game.world.height - 150, 'frog');
		fly = game.add.sprite(15, 24, 'fly');

		// enabling physics on the player
		game.physics.arcade.enable(player);

		// player physics properties
		player.body.bounce.y = 0.2;
		player.body.gravity.y = 300;
		player.body.collideWorldBounds = true;

		// breathing player
		player.animations.add('still', [0, 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, 7, 7, 7, 7], 10, true);

		// moving left and right
		player.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
		player.animations.add('right', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);

		//  Finally some flies to collect
		flies = game.add.group();
		
		//  We will enable physics for any fly that is created in this group
		flies.enableBody = true;

		//  Here we'll create 12 of them evenly spaced apart
		for (var i = 0; i < 12; i++)
		{
			//  Create a fly inside of the 'flies' group
			var fly = flies.create(i * 70, 0, 'fly');

			//  Let gravity do its thing
			fly.body.gravity.y = 500;

			//  This just gives each star a slightly random bounce value
			fly.body.bounce.y = 0.7 + Math.random() * 0.2;
			
			// standing fly
			fly.animations.add('still');
			fly.animations.play('still', 10, true);

		}
			
		//  The score
		scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFFFFF' });
			
		// Controls
		cursors = game.input.keyboard.createCursorKeys();
  
	},
  
  
	update: function() {
		// Collide the player and the flies with the platforms
		game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(flies, platforms);

		//  Checks to see if the player overlaps with any of the stars, if he does call the collectflyfunction
		game.physics.arcade.overlap(player, flies, collectfly, null, this);

		// Reset the players velocity (movement)
		player.body.velocity.x = 0;

		if (cursors.left.isDown)
		{
			// Move to the left
			player.body.velocity.x = -150;
			player.animations.play('left')
		}
		else if (cursors.right.isDown)
		{
			// Move to the right
			player.body.velocity.x = 150;
			player.animations.play('right');
		}
		else
		{
			// Stand still
			player.animations.play('still');
		}
		// Allow the player to jump if they are touching the ground.
		if (cursors.up.isDown && player.body.touching.down)
		{
			player.body.velocity.y = -400;
		}
	},
	
	
	collectfly: function  (player, fly) {
    
		// Removes the fly from the screen
		fly.kill();

		//  Add and update the score
		score += 10;
		scoreText.text = 'Score: ' + score;

	}
	
};