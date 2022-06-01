
import createClock from "../clock/clock";
import setTimeAtPage from "../time/setTimeAtPage";
import createTimer from "../timer/timer";
import createStopwatch from "../stopwatch/stopwatch";
import {clearClockElement} from "./clearClockElement";
import createAlarmClock from "../alarm-clock/alarmClock";

function changeTabs(intervalID, clockElement, currentTab) {
    const activeTab = currentTab;
    const tabsElement = document.querySelector("header");

    tabsElement.addEventListener("click", handler);

    function handler(event) {
        if( event
            && event.target
            && event.target.tagName == "DIV"
            && event.target.textContent.toLowerCase() !== activeTab
        ) {
            tabsElement.removeEventListener("click", handler);

            if(intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }

            switch(event.target.textContent.toLowerCase()) {
                case "time": {
                    clearClockElement(clockElement);
                    createClock(clockElement);
                    break;
                }

                case "alarm clock": {
                    clearClockElement(clockElement);
                    createAlarmClock(clockElement);

                    break;
                }

                case "stopwatch": {
                    clearClockElement(clockElement);
                    createStopwatch(clockElement);

                    break;
                }

                case "timer": {
                    clearClockElement(clockElement);
                    createTimer(clockElement);

                    break;
                }
            }
        }
    }
}

export default changeTabs;