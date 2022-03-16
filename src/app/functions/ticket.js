function ticket(number) {
    const barCode = generateBarCode(number);

    const amount = generateValue(number);

    const expirationDate = generateExpirationDate(number);

    return {
        barCode,
        amount,
        expirationDate,
    };
}

function generateBarCode(number) {
    const dueDateFactor = number.slice(33, 37);
    const paymentValue = number.slice(37)
    const position20to24 = number.slice(4, 9);
    const position25to34 = number.slice(10, 20);
    const position35to44 = number.slice(21, 31);

    let ticketNumberWithoutDV = number.slice(0, 4)
        + dueDateFactor
        + paymentValue
        + position20to24
        + position25to34
        + position35to44;


    const ticketNumberWithoutDVLength = ticketNumberWithoutDV.length;

    let multiplicatorDV = 2;

    let dvSumFactory = 0;

    for (let index = 0; index < ticketNumberWithoutDVLength; index++) {
        const element = ticketNumberWithoutDV[ticketNumberWithoutDV.length - 1] * multiplicatorDV;

        ticketNumberWithoutDV = ticketNumberWithoutDV.substring(0, ticketNumberWithoutDV.length - 1);

        dvSumFactory += element;

        if (multiplicatorDV >= 9) {
            multiplicatorDV = 2;
        } else {
            multiplicatorDV++;
        }
    }

    const dvRestDivision = dvSumFactory % 11;

    let dv = 11 - dvRestDivision;

    if (dv === 0 || dv === 10 || dv === 11) dv = 1;

    const barCode = number.slice(0, 4)
        + dv
        + dueDateFactor
        + paymentValue
        + position20to24
        + position25to34
        + position35to44;

    return barCode;
}

function generateExpirationDate(number) {
    const dueDateFactor = number.slice(33, 37);

    const baseDate = new Date('10/07/1997');
    baseDate.setTime(baseDate.getTime() + (dueDateFactor * 24 * 60 * 60 * 1000));
    const formatedDate =
        `${baseDate.getFullYear()}-${("0" + (baseDate.getMonth() + 1)).slice(-2)}-${("0" + (baseDate.getDate() + 1)).slice(-2)}`;

    return formatedDate;
}

function generateValue(number) {
    const paymentValue = number.slice(37);

    const amountFixed = parseInt(paymentValue).toFixed();

    const amountCents = Math.floor(amountFixed.length - 2);

    const amount = amountFixed.substring(0, amountCents) + '.' + amountFixed.substring(amountCents);

    return amount;
}

module.exports = ticket;
