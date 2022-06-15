function clockList(selectorListWrapper, objActiveTasks) {
    const wrapperListEl = document.querySelector(selectorListWrapper);
    const clockListEl = wrapperListEl.querySelector(`.clocks > .active-tasks__list-tasks`),
          alarmListEl = wrapperListEl.querySelector(`.alarms > .active-tasks__list-tasks`),
          stopwatchListEl = wrapperListEl.querySelector(`.stopwatches > .active-tasks__list-tasks`),
          timerListEl = wrapperListEl.querySelector(`.timers > .active-tasks__list-tasks`);

    
    // clockListEl.innerHTML = "";
    // alarmListEl.innerHTML = "";
    // stopwatcheListEl.innerHTML = "";
    // timerListEl.innerHTML = "";

    for (const typeTask in objActiveTasks) {
        if (Object.hasOwnProperty.call(objActiveTasks, typeTask)) {
            const listIntervals = objActiveTasks[typeTask];
            
            if(typeTask[0] !== "_") { // вытащить только getter-свойства
                if(!listIntervals || Object.keys(listIntervals).length === 0) {
                    switch (typeTask) {
                        case "clocks": {
                            clockListEl.innerHTML = "list is clear";
                            break;
                        }
        
                        case "alarms": {
                            alarmListEl.innerHTML = "list is clear";
                            break;
                        }
        
                        case "timers": {
                            timerListEl.innerHTML = "list is clear";
                            break;
                        }
        
                        case "stopwatches": {
                            stopwatchListEl.innerHTML = "list is clear";
                            break;
                        }
                    
                        default: 
                            // throw new Error("something went wrong");
                            break;
                    }
    
                    continue;
                }

                for (const key in listIntervals) {
                    if (Object.hasOwnProperty.call(listIntervals, key)) {
                        const element = listIntervals[key];
                        
                        switch (typeTask) {
                            case "clocks": {
                                
                                
                                break;
                            }

                            case "alarms": {
                                
                                
                                break;
                            }

                            case "timers": {


                                break;
                            }

                            case "stopwatches": {


                                break;
                            }
                        
                            default:
                                break;
                        }
                    }
                }
            }
        }
    }
}

export default clockList;