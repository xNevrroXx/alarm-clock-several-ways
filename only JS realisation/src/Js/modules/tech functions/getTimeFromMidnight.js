function getTimeFromMidnightMs(dateMs) {
    const countPastDays = Math.floor((dateMs + (1000*60*60*3)) / (1000 * 60 * 60 * 24));
    const result = (dateMs + (1000*60*60*3)) - (countPastDays * 1000 * 60 * 60 * 24);

    return result;
}

export {getTimeFromMidnightMs}