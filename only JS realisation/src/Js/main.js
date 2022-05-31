"use strict";
import clock from "./modules/clock/clock";
import setTimeAtPage from "./modules/time/setTimeAtPage";
import createTimer from "./modules/timer/timer";
import {removeUnnecessary} from "./modules/tech functions/removeUnnecessary";

window.addEventListener("DOMContentLoaded", function () {
    const tabsElement = document.querySelector("header");
    let activeTab = "time";
    let intervalID = null;
    const clockElement = document.querySelector("#clock");

    if (!clockElement) {
        throw new Error("There is no clockElement at page.");
    }

    tabsElement.addEventListener("click", (event) => {
        if( event
            && event.target
            && event.target.tagName == "DIV"
            && event.target.textContent.toLowerCase() !== activeTab
        ) {
            activeTab = event.target.textContent.toLowerCase();
            
            switch(activeTab) {
                case "time": {
                    resetClockInterval();
                    removeUnnecessary(clockElement);
                    intervalID = clock(clockElement);
                    break;
                }

                case "alarm clock": {
                    resetClockInterval();
                    removeUnnecessary(clockElement);

                    break;
                }

                case "stopwatch": {
                    resetClockInterval();
                    removeUnnecessary(clockElement);

                    break;
                }

                case "timer": {
                    resetClockInterval();
                    removeUnnecessary(clockElement);
                    createTimer(clockElement);

                    break;
                }
            }
        }
    })
    
    intervalID = clock(clockElement);

    function resetClockInterval() {
        if(intervalID) {
            clearInterval(intervalID);
            intervalID = null;
        }
    }
});