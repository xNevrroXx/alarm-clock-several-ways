import { createButton } from "../tech functions/createElements";
import { createSpans, createMsElement } from "../tech functions/createElements";
import setTimeAtPage from "../time/setTimeAtPage";
import changeTabs from "../tech functions/changeTabs";

function createStopwatch(containerElement) {
    createMsElement(containerElement);

    const hoursWrap = containerElement.querySelector(".hours");
    const minutesWrap = containerElement.querySelector(".minutes");
    const secondsWrap = containerElement.querySelector(".seconds");
    const millisecondWrap = containerElement.querySelector(".milliseconds");
    const startBtn = createButton("start timer");
    const stopBtn = createButton("stop button");
    let time = 0;
    let intervalID = null;

    createSpans(containerElement);
    containerElement.appendChild(startBtn);

    setTimeAtPage(containerElement, time);
    startBtn.addEventListener("click", startStopwatch);

    changeTabs(intervalID, containerElement, "stopwatch");

    function startStopwatch() {
        startBtn.removeEventListener("click", startStopwatch);
        startBtn.remove();

        containerElement.appendChild(stopBtn);
        stopBtn.addEventListener("click", stopStopwatch);

        intervalID = setInterval(() => {
            time += 10;
            setTimeAtPage(containerElement, time, true);
        }, 10)
        
        changeTabs(intervalID, containerElement, "stopwatch");
    }

    function stopStopwatch() {
        clearInterval(intervalID);
        stopBtn.removeEventListener("click", stopStopwatch);
        stopBtn.remove();

        containerElement.appendChild(startBtn);
        startBtn.addEventListener("click", startStopwatch);

        // time = 0;
        // setTimeAtPage(containerElement, time);
    }
}

export default createStopwatch;