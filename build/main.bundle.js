"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Elevator = require("./Elevator.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Call = function Call(floor, direction) {
    _classCallCheck(this, Call);

    this.floor = floor;
    this.direction = direction;
};

var Floor = function () {
    function Floor(persons) {
        _classCallCheck(this, Floor);

        this.persons = persons;
    }

    _createClass(Floor, [{
        key: "removePerson",
        value: function removePerson(index) {
            this.persons.splice(index, 1);
        }
    }], [{
        key: "fromRawData",
        value: function fromRawData(rawFloorData) {
            var persons = [];
            for (var personIndex = 0; personIndex < rawFloorData.length; personIndex++) {
                var rawPersonData = rawFloorData[personIndex];
                var person = Person.fromRawData(rawPersonData);
                persons.push(person);
            }
            return new Floor(persons);
        }
    }]);

    return Floor;
}();

var Person = function () {
    function Person(destinationFloor) {
        _classCallCheck(this, Person);

        this.destinationFloor = destinationFloor;
    }

    _createClass(Person, null, [{
        key: "fromRawData",
        value: function fromRawData(rawPersonData) {
            return new Person(rawPersonData);
        }
    }]);

    return Person;
}();

var Building = function () {
    function Building(floors) {
        _classCallCheck(this, Building);

        this.floors = floors;
    }

    _createClass(Building, null, [{
        key: "fromRawData",
        value: function fromRawData(rawBuildingData) {
            var floors = [];
            for (var floorIndex = 0; floorIndex < rawBuildingData.length; floorIndex++) {
                var rawFloorData = rawBuildingData[floorIndex];
                var floor = Floor.fromRawData(rawFloorData);
                floors.push(floor);
            }
            return new Building(floors);
        }
    }]);

    return Building;
}();

var myBuilding = Building.fromRawData([[], [3], [4], [], [5, 6, 2, 6], [], []]);
console.log(myBuilding);
var myElevator = new _Elevator.Elevator(4, myBuilding);
for (var floorIndex = 0; floorIndex < myBuilding.floors.length; floorIndex++) {
    var currentFloor = myBuilding.floors[floorIndex];
    if (currentFloor.persons.length > 0) {
        for (var personIndex = 0; personIndex < currentFloor.persons.length; personIndex++) {
            var person = currentFloor.persons[personIndex];
            if (floorIndex < person.destinationFloor) {
                myElevator.call(new Call(person.destinationFloor, "up"));
            } else {
                myElevator.call(new Call(person.destinationFloor, "up"));
            }
        }
    }
}
