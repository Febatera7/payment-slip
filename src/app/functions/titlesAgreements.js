function titlesAgreements(number) {
    try {
        const barCode = generateBarCode(number);
        const amount = ticketValue(number);
        const expirationDate = generateExpirationDate(number);

        return {
            barCode,
            amount,
            expirationDate
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

function generateBarCode(number) {
    try {
        let newCode;

        newCode = generateTicket(number);
        newCode = newCode.split('');
        newCode.splice(4, 1);
        newCode = newCode.join('');
        const dv = number[3] === '6' || number[3] === '7' ? calculateMod10(newCode) : calculateMod11(newCode);
        newCode = newCode.substring(0, 4) + dv + newCode.substring(4);

        return newCode;

    } catch (err) {
        console.error(err.message);
        throw new Error('Erro ao gerar o código de barras');
    }
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
    if (sum != 0) {
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
    try {
        let ticketValue = '';
        let finalValue;

        ticketValue = number.substring(4, 14);
        ticketValue = number.split('');
        ticketValue.splice(11, 1);
        ticketValue = ticketValue.join('');
        ticketValue = ticketValue.substring(4, 11);

        finalValue = ticketValue.substring(0, 9) + '.' + ticketValue.substring(9, 2);

        let char = finalValue.substring(1, 1);
        while (char === '0') {
            finalValue = substringReplace(finalValue, '', 0, 1);
            char = finalValue.substring(1, 1);
        }


        finalValue = parseFloat(finalValue).toFixed(2);

        return finalValue;
    } catch (err) {
        console.error(err.message);
        throw new Error('Erro ao gerar o valor do boleto');
    }
}

function substringReplace(str, repl, start, length) {
    if (start < 0) {
        start = start + str.length;
    }

    length = length !== undefined ? length : str.length;
    if (length < 0) {
        length = length + str.length - start;
    }

    return [
        str.slice(0, start),
        repl.substr(0, length),
        repl.slice(length),
        str.slice(start + length)
    ].join('');
}

function generateExpirationDate(number) {
    try {
        const dueDateFactor = number.slice(33, 37);

        const baseDate = new Date('10/07/1997');
        baseDate.setTime(baseDate.getTime() + (dueDateFactor * 24 * 60 * 60 * 1000));
        const formatedDate =
            `${baseDate.getFullYear()}-${("0" + (baseDate.getMonth() + 1)).slice(-2)}-${("0" + (baseDate.getDate() + 1)).slice(-2)}`;

        return formatedDate;
    } catch (err) {
        console.error(err.message);
        throw new Error('Erro ao gerar o valor do boleto');

    }
}

module.exports = titlesAgreements;
