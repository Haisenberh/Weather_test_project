const config = require('../config.js');
const testData = require('../testData/test_data');
const request = require('request');
const expect = require('chai').expect;

describe('GET /api/location/search/(query) tests:', () => {
    it('It returns valid San Francisco data', (done) => {
        request.get(config.url +`api/location/search/?query=San%20Francisco`, (err, res, body) => {
            body = JSON.parse(body);
            let response = body[0];

            expect(res.statusCode, 'Expect status code is correct').to.equal(200);
            expect(body, 'Expect body is array').to.be.an('array');

            expect(response, 'Expect response has property [title] and correct type').to.have.property('title').that.is.a('string');
            expect(response, 'Expect response has property [latt]_long and correct type').to.have.property('latt_long').that.is.a('string');
            expect(response, 'Expect response has property [woeid] and correct type').to.have.property('woeid').that.is.a('number');

            //Verify exact values
            expect(response.title).to.equal(testData.city.sanFrancisco.title);
            expect(response.latt_long).to.equal(testData.city.sanFrancisco.latt_long);
            expect(response.location_type).to.equal(testData.city.sanFrancisco.location_type);
            expect(response.woeid).to.equal(testData.city.sanFrancisco.woeid);
            done();
        });
    });
});
