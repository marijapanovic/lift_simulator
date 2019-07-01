export  function peopleWhoGoDown(buildingArray, liftCapacity){
    let liftCapacityArray = [];
    let finalArray = [];
    //let peopleOnFloors = [];
    for(let i = buildingArray.length ; i > 0 ; i--){
        let floorArray = buildingArray[i];

        // For people who want to go up.
        if(floorArray.length > 0){ 
            //peopleOnFloors.push(...floorArray);
            //console.log("people");
            //console.log(peopleOnFloors);
            for(let a = 0; a < floorArray.length; a++){
                //broj sprata jednak ili manji od sprata(broja) na koji covek zeli da ide.
               if (floorArray[a] >= i){
                   //ako se u liftu nalazi covek(broj) koji je oznacio da zeli da ide na taj sprat, izlazi iz lifta
                    liftCapacityArray.includes(i) ? liftCapacityArray.filter(item => item !== i) : liftCapacityArray;
                    //ako ima mesta u liftu, osoba koja zeli na gore da ide, ulazi 
                    liftCapacityArray < liftCapacity ? liftCapacityArray.push(floorArray[a]) : liftCapacityArray;
                    finalArray.push(i) ;
                }
                else {
                    continue;
                }
            }
        }
        // Floor 0, there is empty array[]
        // else if(floorArray.length > 0 && floorArray == 0){
        //     finalArray.push(i);
        // }
        else{
            let floorNumber = buildingArray.indexOf(floorArray);
            floorNumber == 0 ? finalArray.push(floorNumber) : finalArray;
            liftCapacityArray.includes(floorNumber) ? liftCapacityArray.filter(item => item !== floorNumber) : liftCapacityArray;
            continue;
        }
    }
    //da se vrati na prixzemlje lift kad razveze ljude
    finalArray.push(0);
    return finalArray;
}