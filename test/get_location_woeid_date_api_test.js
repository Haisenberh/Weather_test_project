const config = require('../config.js');
const testData = require('../testData/test_data');
const request = require('request');
const expect = require('chai').expect;

describe('GET /api/location/(woeid)/(date) tests:', () => {
    it('It returns weather details for Bucharest in 17-05-2017', (done) => {
        let neededDate = '2017/5/30';
        request.get(config.url +`api/location/` + testData.city.bucharest.woeid + '/' + neededDate, (err, res, body) => {
            body = JSON.parse(body);
            let response = body[0];

            expect(res.statusCode, 'Expect status code is correct').to.equal(200);
            expect(body, 'Expect body is array').to.be.an('array');
            expect(response, 'Expect response has property [weather_state_name] and correct type').to.have.property('weather_state_name').that.is.a('string');
            expect(response, 'Expect response has property [wind_speed] and correct type').to.have.property('wind_speed').that.is.a('number', 'Expect body is array');
            expect(response, 'Expect response has property [wind_direction] and correct type').to.have.property('wind_direction').that.is.a('number', 'Expect body is array');
            expect(response, 'Expect response has property [the_temp] and correct type').to.have.property('the_temp').that.is.a('number', 'Expect body is array');


            console.log('\nWeather in Bucharest for the date 17-05-2017 at 14:23: ' + response.weather_state_name);
            console.log('Wind: speed: ' + response.wind_speed, ', direction: ' + response.wind_direction);
            console.log('Current temperature: ' + response.the_temp);
            done();
        });
    });
});

