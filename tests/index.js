const server = require('../src/app');
const chai = require('chai');
const http = require('chai-http');
const should = chai.should();

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
    it('Get the bar code of bank ticket with dv 10', () => {
        chai.request(server)
            .get('/boleto/21290001192110001210904405617405975870000002000')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
    });
    it('Get the bar code of title and agreements with mod 10', () => {
        chai.request(server)
            .get('/boleto/856900004609524601791605607593050865831483000010')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
    });
    it('Get the bar code of title and agreements with mod 10 sum = 0', () => {
        chai.request(server)
            .get('/boleto/856900004609524601791605607573050865831483000010')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
    });
    it('Get the bar code of title and agreements with mod 11', () => {
        chai.request(server)
            .get('/boleto/858900004609524601791605607593050865831483000010')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
    });
    it('Get the bar code of title and agreements with mod 11 DAC = 0', () => {
        chai.request(server)
            .get('/boleto/858900004609524601771605607593050865831483000010')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
    });
    it('Get the bar code of title and agreements with mod 11 DAC = 10', () => {
        chai.request(server)
            .get('/boleto/858900004609524601731605607593050865831483000010')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
    });
    it('Dont pass only number on params', () => {
        chai.request(server)
            .get('/boleto/858900DD4609DDFDS460179RTA07593050865831483000010')
            .end((err, res) => {
                res.should.have.status(400)
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