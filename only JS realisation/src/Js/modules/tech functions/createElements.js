function createButton(internalText, classText = "start-button") {
    const startButton = document.createElement("button");
    startButton.className = classText;
    startButton.textContent = internalText;

    return startButton;
}

function createSpans(clockElement) {
    clockElement.querySelectorAll("div").forEach(element => {
        element.innerHTML = "<span>00</span>";
    });
}

function createMsElement(containerElement) {
    const msElement = document.createElement("div");
    msElement.className = "milliseconds";

    containerElement.insertAdjacentHTML("beforeend", ":");
    containerElement.appendChild(msElement);
}

export {createButton, createSpans, createMsElement};