import getCountPixels from "../tech functions/getCountPixels";
import getZero from "../tech functions/getZero";

function createSlider(containerElement, maxValue) {
    containerElement.innerHTML = "<div class='clock__wrapper-slider'></div>";
    const wrapperSlides = containerElement.querySelector(".clock__wrapper-slider");
    let numberActiveSlide = null;

    for (var i = Math.floor(-maxValue*1); i <= Math.floor(maxValue * 1); i++) {
        const value = i < 0 ? ((i * -1) % maxValue) : (i % maxValue);
        // console.log(i % maxValue)
        wrapperSlides.insertAdjacentHTML("beforeend",
            `   <span
                    data-index=${i}
                    style="order: ${i}"
                    class=${i == 0 ? "active" : ""}
                >${getZero(value)}</span>
            `
        );
    }
    wrapperSlides.querySelector(`span[data-index="0"]`).scrollIntoView(true);
    // wrapperSlides.scrollTop = getCountPixels(containerElement, "height") * i * 0.5;

    wrapperSlides.addEventListener('click', changeSlide);
    function changeSlide(event) {
        if(event && event.target && event.target.tagName == "SPAN") {
            const target = event.target;
            wrapperSlides.querySelectorAll("span").forEach(element => {
                element.classList.remove("active");
            });

            target.classList.add("active");
            target.scrollIntoView(true);
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