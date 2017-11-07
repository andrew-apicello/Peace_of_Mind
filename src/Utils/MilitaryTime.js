// From standard time to military time
exports.convertStandardToMilitaryTime = function(hours,minutes,amPm){

let militaryTime;

if(minutes === 0){
    minutes = "00"
}

    if (amPm === "AM"){  //if AM

        if (hours === "12"){
            let hourMilitary = "00";
            militaryTime = hourMilitary + ":" + minutes;       
        } else {
            militaryTime = hours + ":" + minutes;
        }
       
    } else{  //if PM
        let hourNum = parseInt(hours);
            
        if (hourNum === 12){
            var hourMilitary = hourNum;
        } else {
            var hourMilitary = hourNum + 12;
        }
            militaryTime = hourMilitary + ":" + minutes;
    }
    return militaryTime;
}

//From military time to standard time
exports.convertMilitaryToStandardTime = function(hours,minutes){

let amPm;
let hoursStd;
let hoursInt = parseInt(hours);

if(minutes === 0){
    minutes = "00"
}

if (hoursInt > 12){
    hoursStd = hoursInt - 12;
    amPm = "PM";
} else if (hoursInt === 0){
    hoursStd = 12;
    amPm = "AM";
} else if (hoursInt === 12){
    hoursStd = 12;
    amPm = "PM";
}else {
    hoursStd = hoursInt;
    amPm = "AM";
}

let standardTime = hoursStd + ":" + minutes + " " + amPm;

return standardTime;
}