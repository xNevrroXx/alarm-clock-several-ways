import setTimeAtPage from "../time/setTimeAtPage";

function clock(clockElement) {
    let date = new Date().getTime() + (1000 * 60 * 60 * 3);
    let interval = null;

    clockElement.querySelectorAll("div").forEach(element => {
        element.innerHTML = "<span></span>";
    });

    setTimeAtPage(clockElement, date);
    interval = setInterval(() => {
        date = new Date().getTime() + (1000 * 60 * 60 * 3);

        setTimeAtPage(clockElement, date);
    }, Math.floor(date / 1000 % 60))
    
    return interval;
}

export default clock;