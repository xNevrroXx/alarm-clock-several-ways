import { createSpans } from "../tech functions/createsElements";
import setTimeAtPage from "../time/setTimeAtPage";

function clock(clockElement) {
    let date = new Date().getTime() + (1000 * 60 * 60 * 3);
    let intervalID = null;
    
    createSpans(clockElement);

    setTimeAtPage(clockElement, date);
    intervalID = setInterval(() => {
        date = new Date().getTime() + (1000 * 60 * 60 * 3);

        setTimeAtPage(clockElement, date);
    }, Math.floor(date / 1000 % 60))
    
    return intervalID;
}

export default clock;