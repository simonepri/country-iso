import test from 'ava';

const fs = require('fs-extra');
const city = require('./fixtures/cities.json');
const countries = require('i18n-iso-countries');
const country = require('..');

const report = './test/report/failed-get-country.geo.json'
const failed = [];
test.before('Throw error if doesn\'t use any GeoJSON', async t => {
  await t.throws(country.get(0, 0));
  country.use(require('world-countries-boundaries-1m')());
});

city.features.forEach(c => {
  test(`${c.properties.name} should have country code ${c.properties.iso_a2}`, async t => {
    await country.get(c.geometry.coordinates[1], c.geometry.coordinates[0])
    .then(result => {
      t.not(result, undefined);
      const comp = result.some(e => countries.alpha3ToAlpha2(e) === c.properties.iso_a2);
      if (!comp) {
        failed.push(c);
      }
      t.true(result.some(e => countries.alpha3ToAlpha2(e) === c.properties.iso_a2));
    })
    .catch(err => t.fail(err.message));
  });
});

test('33.396877N, -38.570712W should be in interntional waters', async t => {
  await country.get(33.396877, -38.570712)
  .then(result => {
    t.is(result.length, 0);
  })
  .catch(err => t.fail(err.message));
});

test.after.always(async () => {
  if (failed.length !== 0) {
    const out = {
      type: 'FeatureCollection',
      features: failed
    };
    await fs.outputJson(report, out, {spaces: 2});
  }
});
