var intro, introImg;
var	bg1, bg1Img;
var bg2, bg2Img;
var bg3, bg3Img;
var girl, girlImg;
var witch, witchImg;

var blue, blueImg;
var green, greenImg;
var orange,	orangeImg;
var white, whiteImg;
var purple, purpleImg;

var gameState = "START";
var score = 0;

function preload()
{
	introImg = loadImage("images/bgs/intro.png");
	bg1Img = loadImage("images/bgs/bg1.png");
	bg2Img = loadImage("images/bgs/bg2.png");
	bg3Img = loadImage("images/bgs/bg3.png");
																	
	girlImg = loadImage("images/girl.png");
	witchImg = loadImage("images/witch.png");

	blueImg = loadImage("images/portions/blue.png");
	greenImg = loadImage("images/portions/green.png");
	orangeImg = loadImage("images/portions/orange.png");
	whiteImg = loadImage("images/portions/white.png");
	purpleImg = loadImage("images/portions/purple.png");
}

function setup() 
{
	createCanvas(1535, 750);

	intro = createSprite(767, 375, 1530, 750);
	intro.addImage(introImg);
	intro.scale = 0.8;

	bg1 = createSprite(767, 375, 1535, 750);
	bg1.addImage(bg1Img);
	bg1.visible = false;

	bg2 = createSprite(767, 375, 1535, 750);
	bg2.addImage(bg2Img);
	bg2.visible = false;

	bg3 = createSprite(767, 375, 1535, 750);
	bg3.addImage(bg3Img);
	bg3.visible = false;

	girl = createSprite(770, 250, 50, 50);
	girl.addImage(girlImg);
	girl.scale = 1.5;
	girl.visible = false;
	girl.setCollider("rectangle", 0, 0, 25, 100);

	witch = createSprite(767, 600, 50, 50);
	witch.addImage(witchImg);
	witch.scale = 0.5;
	witch.visible = false;
	witch.setCollider("rectangle", 0, 0, 50, 500);

	//Engine.run(engine);
}


function draw() 
{
	background(0);
  
	if(gameState === "START")
	{
		intro.visible = true;
		score = 0;

		if(mousePressedOver(intro))
		{
			intro.visible = false;
			gameState = "PLAY";
		}
	}

	if(gameState === "PLAY")
	{
		intro.visible = false;

		bg1.visible = true;
		bg1.velocityY = -1;
		if(bg1.y === 360)
		{
			bg1.y = 400;
		}

		girl.visible = true;
		girl.velocityY = -1;
		if(girl.y === 235)
		{
			girl.y = 275;
		}

		if(keyDown("RIGHT_ARROW"))
		{
			girl.x = girl.x + 2
		}
		if(keyDown("LEFT_ARROW"))
		{
			girl.x = girl.x - 2
		}

		spawnBlue();
		if(hasCollided(girl, blue))
		{
			score = score + 1;
		}

		spawnGreen();
		if(hasCollided(girl, green))
		{
			witch.visible = true;
			green.visible = false;
		}
		
		witch.velocityY = -1;
		if(witch.y === 585)
	    {
			witch.y = 625;
	    }

		spawnOrange();
		if(hasCollided(girl, orange))
		{
			bg2.visible = true;
		}

		spawnWhite();
		if(hasCollided(girl, white))
		{
			bg3.visible = true;
		}

		spawnPurple();
		if(hasCollided(girl, purple))
		{
			witch.y = 250;
			witch.velocityY = 0;
		}

		if(hasCollided(girl, witch))
		{
			gameState = "END";
		}
		
	}
	/*if(gameState === "END")
	{
		gameState = "START";
	}*/
	
  	drawSprites();

	fill("white");
	stroke("white");
	textSize(20);
	text("Life: " + score, 150, 50)
}

function spawnBlue()
{
	if(frameCount % 150 === 0)
		{
			blue = createSprite(random(0, 1535), random(60, 660), 5, 5);
			blue.addImage(blueImg);
			blue.scale = 0.3;
			blue.velocityY = 2;
			blue.setCollider("circle", 0, 0, 25);
		}
}

function spawnGreen()
{
	if(frameCount % 250 === 0)
		{
			green = createSprite(random(0, 1535), random(60, 660), 5, 5);
			green.addImage(greenImg);
			green.scale = 0.3;
			green.velocityY = 2;
			green.setCollider("circle", 0, 0, 25);
		}
}

function spawnOrange()
{
	if(frameCount % 150 === 0)
		{
			orange = createSprite(random(0, 1535), random(60, 660), 5, 5);
			orange.addImage(orangeImg);
			orange.scale = 0.3;
			orange.velocityY = 2;
			orange.setCollider("circle", 0, 0, 25);
		}
}

function spawnWhite()
{
	if(frameCount % 150 === 0)
		{
			white = createSprite(random(0, 1535), random(60, 660), 5, 5);
			white.addImage(whiteImg);
			white.scale = 0.3;
			white.velocityY = 2;
			white.setCollider("circle", 0, 0, 25);
		}
}

function spawnPurple()
{
	if(frameCount % 150 === 0)
		{
			purple = createSprite(random(0, 1535), random(60, 660), 5, 5);
			purple.addImage(whiteImg);
			purple.scale = 0.3;
			purple.velocityY = 2;
			purple.setCollider("circle", 0, 0, 25);
		}
}

function hasCollided(lgirl, lportion)
{
  if( 	(lgirl.x - lportion.x) <= (lgirl.width/2 + lportion.width/2) && 
  		(lportion.x - lgirl.x) <= (lportion.width/2 + lgirl.width/2) && 
  		(lgirl.y - lportion.y) <= (lgirl.height/2 + lportion.height/2) && 
  		(lportion.y - lgirl.y) <= (lportion.height/2 + lgirl.height/2))
   {
		return true;
   }
}