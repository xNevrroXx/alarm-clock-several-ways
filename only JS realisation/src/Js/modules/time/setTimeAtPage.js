"use strict";

import getZero from "../tech functions/getZero";

function setTimeAtPage(containerElement, timeMs, isMsElement = false) {
    const hoursElement = containerElement.querySelector(".hours > span");
    const minutesElement = containerElement.querySelector(".minutes > span");
    const secondsElement = containerElement.querySelector(".seconds > span");
    
    const hours = getZero(Math.floor(timeMs / (1000 * 60 * 60) % 24));
    const minutes = getZero(Math.floor(timeMs / (1000 * 60) % 60));
    const seconds = getZero(Math.floor(timeMs / 1000 % 60));
    
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;

    if(isMsElement) {
        const millisecondsElement = containerElement.querySelector(".milliseconds > span");
        const milliseconds = getZero(Math.floor((timeMs % 1000) / 10));
        
        millisecondsElement.textContent = milliseconds;
    }
}

export default setTimeAtPage;
