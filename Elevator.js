// Elevator:
//     - direction - ("up", "down", "not-moving")
//     - currentFloor
//     - persons[]
//     - capacity
//     - calls[1, 2, 3, 3gore, 5gore, 6dole] - list spratova odakle je pozvan

//     methods:
//     - move() - pomera se za jedan sprat
//     - call(Call): naredba liftu da ide na neki sprat
class Elevator {
    constructor(capacity, building){
        this.direction = "not-moving";
        this.currentFloor = 0;
        this.persons = [];
        this.capacity = capacity;
        this.calls = [];
        this.building = building;
    }

    move(){
        while (this.calls.length > 0) {
            // TODO: pomeri se za jedan sprat
            return
        }
    }

    call(personCall){
        for(let i = 0; i < this.calls.length; i++){
            if(personCall.floor == this.calls[i].floor && personCall.direction == this.calls[i].direction) {
                continue;
            }
            else{
                this.calls.push(personCall);
            }
        }
        if (this.calls.length > 0 && this.direction == "not-moving") {
            this.move();
        }
    }
}