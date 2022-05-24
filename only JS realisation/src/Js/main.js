"use strict";
import clock from "./modules/clock/clock";
import setTimeAtPage from "./modules/time/setTimeAtPage";
import createTimer from "./modules/timer/timer";

window.addEventListener("DOMContentLoaded", function () {
    const tabsElement = document.querySelector("header");
    let activeTab = "time";
    let clockInterval = null;
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
                    resetClock();
                    clockInterval = clock(clockElement);
                    
                    break;
                }

                case "alarm clock": {
                    resetClock();

                    break;
                }

                case "stopwatch": {
                    resetClock();

                    break;
                }

                case "timer": {
                    resetClock();
                    createTimer(clockElement);

                    break;
                }
            }
        }
    })


    clockInterval = clock(clockElement);


    // functions
    function resetClock() {
        if(clockInterval) {
            clearInterval(clockInterval);
            clockInterval = null;
        }

        clockElement.querySelectorAll("div").forEach(elem => {
            elem.innerHTML = "";
        })
    }
});
