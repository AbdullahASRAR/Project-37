class Food{
  constructor(){
   this.foodStock=0
   this.lastFed=0
   this.image=loadImage("images/Milk.png")
   this.bedroom=loadImage("images/BedRoom.png")
   this.garden=loadImage("images/Garden.png")
   this.washroom=loadImage("images/WashRoom.png")

  }
  display(){
    var x=80,y=100;

    imageMode(CENTER);
    image(this.image,720,220,70,70);
    if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
           x=80;
           y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
      }
    }
  }
    getFoodStock(){
       return this.foodStock
        
    }

    updateFoodStock(fs){
       this.foodStock=fs;
    }
    bedroom(){
      background(this.bedroom,550,500);
    }
    garden(){
      background(this.garden,550,500);
    }
    washroom(){
      background(this.washroom,550,500);
    }
    
}