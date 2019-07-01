//     - persons[]
//     methods:
//     removePerson(index)

export default class Floor{
    constructor(persons){
        this.persons = persons;
    }
    get persons(){
        return this.persons;
    }
    set persons(newPerson){
        this.persons = newPerson;
    }
    removePerson(index){
        this.persons.splice(index,1);
    }
}