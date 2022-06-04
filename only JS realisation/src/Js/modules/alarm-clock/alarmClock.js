import changeTabs from "../tech functions/changeTabs";
import { createButton, createSpans } from "../tech functions/createElements";
import { clearClockElement } from "../tech functions/clearClockElement";
import { createHoursSlider, createMinutesSlider, createSecondsSlider } from "../slider for time/slider";
import { getTimeFromMidnightMs } from "../tech functions/getTimeFromMidnight";

function createAlarmClock(containerElement) {
    clearClockElement(containerElement)

    const hoursWrap = containerElement.querySelector(".hours");
    const minutesWrap = containerElement.querySelector(".minutes");
    const secondsWrap = containerElement.querySelector(".seconds");
    const setAlarmBtn = createButton("set an alarm");
    let intervalID = null;

    createSpans(containerElement);

    createHoursSlider(hoursWrap);
    createMinutesSlider(minutesWrap);
    createSecondsSlider(secondsWrap);

    containerElement.append(setAlarmBtn);

    setAlarmBtn.addEventListener("click", setAlarm);

    changeTabs(intervalID, containerElement, "alarm clock");
    
    function setAlarm() {
        const alertTimeMs = getAlertTime();

        const nowHours = new Date().getHours();
        const nowMinutes = new Date().getMinutes();
                
        let remainedTime = 0;

        if(getTimeFromMidnightMs(new Date()) > alertTimeMs) {
            const timeToMidnightMs = (1000 * 60 * 60 * 24) - getTimeFromMidnightMs(new Date());
            
            remainedTime = timeToMidnightMs;
            remainedTime += alertTimeMs;
        } else {
            remainedTime = alertTimeMs - getTimeFromMidnightMs(new Date());
            console.log(remainedTime);
        }
        
        intervalID = setInterval(() => {
            remainedTime = 1000 * 60 * 60 * 24;
            alert("hello");
        }, remainedTime)

        createAlarmClock(containerElement);
    }
    function getAlertTime() {
        let hours = hoursWrap.querySelector(".clock__wrapper-slider > span.active"),
            minutes = minutesWrap.querySelector(".clock__wrapper-slider > span.active"),
            seconds = secondsWrap.querySelector(".clock__wrapper-slider > span.active");

        
        return ((+hours.textContent * 1000 * 60 * 60) + (+minutes.textContent * 1000 * 60) + (+seconds.textContent * 1000));
    }
}

export default createAlarmClock;