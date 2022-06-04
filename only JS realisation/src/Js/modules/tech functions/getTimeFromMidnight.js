function getTimeFromMidnightMs(date) {
    const countPastDays = Math.floor((date.getTime() + (1000*60*60*3)) / (1000 * 60 * 60 * 24));
    const result = (date.getTime() + (1000*60*60*3)) - (countPastDays * 1000 * 60 * 60 * 24);

    return result;
}

export {getTimeFromMidnightMs}