import clockList from "../clock-list/clock-list";
import { getTimeFromMidnightMs } from "../tech functions/getTimeFromMidnight";

class AlarmsClass {
    constructor(containerActiveTasks, mainContainerSelector) {
        this.containerActiveTasks = containerActiveTasks;
        this.mainContainerSelector = mainContainerSelector;
    }

    objActiveTasks = {
        _clocks: {
            
        },
        _alarms: {
            2: {
                time: {
                    hours: 10,
                    minutes: 15
                },
                isDrowMainContainer: false,
                isEnable: true
                /* maybe add some settings of sound or something else */
            },
        },
        _stopwatches: {
            // intervalId: *сколько прошло времени
            20: {
                time: {
                    minutes: 55,
                    seconds: 20,
                    milliseconds: 20
                },
                isDrowMainContainer: false,
                isPaused: false
            },
        },
        _timers : {
            // intervalId: *оставшееся время

            /* maybe add some settings of sound or something else */
        },

        get clocks() {
            return this._clocks;
        },
        get alarms() {
            return this._alarms;
        },
        get stopwatches() {
            return this._stopwatches;
        },
        get timers() {
            return this._timers;
        },
    }

    _setIntervalClock(UTCDeviation) {
        this._initContainerTime(this.mainContainerSelector);

        setTimeout(() => {
            this.drow( this.mainContainerSelector, this.getObjTime(new Date().getTime() + (1000 * 60 * 60 * UTCDeviation), true, false) );
            let firstRepeat = true;

            const intervalId = setInterval(() => {
                if(firstRepeat) {
                    this.objActiveTasks._clocks[intervalId] = {
                        isDrowMainContainer: true,
                        time: this.getObjTime(new Date().getTime() + (1000 * 60 * 60 * UTCDeviation), true, false) 
                    }
                }
                else {
                    this.objActiveTasks._clocks[intervalId] = {
                        ...this.objActiveTasks._clocks[intervalId],
                        time: this.getObjTime(new Date().getTime() + (1000 * 60 * 60 * UTCDeviation), true, false) 
                    }
                }
                firstRepeat = false;
    
                if(this.objActiveTasks.clocks[intervalId].isDrowMainContainer) {
                    this.drow(this.mainContainerSelector, this.objActiveTasks._clocks[intervalId].time);
                }
                clockList(this.containerActiveTasks, this.objActiveTasks);
            }, 1000)
        }, Math.floor( new Date().getTime() % 1000 ));
    }

    _setIntervalAlarm = (alertTimeMsFromMidnight) => {
        let remainedTime = 0;

        if(getTimeFromMidnightMs(new Date().getTime()) > alertTimeMsFromMidnight) {
            const timeToMidnightMs = (1000 * 60 * 60 * 24) - getTimeFromMidnightMs(new Date().getTime());
            
            remainedTime = timeToMidnightMs;
            remainedTime += alertTimeMsFromMidnight;
            console.log(remainedTime)
        } else {
            remainedTime = alertTimeMsFromMidnight - getTimeFromMidnightMs(new Date().getTime());
            console.log(remainedTime);
        }
        
        alert(`The alarm will ring in: ${Math.floor(remainedTime / (1000 * 60 * 60))}h ${Math.floor(remainedTime / (1000 * 60) % 60)}m`); // create some nive notification

        const intervalId = setTimeout(() => {
            alert("hello"); // here will be some sound and graphic notification
            clearInterval(intervalId);
            clockList(this.containerActiveTasks, this.objActiveTasks);
        }, remainedTime);

        this.objActiveTasks._alarms[intervalId] = {
            time: this.getObjTime(alertTimeMsFromMidnight, false)
        }
        console.log(this.getObjTime(alertTimeMsFromMidnight))
    }

    _setIntervalTimer = (remainedTimeMs) => {
        let firstRepeat = true;
        
        const intervalId = setInterval(() => {
            if(firstRepeat) {
                this.objActiveTasks._clocks[intervalId] = {
                    isDrowMainContainer: true,
                    time: this.getObjTime(new Date().getTime() + (1000 * 60 * 60 * UTCDeviation), true, false) 
                }
            }
            else {
                this.objActiveTasks._clocks[intervalId] = {
                    ...this.objActiveTasks.timers[intervalId],
                    time: this.getObjTime(new Date().getTime() + (1000 * 60 * 60 * UTCDeviation), true, false) 
                }
            }
            firstRepeat = false;

            if(remainedTimeMs == 0) {
                autoStopTimer();
                clearInterval(intervalId);
                return;
            }

            remainedTimeMs = remainedTimeMs - 1000;

            if(this.objActiveTasks.timers[intervalId].isDrowMainContainer) {
                this.drow(this.mainContainerSelector, this.objActiveTasks._timers[intervalId].time);
            }
            clockList(this.containerActiveTasks, this.objActiveTasks);
        }, 1000)
        this.objActiveTasks._timers.push({
            intervalId,
            time: {
                hours: /* ... */ 1,
                minutes: /* ... */ 2
            }
        })
        
        
        function techStopTimer() {
            // stopBtn.removeEventListener("click", techStopTimer); 
            // stopBtn.remove();
            // clearClockElement(containerElement);

            clearInterval(intervalID);
            createTimer(containerElement);
        }

        function autoStopTimer() { //add some music, maybe animation
            techStopTimer();
        }
    }

