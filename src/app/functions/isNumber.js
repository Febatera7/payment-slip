function isNumber(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
}

module.exports = isNumber;
