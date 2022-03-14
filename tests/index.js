const chai = require('chai');
const server = require('../src/app');
const http = require('chai-http');

chai.use(http);

describe('Tests of controller', () => {
    it('Get the bar code of bank ticket', () => {
        chai.request(server)
            .get('/boleto/21290001192110001210904475617405975870000002000')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
    });
    it('Get the bar code of title and agreements', () => {
        chai.request(server)
            .get('/boleto/858900004609524601791605607593050865831483000010')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
    });
    it('Dont pass only number on params', () => {
        chai.request(server)
            .get('/boleto/858900DD4609DDFDS460179RTA07593050865831483000010')
            .end((err, res) => {
                res.should.have.status(400);
            });
    });
    it('Dont pass the length of numbers correctly', () => {
        chai.request(server)
            .get('/boleto/123456789')
            .end((err, res) => {
                res.should.have.status(400);
            });
    });
});