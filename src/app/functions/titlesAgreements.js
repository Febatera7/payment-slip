function titlesAgreements(number) {
    const barCode = generateBarCode(number);
    const amount = ticketValue(number);
    const expirationDate = generateExpirationDate(number);

    return {
        barCode,
        amount,
        expirationDate
    }
}

function generateBarCode(number) {
    let newCode;

    newCode = generateTicket(number);
    newCode = newCode.split('');
    newCode.splice(4, 1);
    newCode = newCode.join('');
    const dv = number[2] === '6' || number[2] === '7' ? calculateMod10(newCode) : calculateMod11(newCode);
    newCode = newCode.substring(0, 4) + dv + newCode.substring(4);

    return newCode;

};

function calculateMod11(newcode) {
    const sequel = [4, 3, 2, 9, 8, 7, 6, 5];
    let d = 0;
    let j = 0;

    for (let i = 0; i < newcode.length; i++) {
        let mult = sequel[j];
        j++;
        j %= sequel.length;
        d += mult * parseInt(newcode.charAt(i));
    }

    const DAC = d % 11;

    if (DAC === 0 || DAC === 1)
        return 0;
    if (DAC === 10)
        return 1;

    return (11 - DAC);
}

function calculateMod10(newcode) {
    let i;
    let mult = 2;
    let sum = 0;
    let s = '';

    for (i = newcode.length - 1; i >= 0; i--) {
        s = (mult * parseInt(newcode.charAt(i))) + s;
        if (--mult < 1) {
            mult = 2;
        }
    }
    for (i = 0; i < s.length; i++) {
        sum = sum + parseInt(s.charAt(i));
    }
    sum = sum % 10;
    if (sum !== 0) {
        sum = 10 - sum;
    }
    return sum;
}

function generateTicket(number) {
    number = number.split('');
    number.splice(11, 1);
    number.splice(22, 1);
    number.splice(33, 1);
    number.splice(44, 1);
    number = number.join('');

    const result = number;

    return result;
}

function ticketValue(number) {

    let ticketValue = number.slice(4, 16);

    ticketValue = ticketValue.split('', 12);

    ticketValue.splice(7, 1);

    ticketValue = ticketValue.join('');

    const amountFixed = parseInt(ticketValue).toFixed();

    const amountCents = Math.floor(amountFixed.length - 2);

    const amount = amountFixed.substring(0, amountCents) + '.' + amountFixed.substring(amountCents);

    return amount;
};

function generateExpirationDate(number) {
    const dueDateFactor = number.slice(34, 38);

    const baseDate = new Date('10/07/1997');
    baseDate.setTime(baseDate.getTime() + (dueDateFactor * 24 * 60 * 60 * 1000));
    const formatedDate =
        `${baseDate.getFullYear()}-${("0" + (baseDate.getMonth() + 1)).slice(-2)}-${("0" + (baseDate.getDate() + 1)).slice(-2)}`;

    return formatedDate;
}

module.exports = titlesAgreements;
