import getZero from "../tech functions/getZero";

function createSlider(containerElement, maxValue) {
    setValuesAtPage();

    function setValuesAtPage() {
        for (let i = Math.floor(-maxValue*1); i <= Math.floor(maxValue * 1); i++) {
            const value = i < 0 ? ((i * -1) % maxValue) : (i % maxValue);
            // console.log(i % maxValue)
            containerElement.insertAdjacentHTML("beforeend", 
                `<span data-index=${i} class=${i == 0 ? "active" : ""}>${getZero(value)}</span>`
            );
        }
    }
}

function createHoursSlider(containerHoursElement) {
    createSlider(containerHoursElement, 24);
}
function createMinutesSlider(containerMinutesElement) {
    createSlider(containerMinutesElement, 60);
}
function createSecondsSlider(containerSecondsElement) {
    createSlider(containerSecondsElement, 60);
}

export default createSlider;
export {createHoursSlider, createMinutesSlider, createSecondsSlider};