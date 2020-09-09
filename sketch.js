// variables declaring the sword the fruits and the monsters
var sword, swordImage,swordSound;
var fruit,fImage1,fImage2,fImage3,fImage4;
var monster, mImage;

// variables declaring the game over image
var gameOver,gameOverImage,gameOverSound;

var restart,restartImage;

// variables declaring of choosing a random fruit to display 
var r;

// variables for gameStates 
var PLAY = 1;
var END = 0;
var gameState = 1;

// variables for the score 
var score = 0; 

//variables declaring the fruit group and the enemy group 
var fruitGroup,enemyGroup;

var position;



//preloads all the images 
function preload(){
  swordImage = loadImage("sword.png");
  fImage1 = loadImage("fruit1.png");
  fImage2 = loadImage("fruit2.png");
  fImage3 = loadImage("fruit3.png");
  fImage4 = loadImage("fruit4.png");
  
  mImage = loadImage("alien1.png");
  
  gameOverImage = loadImage("gameover.png");
  
  swordSound = loadSound("Sword Sound Effect.mp3");
  gameOverSound = loadSound("Game Over - Sound Effect [HD].mp3");
  
  restartImage = loadImage("Reset-button-green.jpg");
  
 
}

function setup(){
  // creates the canvas
  createCanvas(windowWidth, windowHeight);

  // creates the sword 
  sword = createSprite(width/2,height/2,10,10);
  
  
  // creates the fruit and enemy groups 
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  gameOver = createSprite(width/2,height/2,13,13);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 2.8;
  
  restart = createSprite(width/2,height-200,13,13);
  restart.addImage(restartImage);
  restart.scale = 0.1;
  
  
  
}

function draw(){
  
  // makes the background colour
  background(0,215,250);
  
  // makes sword move and makes you gain points if game state is play and shows the game over image if the game state is end 
   if (gameState === PLAY)
  {
    gameOver.visible= false;
    restart.visible = false; 
    
    sword.addImage(swordImage);
    sword.scale = 0.6; 
    
    sword.x = mouseX;
    sword.y = mouseY;
    fruits();
    enemy();
  
    
    if (fruitGroup.isTouching(sword))
    {
      swordSound.play();
      fruitGroup.destroyEach();
      score=score+1;
    }
    
    if(enemyGroup.isTouching(sword))
  {
    gameOverSound.play();
    enemyGroup.destroyEach();
    gameState = END;
    
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
  
  }
  
  }
  
  else if (gameState === END)
  {
    gameOver.visible=true;
    restart.visible =true; 
    
    sword.destroy();
}   
    

   // displays the score
  fill("black");
  textSize(20);
  text("score: " + score,width/2,height-700);

  if(mousePressedOver(restart) && gameState === END) 
  {
      reset();
  }

  // displays all the sprites 
   drawSprites();
}
  
  
   
  
  
  
  
  
  
   
  
 
 
  
 


// function to create the fruits and make them move across the canvas
function fruits()
{
  
  
if (frameCount % 60 === 0) 
{
  fruit = createSprite(400,200,20,20);
  fruit.scale = 0.2; 
  r = Math.round(random(1,4));
  
  if(r === 1)
  {
    fruit.addImage(fImage1);
    
  }
  else if (r === 2)
  {
    fruit.addImage(fImage2);
  }
  else if (r === 3)
  {
    fruit.addImage(fImage3);
  }
  else
  {
    fruit.addImage(fImage4);
  }
  
  position = Math.round(random(1,2))
  
  if(position === 1)
  {
    fruit.x = width;
    fruit.velocityX=-(7+(score/4));
  }
  else
  {
    if(position===2)
    {
      fruit.x=width-width;
      
      
      fruit.velocityX = (7+(score/4));
      
    }
  }

  fruit.y = Math.round(random(50,340));
  
  fruit.lifetime = 100;
  
  fruitGroup.add(fruit);
  }
}

// creats the enemy and makes it move accross the canvas 
function enemy()
{
  if (frameCount % 200 === 0)  
  {
    monster = createSprite(width,200,20,20);
    monster.addImage(mImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  
  }

}

function reset()
{
    gameState = PLAY;
    sword = createSprite(300,300,10,100);
    sword.addImage(swordImage);
    sword.x = mouseX;
    sword.y = mouseY;
    score = 0;
                  
}
