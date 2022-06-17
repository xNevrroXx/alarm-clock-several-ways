"use strict";
import changeTabs from "./modules/tech functions/changeTabs";
import AlarmsClass from "./modules/alarmsClass/AlarmsClass";

window.addEventListener("DOMContentLoaded", function () {
    const clockElement = document.querySelector("#clock");
    if (!clockElement) {
        throw new Error("There is no clockElement at page.");
    }
    
    // clearClockElement(clockElement);
    // createClock(clockElement);
    
    const alarm = new AlarmsClass(".active-tasks", "#clock");
    changeTabs("#clock", "time", alarm)
});