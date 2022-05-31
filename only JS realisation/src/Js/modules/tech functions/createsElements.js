function createButton(internalText, classText = "start-button") {
    const startButton = document.createElement("button");
    startButton.className = classText;
    startButton.textContent = internalText;

    return startButton;
}

function createSpans(clockElement) {
    clockElement.querySelectorAll("div").forEach(element => {
        element.innerHTML = "<span></span>";
    });
}

export {createButton, createSpans};