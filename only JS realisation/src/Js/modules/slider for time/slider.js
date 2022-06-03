import getCountPixels from "../tech functions/getCountPixels";
import getZero from "../tech functions/getZero";

function createSlider(containerElement, maxValue, defaultActiveNumber = 0) {
    containerElement.innerHTML = "<div class='clock__wrapper-slider'></div>";
    const wrapperSlides = containerElement.querySelector(".clock__wrapper-slider");
    const startOffset = wrapperSlides.scrollTop;
    let activeNumber = defaultActiveNumber;
    let activeIndexNumber = defaultActiveNumber;

    for (var i = -maxValue + 1; i <= maxValue; i++) {
        let value;
        if(i < 0) value = maxValue - -i;
        else if (i == maxValue) value = 0;
        else value = i;

        wrapperSlides.insertAdjacentHTML("beforeend",
            `   <span
                    data-index=${i}
                    class=${i == 0 ? "active" : ""}
                >${getZero(value)}</span>
            `
        );
    }

    const activeElement = wrapperSlides.querySelector('span.active');
    activeElement.scrollIntoView(true);
    wrapperSlides.style.scrollBehavior = "smooth"; // for some reason, I get bug with this style in css file

    wrapperSlides.addEventListener("click", changeSlide);

    
    wrapperSlides.addEventListener("wheel", setActiveOnWheel);
    // wrapperSlides.addEventListener("scroll", console.log)

    let isWheelNow = false;
    let countWheel = 0;

    function setActiveOnWheel(event) { // set alignment an element and set style of activity
        event.preventDefault();

        const heightChild = getCountPixels(wrapperSlides.querySelector("span"), "height");
        const remainedToTarget = (wrapperSlides.scrollTop - startOffset) % heightChild /* * (event.deltaY / 100) */;

        // if(remainedToTarget >= 60) wrapperSlides.querySelector("span.active").scrollBy(0, remainedToTarget);
        // else wrapperSlides.querySelector("span.active").scrollBy(0, -remainedToTarget);
        
        // if(remainedToTarget >= 60) wrapperSlides.querySelector("span.active + span").classList.add("active")
        // else wrapperSlides.querySelector("span.active + span").scrollIntoView(true);

        if(event.deltaY > 0)
            this.scrollBy({
                top: getCountPixels(this.querySelector("span"), "height"),
                behavior: 'smooth'
            })
        else 
            this.scrollBy({
                top: -1 * getCountPixels(this.querySelector("span"), "height"),
                behavior: 'smooth'
            });

        // console.log(remainedToTarget)
        // console.log(wrapperSlides.scrollTop)
    }
    function setVerticalWheel(e, element, sprayingTime = 15, maxCoefficient = sprayingTime/2) {
        e.preventDefault();
    
        let sprayingCoefficient = 40;
        let delta = Math.max(-1, Math.min(1, e.deltaY || e.detail || -e.wheelDelta));
    
        const looping = () => {
            this.scrollBy({
                top: delta * sprayingCoefficient,
            });
            console.log(delta * sprayingCoefficient)
            if(--sprayingTime <= 0) return;
            
            if(maxCoefficient == 0 && sprayingCoefficient > maxCoefficient) {
                --sprayingCoefficient;
            }
            else if(sprayingCoefficient++ > maxCoefficient) maxCoefficient = 0;

            looping();
        }
    
        looping();
    }

    function changeSlide(event) {
        if(event && event.target && event.target.tagName == "SPAN") {
            const target = event.target;

            let countScrollable = +target.getAttribute("data-index")-activeIndexNumber;
            activeIndexNumber += countScrollable;
            const listSpans = Array.from( this.querySelectorAll("span") );
            const listMovedElems = [];
            
            if(countScrollable < 0) {
                for (let i = listSpans.length - 1; i > listSpans.length - 1 + countScrollable; i--) {
                    const element = listSpans[i];
                    
                    element.remove();
                    listMovedElems.push(element);
                    
                    this.prepend(element);
                }
            }
            else {            
                for (let i = 0; i < countScrollable; i++) {
                    const element = listSpans[i];
                    
                    element.remove();
                    listMovedElems.push(element);
                    
                    this.append(element);
                }
            }

            activeNumber = target.textContent;
            wrapperSlides.querySelectorAll("span").forEach(element => {
                element.classList.remove("active");
            });

            target.classList.add("active");
            wrapperSlides.querySelector(`span[data-index="${activeIndexNumber === 0 ? (maxValue - 1) : activeIndexNumber - 1}"]`).scrollIntoView(true);
        }
    }
}

// supporting unnecessary functions
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