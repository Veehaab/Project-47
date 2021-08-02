var bg,bgImg;
var player, shooterImg, shooter_shooting,shooter_running,shooter_running2;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var invisibleGround;

function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg=loadImage("images/shooter7.png")
  shooter_running=loadAnimation("images/shooter1.png","images/shooter2.png","images/shooter3.png","images/shooter4.png","images/shooter5.png","images/shooter6.png")
  shooter_running2=loadAnimation("images/shooter8.png","images/shooter9.png","images/shooter10.png","images/shooter11.png","images/shooter12.png","images/shooter13.png")
  shooter_shooting = loadImage("images/shooter16.png")

  zombieImg = loadImage("Images/zombie2.png")

  bgImg = loadImage("Images/zombieBackground.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 4.1
  


//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-250, 50, 50);
 //player.addImage(shooterImg)
 player.addAnimation("shooterImg",shooterImg)
 player.addAnimation("shooter_running",shooter_running)
 player.addAnimation("shooter_running2",shooter_running2)
   player.scale = 0.7
   //player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaini
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();

    invisibleGround = createSprite(900,910,3400,100);
  invisibleGround.visible = false;
}

function draw() {
  background(0); 

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")&&player.y>=330){
  player.y = player.y-5
}
player.velocityY = player.velocityY + 1
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+5
}
player.collide(invisibleGround)
//if(keyDown("space")&& trex.y >= 161) {
 // trex.velocityY = -15;
//}
//trex.velocityY = trex.velocityY + 1
//trex.collide(invisibleGround);

if(keyDown("D")||touches.length>0){
  player.x = player.x+10
 }

 if(keyDown("D")){
  player.changeAnimation("shooter_running",shooter_running);
 }

 if(keyDown("A")||touches.length>0){
  player.x = player.x-10
 }

if(keyDown("A")){
  player.changeAnimation("shooter_running2",shooter_running2);
}



//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
  player.addImage(shooter_shooting)
  
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       } 
 }
}

//calling the function to spawn zombies
enemy();

drawSprites();
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%75===0)
  {

    //giving random x and y positions for zombie to appear
    //zombie = createSprite(random(500,800),random(100,1000),40,40)
zombie=createSprite(1000,800)
    zombie.addImage(zombieImg)
    zombie.scale = 0.4
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.x = Math.round(random(3000,120));
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
