"use strict";
import createClock from "./modules/clock/clock";
import {clearClockElement} from "./modules/tech functions/clearClockElement";
import AlarmsClass from "./modules/alarmsClass/AlarmsClass"
import clockList from "./modules/clock-list/clock-list";

window.addEventListener("DOMContentLoaded", function () {
    const clockElement = document.querySelector("#clock");
    if (!clockElement) {
        throw new Error("There is no clockElement at page.");
    }

    const alarm = new AlarmsClass("", "#clock");
    
    // clearClockElement(clockElement);
    // createClock(clockElement);
    alarm._setIntervalClock(3);
    console.log(alarm.objActiveTasks)
    this.setInterval(() => {
        clockList(".active-tasks", alarm.objActiveTasks)
    }, 2500);
});