const ticket = require('../functions/ticket');
const titlesAgreements = require('../functions/titlesAgreements');
const isNumber = require('../functions/isNumber');

class controllers {
    paymentSlip(req, res) {
        try {
            const { number } = req.params;

            if(!isNumber(number)) {
                throw new Error('Not a valid number');
            }

            const response = number.length === 47
                ? ticket(number)
                : number.length === 48
                    ? titlesAgreements(number)
                    : new Error('Not a valid ticket number');


            res.status(200).send(response);
        } catch (err) {
            console.error(err);
            res.status(400).send(err.message);
        }
    };
}

module.exports = new controllers();
