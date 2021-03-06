var dog,sadDog,happyDog,garden,washroom, database;
var foodStock;
var database;
var foodS;
var lastFed;
var foodObj;
var readState;
var gameState=0;
var currentTime;
function preload()
{
  dog=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg1.png");
  garden=loadImage("Images/Garden.png");
washroom=loadImage("Images/WashRoom.png");
bedroom=loadImage("Images/BedRoom.png");
}
function setup() {
	createCanvas(1000, 600);
  database=firebase.database();
  foodObj=new Food()
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  Dog=createSprite(800,200,150,150);
  Dog.addImage(dog);
  Dog.scale=0.3;

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  addFood=createButton("AddFood");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}
function draw() { 
  background("blue");
  foodObj.display();
  
   
  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime==(lastFed+2)&& currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }
  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    Dog.remove();
  }else{
    feed.show();
    addFood.show();
    Dog.addImage(dog);
  }
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}
function update(state){
  database.ref('/').update({
    gameState:state
  });
}

function feedDog(){
  Dog.addImage(dogHappy);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour(),
  gameState:"hungry"
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}
