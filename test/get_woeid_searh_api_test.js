const config = require('../config.js');
const testData = require('../testData/test_data');
const request = require('request');
const expect = require('chai').expect;

describe('GET /api/location/(woeid) tests:', () => {
    it('It returns current weather details for San Francisco', (done) => {
        request.get(config.url +`api/location/` + testData.city.sanFrancisco.woeid, (err, res, body) => {
            body = JSON.parse(body);
            let todayWeather = body.consolidated_weather[0];

            expect(res.statusCode, 'Expect status code is correct').to.equal(200);
            expect(body, 'Expect body is object').to.be.an('object');


            expect(todayWeather, 'Expect response has property [weather_state_name] and correct type').to.have.property('weather_state_name').that.is.a('string');
            expect(todayWeather, 'Expect response has property [wind_speed] and correct type').to.have.property('wind_speed').that.is.a('number');
            expect(todayWeather, 'Expect response has property [wind_direction] and correct type').to.have.property('wind_direction').that.is.a('number');
            expect(todayWeather, 'Expect response has property [the_temp] and correct type').to.have.property('the_temp').that.is.a('number');

            console.log('\nToday weather in San Francisco:' + todayWeather.weather_state_name);
            console.log('Wind: speed: ' + todayWeather.wind_speed, ', direction: ' + todayWeather.wind_direction);
            console.log('Current temperature: ' + todayWeather.the_temp);
            done();
        });
    });
});
