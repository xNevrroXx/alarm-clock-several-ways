import changeTabs from "../tech functions/changeTabs";
import { createButton, createSpans } from "../tech functions/createElements";
import { clearClockElement } from "../tech functions/clearClockElement";
import { createHoursSlider, createMinutesSlider, createSecondsSlider } from "../slider for time/slider";

function initSlider(containerSelector, funcInitTask, taskStr) { // create slider for timer OR alarm
    const containerElement = document.querySelector(containerSelector);
    clearClockElement(containerElement)

    const hoursWrap = containerElement.querySelector(".hours");
    const minutesWrap = containerElement.querySelector(".minutes");
    const secondsWrap = containerElement.querySelector(".seconds");
    const setTaskBtn = taskStr === "alarm" ? createButton("set an alarm") : createButton("set an timer");
    let intervalID = null;

    createSpans(containerElement);

    createHoursSlider(hoursWrap);
    createMinutesSlider(minutesWrap);
    createSecondsSlider(secondsWrap);

    containerElement.append(setTaskBtn);

    setTaskBtn.addEventListener("click", startTask);

    if(taskStr === "alarm") {
        changeTabs(intervalID, containerElement, "alarm clock");
    }
    else {
        changeTabs(intervalID, containerElement, "timer");
    }
    
    function startTask() {
        const alertTimeMs = getAlertTime();

        funcInitTask(alertTimeMs);
    }

    function getAlertTime() {
        let hours = hoursWrap.querySelector(".clock__wrapper-slider > span.active"),
            minutes = minutesWrap.querySelector(".clock__wrapper-slider > span.active"),
            seconds = secondsWrap.querySelector(".clock__wrapper-slider > span.active");

        
        return ((+hours.textContent * 1000 * 60 * 60) + (+minutes.textContent * 1000 * 60) + (+seconds.textContent * 1000));
    }
}

export default initSlider;