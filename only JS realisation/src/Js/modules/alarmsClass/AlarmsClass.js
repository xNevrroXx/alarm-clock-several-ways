class AlarmsClass {
    constructor(containerActiveTasks, mainContainerSelector) {
        this.containerActiveTasks = containerActiveTasks;
        this.mainContainerSelector = mainContainerSelector;
    }

    objActiveTasks = {
        _clocks: {
            
        },
        _alarms: {
            /*  example
                intervalId */
                2: {
                    time: {
                        hours: 10,
                        minutes: 15
                    },
                    /* maybe add some settings of sound or something else */
                },
        },
        _stopwatches: {
            // intervalId: *сколько прошло времени
        },
        _timers : {
            // intervalId: *оставшееся время
        },

        get clocks() {
            return this._clocks;
        },
        get alarms() {
            return this._alarms;
        },
        get stopwatches() {
            return this._stowwatches;
        },
        get timers() {
            return this._timers;
        },
         
    }

    _setIntervalClock(UTCDeviation) {
        this._initContainerTime(this.mainContainerSelector);

        setTimeout(() => {
            this.drow( this.mainContainerSelector, this.getObjTime(new Date().getTime() + (1000 * 60 * 60 * UTCDeviation), false) );
            
            const intervalId = setInterval(() => {
                this.objActiveTasks._clocks[intervalId] = {
                    time: this.getObjTime(new Date().getTime() + (1000 * 60 * 60 * UTCDeviation), false) 
                }
    
                this.drow(this.mainContainerSelector, this.objActiveTasks._clocks[intervalId].time);
            }, 1000)
        }, Math.floor( new Date().getTime() % 1000 ));
    }

    _setIntervalAlarm = (alertTimeMs) => {
        let remainedTime = 0;

        if(getTimeFromMidnightMs(new Date()) > alertTimeMs) {
            const timeToMidnightMs = (1000 * 60 * 60 * 24) - getTimeFromMidnightMs(new Date());
            
            remainedTime = timeToMidnightMs;
            remainedTime += alertTimeMs;
            console.log(remainedTime)
        } else {
            remainedTime = alertTimeMs - getTimeFromMidnightMs(new Date());
            console.log(remainedTime);
        }
        
        alert(`The alarm will ring in: ${Math.floor(remainedTime / (1000 * 60 * 60))}h ${Math.floor(remainedTime / (1000 * 60) % 60)}m`); // create some nive notification

        const intervalId = setTimeout(() => {
            alert("hello"); // here will be some sound and graphic notification
            clearInterval(intervalId);
        }, remainedTime);

        this.objActiveTasks._alarms.push({
            intervalId,
            time: {
                hours: /* ... */ 1,
                minutes: /* ... */ 2
            }
        })

        createAlarmClock(containerElement);
    }

    _setIntervalTimer = (remainedTimeMs) => {
        const intervalId = setInterval(() => {
            if(remainedTimeMs == 0) {
                autoStopTimer();
                clearInterval(intervalID);
                return;
            }

            remainedTimeMs = remainedTimeMs - 1000;

            setTimeAtPage(containerElement, remainedTimeMs);
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

    _setIntervalStopwatch = () => {
        // startBtn.removeEventListener("click", startStopwatch);
        // startBtn.remove();
        // containerElement.appendChild(stopBtn);
        // stopBtn.addEventListener("click", stopStopwatch);

        const intervalId = setInterval(() => {
            time += 10;
            // setTimeAtPage(containerElement, time, true);

            
            this.objActiveTasks._stopwatches[intervalId] = {
                time: {
                    hours: Math.floor(time / (1000 * 60 * 60)),
                    minutes: Math.floor(time / (1000 * 60) % 60),
                    seconds: Math.floor(time / 1000 % 60)
                }
            }

            this.drow(mainContainerSelector, this.objActiveTasks._stopwatches[intervalId].time);
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

    getObjTime = (timeMs, isNeedMilliseconds) => {
        const result = {
            hours: this.getZero(Math.floor(timeMs / (1000 * 60 * 60) % 24)),
            minutes: this.getZero(Math.floor(timeMs / (1000 * 60) % 60)),
            seconds: this.getZero(Math.floor(timeMs / 1000 % 60))
        }

        if(isNeedMilliseconds) {
            result.milliseconds = this.getZero(Math.floor((timeMs % 1000) / 10))
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