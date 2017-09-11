import test from 'ava';

const fs = require('fs-extra');
const city = require('./fixtures/cities.geo.json');
const countries = require('i18n-iso-countries');
const country = require('..');

const report = './test/report/failed-sync-get.geo.json';
const failed = [];
test.before('Throw error if doesn\'t use any GeoJSON', t => {
  t.throws(() => country.getSync(0, 0));
  country.use(require('world-countries-boundaries-100m')());
});

city.features.forEach(c => {
  test(`${c.properties.name} should have country code ${c.properties.iso_a2}`, t => {
    const result = country.getSync(c.geometry.coordinates[1], c.geometry.coordinates[0]);
    t.not(result, undefined);
    const comp = result.some(e => countries.alpha3ToAlpha2(e) === c.properties.iso_a2);
    if (!comp) {
      failed.push(c);
    }
    t.true(result.some(e => countries.alpha3ToAlpha2(e) === c.properties.iso_a2));
  });
});

test('33.396877N, -38.570712W should be in interntional waters', t => {
  const result = country.getSync(33.396877, -38.570712);
  t.is(result.length, 0);
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
