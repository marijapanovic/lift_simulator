class Call{
    constructor(floor, direction){
        this.floor = floor;
        this.direction = direction;
    }
} 
class Floor{
    constructor(persons){
        this.persons = persons;
    }
    static fromRawData(rawFloorData) {
        let persons = [];
        for (let personIndex = 0; personIndex < rawFloorData.length; personIndex++) {
            let rawPersonData = rawFloorData[personIndex];
            let person = Person.fromRawData(rawPersonData);
            persons.push(person);
        }
        return new Floor(persons);
    }
    removePerson(index){
        this.persons.splice(index,1);
    }
}

class Person{
    constructor(destinationFloor){
        this.destinationFloor = destinationFloor;
    }
    static fromRawData(rawPersonData){
        return new Person(rawPersonData);
    }
}

class Building {
    constructor(floors) {
        this.floors = floors;
    }

    static fromRawData(rawBuildingData) {
        let floors = [];
        for (let floorIndex = 0; floorIndex < rawBuildingData.length; floorIndex++) {
            let rawFloorData = rawBuildingData[floorIndex];
            let floor = Floor.fromRawData(rawFloorData);
            floors.push(floor);
        }
        return new Building(floors);
    }
    createCall(floor,direction){
        return new Call(floor, direction);
    }
    createElevator(direction, currentFloor, persons, capacity, calls){
        //let listOfCalls = new Call(floor, direction)
        return new Elevator(direction, currentFloor, persons, capacity, calls)
    }
}

let calls = [];
calls.push(new Call(1, "up"));
let nextCall = new Call(1, "up");
if (nextCall.floor == calls[0].floor && nextCall.direction == calls[0].direction ) {
    console.log("vec me neko pozvao");
} else {
    console.log("nije me niko odatle zvao");
}

return;

let myBuilding = Building.fromRawData([[],[3],[4],[],[5,6,2,6],[],[]]);
console.log(myBuilding);
let myElevator = new Elevator(4);
for(let floorIndex = 0; floorIndex < myBuilding.floors.length; floorIndex++){
    let currentFloor = myBuilding.floors[floorIndex];
    if(currentFloor.persons.length > 0){
        for( let personIndex = 0; personIndex < currentFloor.persons.length; personIndex++ ){
            let person = currentFloor.persons[personIndex];
            if(floorIndex < person.destinationFloor ){
                myElevator.call(Call(person.destinationFloor,"up"));
            }
            else{
                myElevator.call(Call(person.destinationFloor,"up"));
            }

        }
    }
}
