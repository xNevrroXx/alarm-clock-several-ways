"use strict";
import createClock from "./modules/clock/clock";
import {clearClockElement} from "./modules/tech functions/clearClockElement";

window.addEventListener("DOMContentLoaded", function () {
    const clockElement = document.querySelector(".date-selector");

    if (!clockElement) {
        throw new Error("There is no clockElement at page.");
    }

    
    clearClockElement(clockElement);
    createClock(clockElement);
});