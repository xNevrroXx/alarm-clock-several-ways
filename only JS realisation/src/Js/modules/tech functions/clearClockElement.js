// functions
function clearClockElement(clockElement) {
    clockElement.querySelectorAll("*").forEach(elem => elem.remove());
    
    clockElement.innerHTML = `<div class="hours"></div>:<div class="minutes"></div>:<div class="seconds"></div>`;
}

export {clearClockElement}