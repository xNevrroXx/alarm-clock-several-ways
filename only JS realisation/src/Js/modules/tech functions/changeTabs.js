import createClock from "../clock/clock";
import setTimeAtPage from "../time/setTimeAtPage";
import createTimer from "../timer/timer";
import createStopwatch from "../stopwatch/stopwatch";
import initSlider from "../alarm-clock/initSlider";
import {clearClockElement} from "./clearClockElement";
import AlarmsClass from "../alarmsClass/AlarmsClass";

function changeTabs(/* intervalID */ clockElement, currentTab, alarm) {
    let activeTab = currentTab;
    const tabsElement = document.querySelector("header");
    
    initNewTab(activeTab);
    tabsElement.addEventListener("click", handler);

    function handler(event) {
        if( event
            && event.target
            && event.target.tagName == "DIV"
            && event.target.textContent.toLowerCase() !== activeTab
        ) {
            // tabsElement.removeEventListener("click", handler);

            /* if(intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            } */    
            console.log("this tab: ", event.target.textContent.toLowerCase())
            initNewTab(event.target.textContent.toLowerCase());
            // tabsElement.addEventListener("click", handler);
        }
    }

    function initNewTab(nameNewTab) {
        activeTab = nameNewTab;

        console.log(activeTab)
        switch(activeTab) {
            case "time": {
                alarm.offAllIsDrowMainContainer();
                /* 
                    добавить выбор региона или хотя бы часового пояса относительно гринвича
                */
                alarm._setIntervalClock(3);
                break;
            }

            case "alarm clock": {
                alarm.offAllIsDrowMainContainer();
                // clearClockElement(clockElement);
                // createAlarmClock(clockElement);

                /* 
                    добавить слайдер
                */
                initSlider("#clock", (timeMs) => alarm._setIntervalAlarm(timeMs), "alarm")
                break;
            }

            case "stopwatch": {
                alarm.offAllIsDrowMainContainer();
                // clearClockElement(clockElement);
                // createStopwatch(clockElement);

                /* 
                    добавить кнопку пуска и паузы
                */
                alarm._setIntervalStopwatch();

                break;
            }

            case "timer": {
                alarm.offAllIsDrowMainContainer();
                // clearClockElement(clockElement);
                // createTimer(clockElement);

                /* 
                    добавить слайдер
                */
                initSlider("#clock", (timeMs) => alarm._setIntervalTimer(timeMs), "timer")
                
                break;
            }
        }
    }
}

export default changeTabs;