class Floor {
    constructor(persons) {
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
    removePerson(index) {
        this.persons.splice(index,1);
    }
}

class Person {
    constructor(destinationFloor) {
        this.destinationFloor = destinationFloor;
    }
    static fromRawData(rawPersonData) {
        return new Person(rawPersonData);
    }
    getDirection(currentFloorIndex) {
        if(currentFloorIndex < this.destinationFloor) {
            return "up";
        } else {
            return "down";
        }
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
}

class Call {
    constructor(floor, direction) {
        this.floor = floor;
        this.direction = direction;
    }
}

class Elevator {
    constructor(capacity, building) {
        this.direction = "not-moving";
        this.currentFloorIndex = 0;
        this.stoppedAt = [this.currentFloorIndex];
        this.persons = [];
        this.capacity = capacity;
        this.calls = [];
        this.building = building;
    }

    move() {
        while (this.calls.length > 0) {
            this.decideOnDirection();

            this.moveByOneFloor();

            // should elevator stop?
            if(this.calls.filter(call => this.shouldElevatorStop(call, this.currentFloorIndex, this.direction)).length > 0) {
                this.stoppedAt.push(this.currentFloorIndex);
                this.calls = this.calls.filter(call => !this.shouldElevatorStop(call, this.currentFloorIndex, this.direction));
                this.peopleExitElevator();
                this.peopleEnterElevator();
            }

            this.goToBasementIfNoCalls();
        }
    }

    decideOnDirection() {
        let numberOfUpCalls = this.calls.filter((call => call.floor > this.currentFloorIndex)).length;
        let numberOfDownCalls = this.calls.filter((call => call.floor < this.currentFloorIndex)).length;
        if(this.direction === "not-moving") {
            if(numberOfUpCalls >= numberOfDownCalls) {
                this.direction = "up";
            } else {
                this.direction = "down";
            }
        } else if(this.direction === "up" &&  numberOfUpCalls === 0) {
            this.direction = "down";
        } else if(this.direction === "down" &&  numberOfDownCalls === 0) {
            this.direction = "up";
        }
    }

    moveByOneFloor() {
        if(this.direction === "up") {
            this.currentFloorIndex++;
        } else if(this.direction === "down") {
            this.currentFloorIndex--;
        }
    }

    shouldElevatorStop(call, elevatorFloorIndex, elevatorDirection) {
        return call.floor === elevatorFloorIndex && 
                            (call.direction === elevatorDirection || call.direction === "not-important");
    }

    peopleExitElevator() {
        let peopleStaying = this.persons.filter(person => person.destinationFloor !== this.currentFloorIndex)
        this.persons = peopleStaying;
    }

    peopleEnterElevator() {
        let currentFloor = this.building.floors[this.currentFloorIndex];
        let personIndex = 0;
        while(this.persons.length < this.capacity && currentFloor.persons.length > personIndex) {
            let currentPerson = currentFloor.persons[personIndex];
            if (currentPerson.getDirection(this.currentFloorIndex) === this.direction) {
                this.persons.push(currentFloor.persons[personIndex]);
                this.call(new Call(currentPerson.destinationFloor, "not-important"));
                currentFloor.removePerson(personIndex);
            } else {
                personIndex++;
            }
        }
        if(currentFloor.persons.length > 0) {
            for( let personIndex = 0; personIndex < currentFloor.persons.length; personIndex++ ) {
                let person = currentFloor.persons[personIndex];
                this.call(new Call(this.currentFloorIndex, person.getDirection(this.currentFloorIndex)));    
            }
        }
    }

    goToBasementIfNoCalls() {
        if (this.calls.length == 0 && this.currentFloorIndex != 0) {
            this.call(new Call(0, "down"));
        }
    }

    call(personCall) {
        let callFound = false;
        for(let i = 0; i < this.calls.length; i++) {
            if (personCall.floor == this.calls[i].floor && personCall.direction == this.calls[i].direction) {
                callFound = true;
            }
            if (personCall.floor == this.calls[i].floor && personCall.direction === "not-important") {
                this.calls[i] = personCall;
                callFound = true;
            }
        }
        if (!callFound) {
            this.calls.push(personCall);
        }
    }
}

export default function calculateStops(buildingArr, liftCapacity) {
    if (liftCapacity > 0) {
        let myBuilding = Building.fromRawData(buildingArr);
    
        let myElevator = new Elevator(liftCapacity, myBuilding);
        for(let floorIndex = 0; floorIndex < myBuilding.floors.length; floorIndex++) {
            let currentFloor = myBuilding.floors[floorIndex];
            if(currentFloor.persons.length > 0) {
                for( let personIndex = 0; personIndex < currentFloor.persons.length; personIndex++ ) {
                    let person = currentFloor.persons[personIndex];
                    myElevator.call(new Call(floorIndex, person.getDirection(floorIndex)));
                }
            }
        }
        myElevator.move();
    
        return myElevator.stoppedAt;
    } else {
        throw new Error("Capacity have to be positive number");
    }
}
