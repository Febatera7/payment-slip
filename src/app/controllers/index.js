const ticket = require('../functions/ticket');
const titlesAgreements = require('../functions/titlesAgreements');
const isNumber = require('../functions/isNumber');

class controllers {
    paymentSlip(req, res) {
        try {
            const { number } = req.params;

            if (!isNumber(number)) {
                throw new Error('Not a valid number');
            }

            let response;

            if (number.length === 47) {
                response = ticket(number);
            } else if (number.length === 48) {
                response = titlesAgreements(number);
            } else {
                throw new Error('Isnt a valid ticket number');
            }

            res.status(200).send(response);
        } catch (err) {
            res.status(400).send(err.message);
        }
    };
}

module.exports = new controllers();
