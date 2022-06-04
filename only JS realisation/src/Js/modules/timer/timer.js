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
<<<<<<< Updated upstream
    containerElement.appendChild(startBtn);
=======
    const stopBtn = createButton("stop timer");
    containerElement.append(startBtn);

    // own slider
    // createHoursSlider(hoursWrap);
    // createMinutesSlider(minutesWrap);
    // createSecondsSlider(secondsWrap);


    // clone another slider
    let currentHour = 0;
    let currentMinute = 0;
    let currentSecond = 0;
    
    let hoursSelector;
    let minutesSelector;
    let secondsSelector;
    
    let hourseSource = getHours();
    let minutesSource = getMinutes();
    let secondsSource = getSeconds();
    
    hoursSelector = new IosSelector({
        el: '.hours',
        type: 'infinite',
        source: hourseSource,
        count: 20,
        onChange: (selected) => {
            currentHour = selected.value;
            console.log(hoursSelector.value, minutesSelector.value, secondsSelector.value);
        }
    });
    
    minutesSelector = new IosSelector({
        el: '.minutes',
        type: 'infinite',
        source: minutesSource,
        count: 20,
        onChange: (selected) => {
            currentMinute = selected.value;
            console.log(hoursSelector.value, minutesSelector.value, secondsSelector.value);
        }
    });
    
    secondsSelector = new IosSelector({
        el: '.seconds',
        type: 'infinite',
        source: secondsSource,
        count: 20,
        onChange: (selected) => {
            currentSecond = selected.value;
            console.log(hoursSelector.value, minutesSelector.value, secondsSelector.value);
        }
    });

>>>>>>> Stashed changes

    createHoursSlider(hoursWrap);
    createMinutesSlider(minutesWrap);
    createSecondsSlider(secondsWrap);

    startBtn.addEventListener("click", startTimer);

    changeTabs(intervalID, containerElement, "timer");
    
    function startTimer() {
        let remainedTime = getStartTime();

<<<<<<< Updated upstream
        startBtn.removeEventListener("click", startTimer)
        clearClockElement(containerElement);
=======
        startBtn.removeEventListener("click", startTimer);
        startBtn.remove();
        clearClockElement(containerElement); 
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            stopBtn.removeEventListener("click", techStopTimer);
=======
            stopBtn.removeEventListener("click", techStopTimer); 
            stopBtn.remove();
>>>>>>> Stashed changes
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