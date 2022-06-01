import {createHoursSlider, createMinutesSlider, createSecondsSlider} from "../slider for time/slider";
import {createButton} from "../tech functions/createElements";
import {clearClockElement} from "../tech functions/clearClockElement";
import { createSpans } from "../tech functions/createElements";
import setTimeAtPage from "../time/setTimeAtPage";
import changeTabs from "../tech functions/changeTabs";

function createTimer(containerElement) {
    const hoursWrap = containerElement.querySelector(".hours");
    const minutesWrap = containerElement.querySelector(".minutes");
    const secondsWrap = containerElement.querySelector(".seconds");
    let intervalID = null;

    const startBtn = createButton("start timer");
    containerElement.appendChild(startBtn);

    createHoursSlider(hoursWrap);
    createMinutesSlider(minutesWrap);
    createSecondsSlider(secondsWrap);

    startBtn.addEventListener("click", startTimer);

    changeTabs(intervalID, containerElement, "timer");
    
    function startTimer() {
        let remainedTime = getStartTime();

        startBtn.removeEventListener("click", startTimer)
        clearClockElement(containerElement);
        createSpans(containerElement);

        const stopBtn = createButton("stop timer");
        containerElement.appendChild(stopBtn);
        
        setTimeAtPage(containerElement, remainedTime);
        intervalID = setInterval(() => {
            if(remainedTime == 0) {
                autoStopTimer();
                clearInterval(intervalID);
                return;
            }

            remainedTime = remainedTime - 1000;
            setTimeAtPage(containerElement, remainedTime);
        }, 1000)

        stopBtn.addEventListener("click", techStopTimer);


        // functions
        function techStopTimer() {
            stopBtn.removeEventListener("click", techStopTimer);
            clearClockElement(containerElement);

            clearInterval(intervalID);
            createTimer(containerElement);
        }

        function autoStopTimer() { //add some music, maybe animation
            techStopTimer();
        }

        function getStartTime() {
            let hours = hoursWrap.querySelector(".clock__wrapper-slider > span.active"),
                minutes = minutesWrap.querySelector(".clock__wrapper-slider > span.active"),
                seconds = secondsWrap.querySelector(".clock__wrapper-slider > span.active");

            return ((+hours.textContent * 1000 * 60 * 60) + (+minutes.textContent * 1000 * 60) + (+seconds.textContent * 1000));
        }
    }
}

export default createTimer;