    _setIntervalStopwatch = (startTime = 0) => {
        // startBtn.removeEventListener("click", startStopwatch);
        // startBtn.remove();
        // containerElement.appendChild(stopBtn);
        // stopBtn.addEventListener("click", stopStopwatch);
        let firstRepeat = true;
        let timeMs = 0;

        const intervalId = setInterval(() => {
            timeMs += 10;
            if(firstRepeat) {
                this.objActiveTasks._stopwatches[intervalId] = {
                    isDrowMainContainer: true,
                    time: this.getObjTime(timeMs)
                }
            }
            else {
                this.objActiveTasks._stopwatches[intervalId] = {
                    ...this.objActiveTasks._stopwatches[intervalId],
                    time: this.getObjTime(timeMs)
                }
            }
            firstRepeat = false;

            if(this.objActiveTasks.stopwatches[intervalId].isDrowMainContainer) {
                this.drow(mainContainerSelector, this.objActiveTasks._stopwatches[intervalId].time);
            }
            clockList(this.containerActiveTasks, this.objActiveTasks);
        }, 10)
        
        // changeTabs(intervalID, containerElement, "stopwatch");

        function stopStopwatch() {
            // clearInterval(intervalID);
            // stopBtn.removeEventListener("click", stopStopwatch);
            // stopBtn.remove();

            // containerElement.appendChild(startBtn);
            // startBtn.addEventListener("click", startStopwatch);

            // time = 0;
            // setTimeAtPage(containerElement, time);
        }
    }

    removeInterval = (intervalId, typeTask) => {
        clearInterval(this.objActiveTasks[typeTask].intervalId);

        delete this.objActiveTasks[typeTask][intervalId];
        alert(`${typeTask} id ${intervalId} deleted!`);
    }

    offAllIsDrowMainContainer = () => {
        for (const typeTask in this.objActiveTasks) {
            if (Object.hasOwnProperty.call(this.objActiveTasks, typeTask)) {
                const listIntervals = this.objActiveTasks[typeTask];
                
                for (const intervalId in listIntervals) {
                    if (Object.hasOwnProperty.call(listIntervals, intervalId)) {
                        const task = listIntervals[intervalId];
                        
                        task.isDrowMainContainer = false;
                    }
                }
            }
        }
    }
    toggleIsDrowMainContainer = (typeTask, intervalId) => {
        this.objActiveTasks[typeTask][intervalId] = {
            ...this.objActiveTasks[typeTask][intervalId],
            isDrowMainContainer: !this.objActiveTasks[typeTask][intervalId].isDrowMainContainer
        }
    }

    drow = (containerSelector, time) => {
        // console.log(`hours: ${time.hours}, minutes: ${time.minutes}`);
        
        // hoursElement.textContent = hours;
        // minutesElement.textContent = minutes;
        // secondsElement.textContent = seconds;

        const wrapperTime = document.querySelector(containerSelector);

        const hours = wrapperTime.querySelector(`${containerSelector} > .hours`);
        const minutes = wrapperTime.querySelector(`${containerSelector} > .minutes`);
        const seconds = wrapperTime.querySelector(`${containerSelector} > .seconds`);

        hours.textContent = time.hours;
        minutes.textContent = time.minutes;
        seconds.textContent = time.seconds;
        
        // wrapperTime.innerHTML = `
        //     <div class="hours">
        //         <span>${time.hours}</span>
        //     </div>
        //     :
        //     <div class="minutes">
        //         <span>${time.minutes}</span>
        //     </div>
        //     :
        //     <div class="seconds">
        //         <span>${time.seconds}</span>
        //     </div>

        //     ${(time.hasOwnProperty("milliseconds")) ? `
        //         <div class="seconds">
        //             <span>${time.milliseconds}</span>
        //         </div>
        //     `: ""}
        // `;
    }

    _initContainerTime = (containerSelector) => {
        const wrapperTime = document.querySelector(containerSelector);
        
        const hours = document.createElement("div"),
              minutes = document.createElement("div"),
              seconds = document.createElement("div"),
              colon = document.createTextNode(":");

        hours.classList.add("hours");
        minutes.classList.add("minutes");
        seconds.classList.add("seconds");

        wrapperTime.append(hours);
        wrapperTime.append(colon.cloneNode());
        wrapperTime.append(minutes);
        wrapperTime.append(colon.cloneNode());
        wrapperTime.append(seconds);
    }

    getObjTime = (timeMs, isNeedSeconds = true, isNeedMilliseconds = false) => {
        const result = {
            hours: this.getZero(Math.floor(timeMs / (1000 * 60 * 60) % 24)),
            minutes: this.getZero(Math.floor(timeMs / (1000 * 60) % 60))
        }
        if(isNeedSeconds) {
            result.seconds = this.getZero(Math.floor(timeMs / 1000 % 60));
        }
        if(isNeedMilliseconds) {
            result.milliseconds = this.getZero(Math.floor((timeMs % 1000) / 10));
        }

        return result;
    }

    getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
}

export default AlarmsClass;