import { createSpans } from "../tech functions/createElements";
import setTimeAtPage from "../time/setTimeAtPage";
import changeTabs from "../tech functions/changeTabs";

function createClock(clockElement) {
    let date = new Date().getTime() + (1000 * 60 * 60 * 3);
    let intervalID = null;
    
    createSpans(clockElement);

    setTimeAtPage(clockElement, date);
    intervalID = setInterval(() => {
        date = new Date().getTime() + (1000 * 60 * 60 * 3);

        setTimeAtPage(clockElement, date);
    }, Math.floor(date / 1000 % 60))
    
    changeTabs(intervalID, clockElement, "time");
}

export default createClock;