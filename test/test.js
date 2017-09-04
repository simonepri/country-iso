import test from 'ava';

const fs = require('fs');
const city = require('./fixtures/cities.json');
const countries = require('i18n-iso-countries');
const country = require('..');

const bad = [];
test.before(() => {
  country.use(require('world-countries-boundaries-1m')());
});

city.features.forEach(c => {
  test(`${c.properties.name} should have country code ${c.properties.iso_a2}`, async t => {
    await country.getCountryCodes({
      lng: c.geometry.coordinates[0],
      lat: c.geometry.coordinates[1]
    })
    .then(result => {
      t.not(result, undefined);
      const comp = result.some(e => countries.alpha3ToAlpha2(e) === c.properties.iso_a2);
      if (!comp) {
        bad.push(c);
      }
      t.true(result.some(e => countries.alpha3ToAlpha2(e) === c.properties.iso_a2));
    })
    .catch(err => t.fail(err.message));
  });
});

test.after.always(() => {
  if (bad.length !== 0) {
    const out = {
      type: 'FeatureCollection',
      features: bad
    };
    try {
      fs.mkdirSync('./test/out');
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
    fs.writeFileSync('./test/out/failed-get-country.json', JSON.stringify(out, null, 2), err => {
      if (err) {
        throw err;
      }
      console.log('Cities with wrong country can be found in the geojson "log/failed-get-country.json"');
    });
  }
});
