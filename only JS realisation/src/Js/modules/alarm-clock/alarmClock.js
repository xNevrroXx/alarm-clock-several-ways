import changeTabs from "../tech functions/changeTabs";
import {createButton, createSpans} from "../tech functions/createElements";
import { clearClockElement } from "../tech functions/clearClockElement";
import {createHoursSlider, createMinutesSlider, createSecondsSlider} from "../slider for time/slider";

function createAlarmClock(containerElement) {
    const hoursWrap = containerElement.querySelector(".hours");
    const minutesWrap = containerElement.querySelector(".minutes");
    const secondsWrap = containerElement.querySelector(".seconds");
    const setAlarm = createButton("set an alarm");
    let intervalID = null;

    createSpans(containerElement);

    createHoursSlider(hoursWrap);
    createMinutesSlider(minutesWrap);
    createSecondsSlider(secondsWrap);

    containerElement.appendChild(setAlarm);

    changeTabs(intervalID, containerElement, "alarm clock");
}

export default createAlarmClock;