
import Building from './Building';
import Floor from './Floor';
import Call from './Call';
import Person from './Person';
import Elevator from './Elevator';

function calculateStops(buildingArray, liftCapacity){
    let floors = [...Array(buildingArray.length).keys()]
    let building = new Building(floors);

    for ( let i of building.floors){
        let floor = new Floor(buildingArray[i]);
        for(let a of floor.persons){
            let person = new Person(buildingArray[i][a]);
           // const elevator = new Elevator(direction, currentFloor, persons, capacity, calls);
        }
    }

}

let myBuilding = calculateStops([[],[3],[4],[],[5,6,2,6],[],[]], 4);
console.log("building");
console.log(myBuilding);


// MainApplication:
//     for floor in building.floors:
//         for person in floor.persons:
//             elevator.call(new Call(floor, "up ili down - izracunati"))
//     while elevator.calls.length > 0:
//         elevator.move()

// Elevator:
//     - direction - ("up", "down", "not-moving")
//     - currentFloor
//     - persons[]
//     - capacity
//     - calls[1, 2, 3, 3gore, 5gore, 6dole] - list spratova odakle je pozvan

//     methods:
//     - move() - pomera se za jedan sprat
//     - call(Call): naredba liftu da ide na neki sprat

// Call:
//     - floor
//     - direction - ("up", "down", "not-important")

// Building:
//     - floors[]    

// Floor:
//     - persons[]
//     methods:
//     removePerson(index)

// Person:
//     - destinationFloor