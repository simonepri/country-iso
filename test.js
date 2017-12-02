import test from 'ava';

import fs from 'fs-extra';

import i18ncIsoCuntries from 'i18n-iso-countries';

import m from '.';

const cities = require('./fixtures/cities.geo.json');

const reportPath = './report/failed.geo.json';

const failed = {
  type: 'FeatureCollection',
  features: []
};

test.after.always('generate failure report', async () => {
  if (failed.features.length > 0) {
    await fs.outputJson(reportPath, failed, {spaces: 2});
  }
});

test('41.9028N, 12.4964W should be in italy', t => {
  const countries = m.get(41.9028, 12.4964);

  t.true(Array.isArray(countries));
  t.is(countries.length, 1);
  t.is(countries[0], 'ITA');
});

test('33.396877N, -38.570712W should be in interntional waters', t => {
  const countries = m.get(33.396877, -38.570712);

  t.true(Array.isArray(countries));
  t.is(countries.length, 0);
});

cities.features.forEach(city => {
  const name = city.properties.name;
  const code = i18ncIsoCuntries.alpha2ToAlpha3(city.properties.iso_a2);

  test(`${name} should have country code ${code}`, t => {
    const lat = city.geometry.coordinates[1];
    const lng = city.geometry.coordinates[0];

    const countries = m.get(lat, lng);

    t.true(Array.isArray(countries));

    const comp = countries.some(e => e === code);
    if (!comp) {
      failed.features.push(city);
    }

    t.true(comp);
  });
});
