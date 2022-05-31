// functions
function resetClock(clockElement) {
    clockElement.querySelectorAll("div").forEach(elem => {
        elem.innerHTML = "";
    })
}

function deleteBtn(clockElement) {
    const btn = clockElement.querySelector("button");

    if(btn) btn.remove();
}

function removeUnnecessary(clockElement) {
    resetClock(clockElement);
    deleteBtn(clockElement);
}

export {removeUnnecessary}