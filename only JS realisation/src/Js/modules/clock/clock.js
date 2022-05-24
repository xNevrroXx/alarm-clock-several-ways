import setTimeAtPage from "../time/setTimeAtPage";

function clock(clockElement, isResetToZero) {
    let date = new Date().getTime() + (1000 * 60 * 60 * 3);
    let interval = null;

    setTimeAtPage(clockElement, date);

    interval = setInterval(() => {
        date = new Date().getTime() + (1000 * 60 * 60 * 3);

        setTimeAtPage(clockElement, date);
    }, Math.floor(date / 1000 % 60))

    // clearInterval(interval);
    console.log(interval)
    return interval;
}

export default clock;