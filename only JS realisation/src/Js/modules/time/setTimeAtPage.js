"use strict";

import getZero from "../tech functions/getZero";

function setTimeAtPage(containerElement, timeMs) {
    const hoursElement = containerElement.querySelector(".hours");
    const minutesElement = containerElement.querySelector(".minutes");
    const secondsElement = containerElement.querySelector(".seconds");
    
    const hours = getZero(Math.floor(timeMs / (1000 * 60 * 60) % 24));
    const minutes = getZero(Math.floor(timeMs / (1000 * 60) % 60));
    const seconds = getZero(Math.floor(timeMs / 1000 % 60));
    
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
}

export default setTimeAtPage;
