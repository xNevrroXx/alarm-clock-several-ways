function getCountPixels(element, property) {
    const valueStr = window.getComputedStyle(element)[property];
    
    return valueStr.match(/^[0-9]{1,}/);
}

export default getCountPixels;