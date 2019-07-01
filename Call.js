//- floor
//- direction - ("up", "down", "not-important")

class Call{
    constructor(floor, direction){
        this.floor = floor;
        this.direction = direction;
    }
   get floor(){
       return this.floor;
   }
   set floor(newFloor){
       this.direction = newFloor;
   }
   get direction(){
       return this.direction;
   }
   set direction(newDirection){
       this.direction = newDirection;
   }

}