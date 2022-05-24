import setTimeAtPage from "./modules/time/setTimeAtPage";

window.addEventListener("DOMContentLoaded", () => {
    const clockElement = document.querySelector("#clock") as null | HTMLElement;
    const date = new Date().getSeconds() - (new Date().getTimezoneOffset() * 60);
    console.log(date)
    if(clockElement) {
        setTimeAtPage(clockElement);
    }
    else {
        throw new Error("There is no clockElement at page")
    }

    
})