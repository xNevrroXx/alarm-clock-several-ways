"use strict";
import clock from "./modules/clock/clock";
import createTimer from "./modules/timer/timer";

window.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelector("header");
    let activeTab = "time";
    let clockInterval = null;
    const clockElement = document.querySelector("#clock");    

    if (!clockElement) {
        throw new Error("There is no clockElement at page");
    }

    tabs.addEventListener("click", (event) => {
        if(event && event.target && event.target.tagName == "DIV") {
            activeTab = event.target.textContent.toLowerCase();
            
            switch(activeTab) {
                case "time": {
                    clearClockInterval();
                    clockInterval = clock(clockElement);
                    
                    break;
                }

                case "alarm clock": {
                    clearClockInterval();

                    break;
                }

                case "stopwatch": {
                    clearClockInterval();

                    break;
                }

                case "timer": {
                    clearClockInterval();
                    createTimer(clockElement);

                    break;
                }
            }
        }
    })


    clockInterval = clock(clockElement);


    // functions
    function clearClockInterval() {
        if(clockInterval) {
            clearInterval(clockInterval);
            clockInterval = null;
        }
    }
});
