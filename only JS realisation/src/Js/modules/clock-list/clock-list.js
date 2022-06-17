function clockList(selectorListWrapper, objActiveTasks) {
    const wrapperListEl = document.querySelector(selectorListWrapper);
    const clockListEl = wrapperListEl.querySelector(`.clocks > .active-tasks__list-tasks`),
          alarmListEl = wrapperListEl.querySelector(`.alarms > .active-tasks__list-tasks`),
          stopwatchListEl = wrapperListEl.querySelector(`.stopwatches > .active-tasks__list-tasks`),
          timerListEl = wrapperListEl.querySelector(`.timers > .active-tasks__list-tasks`);

    
    clockListEl.innerHTML = "";
    alarmListEl.innerHTML = "";
    stopwatchListEl.innerHTML = "";
    timerListEl.innerHTML = "";

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


                const listElems = [];
                for (const key in listIntervals) {
                    if (Object.hasOwnProperty.call(listIntervals, key)) {
                        const intervalObjFields = listIntervals[key];

                        const elem = document.createElement("li");
                        elem.innerHTML = `
                                <div class="active-tasks__time">${intervalObjFields.time.hours ? intervalObjFields.time.hours : ""}:${intervalObjFields.time.minutes}${intervalObjFields.time.seconds ? `:${intervalObjFields.time.seconds}`: ""}</div>
                                <button class="button active-tasks__cancel">cancel</button>
                        `;
                        listElems.push(elem);
                    }
                }

                switch (typeTask) {
                    case "clocks": {
                        listElems.forEach(elem => clockListEl.append(elem));
                        break;
                    }

                    case "alarms": {
                        listElems.forEach(elem => alarmListEl.append(elem));
                        
                        break;
                    }

                    case "timers": {
                        listElems.forEach(elem => timerListEl.append(elem));

                        break;
                    }

                    case "stopwatches": {
                        listElems.forEach(elem => {
                            stopwatchListEl.append(elem)
                        });

                        break;
                    }
                
                    default:
                        break;
                }
            }
        }
    }
}

export default clockList;