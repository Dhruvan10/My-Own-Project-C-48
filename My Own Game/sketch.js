var PLAY=1
var END=2
var START=0
var gameState=START

var life=3
var background1,backgroundImg;
var rock,rockImage,thorn,thornImage;
var mario1,marioImage;
var coin,coinImage;
var heart1,heart1Image,heart2,heart2Image,heart3,heart3Image;
var ground,invisibleGround,groundImage,obstacle2,obstacle2Image;
var startButton,startImage;
var restartButton,restartImage;
var obstaclesGroup;
var score;

function preload(){

 backgroundImg=loadImage("OusideBg.png") 
 rockImage=loadImage("./assets/big_rock.jpeg")
 coinImage=loadImage("./assets/coin.png")
 //obstacle2Image=loadImage("./assets/obstacle2.png")
 marioImage=loadAnimation("./assets/Capture1.png","./assets/Capture3.png","./assets/Capture4.png")

 heart1Image=loadImage("./assets/heart_1.png")
 heart2Image=loadImage("./assets/heart_2.png")
 heart3Image=loadImage("./assets/heart_3.png")

 startImage=loadImage("play_button.png")
 restartImage=loadImage("restart_button.png")
}

function setup() {

createCanvas(windowWidth,windowHeight);

  background1=createSprite(width/2,height/2,width,height)
  background1.addImage(backgroundImg)
  background1.scale=3
  background1.velocityX=-5

  mario1=createSprite(90,height-100)
  mario1.addAnimation("running",marioImage)
  mario1.scale=1

  startButton=createSprite(width/2,height/2)
  startButton.addImage(startImage)
  startButton.scale=0.2

  restartButton=createSprite(width/2,height/2)
  restartButton.addImage(restartImage)
  restartButton.scale=0.2
  
  invisibleGround=createSprite(width/2,height-20,width,20)
  invisibleGround.visible=false

  heart1=createSprite(60,100)
  heart1.addImage("heart1",heart1Image)
  heart1.scale=0.5

  heart2=createSprite(110,100)
  heart2.addImage("heart2",heart2Image)
  heart2.scale=0.5

  heart3=createSprite(160,100)
  heart3.addImage("heart3",heart3Image)
  heart3.scale=0.5

  heart1.visible=false
  heart2.visible=false
  heart3.visible=true

  obstaclesGroup=new Group()
  coinGroup=new Group()

  score=0;
  
}

function draw() {
  background(180);
  
  text("Score:"+score,1000,500)

  mario1.collide(invisibleGround)

  if(gameState===START){
    mario1.visible=false
    startButton.visible=true
    restartButton.visible=false
    background1.velocityX=0

    if(mousePressedOver(startButton)){
      gameState=PLAY
    }

    heart1.visible=false
    heart2.visible=false
    heart3.visible=true

    
  }

  else if(gameState===PLAY){
    mario1.visible=true
    startButton.visible=false
    restartButton.visible=false
    background1.velocityX=-5
    score=score+Math.round(frameCount/60);
    

    if(background1.x<0){
      background1.x=width/2
    }
   
     //moving the player up and down and making the game mobile compatible using touches
   if(keyDown("SPACE")||touches.length>0){
     mario1.velocityY = -10
   }
    mario1.velocityY+=0.8

    spawnObstacles()
    spawnCoins()

    text("Score:"+score,1000,500)

    if(mario1.isTouching(obstaclesGroup)){
      life=life-1
      gameState=END
    }

    heart1.visible=false
    heart2.visible=false
    heart3.visible=true

    
    

    if(mario1.isTouching(coinGroup)){
      score=score+20
    }

  }
  else if(gameState===END){
     mario1.velocityY=0
     background1.velocityX=0
    
    obstaclesGroup.setVelocityXEach(0)
    restartButton.visible=true
    obstaclesGroup.setLifetimeEach(-1)

    if(mousePressedOver(restartButton)){
      if(life>0){
      reset()
      }
     }

     if(life==2){
      heart1.visible=false
      heart3.visible=false
      heart2.visible=true
    }

    if(life==1){
      heart1.visible=true
      heart3.visible=false
      heart2.visible=false
    }

    if(life==0){
      heart1.visible=false
      heart3.visible=false
      heart2.visible=false
      
      gameState=END
    }

    if(life>0){

    }

  }

 


drawSprites();

}

function spawnObstacles(){
  if(frameCount%100==0){
    rock=createSprite(width,Math.round(random(height-100,height-10)))
    rock.addImage("big_rock",rockImage)
    rock.scale=0.04
    rock.velocityX=-5
    rock.lifeTime=width/5
    obstaclesGroup.add(rock)
  }
  
}

function spawnCoins(){

if(frameCount%50==0){
  coin=createSprite(width,Math.round(random(height-120,height-30)))
  coin.addImage("coins",coinImage)
  coin.scale=0.2
  coin.velocityX=-5
  coin.lifeTime=width/5
  coinGroup.add(coin)
  }

  if(coinGroup.isTouching(mario1)){
    coinGroup.remove();
  }

}

function reset(){
  gameState=PLAY
  obstaclesGroup.destroyEach()
  
}
