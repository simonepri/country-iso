'use strict';

const PolygonLookup = require('polygon-lookup');
const getMap = require('@geo-maps/countries-maritime-10m');

let worldGeoJson = null;
let worldLookup = null;

/**
 * Searches for every country which contains the point (lat, lng).
 * @public
 * @param {number} lat  The latitude of the point.
 * @param {number} lng  The longitude of the point.
 * @return {string[]}  Array of ISO 3166 alpha-3 country code for the geographic
 *  coordinates.
 */
function getCode(lat, lng) {
  if (worldGeoJson === null) {
    worldGeoJson = getMap();
    worldLookup = new PolygonLookup(worldGeoJson);
  }

  const countries = worldLookup.search(lng, lat, -1);

  if (countries && countries.features && countries.features.length > 0) {
    return [...new Set(countries.features.map(f => f.properties.A3))];
  }
  return [];
}

module.exports = {
  get: getCode
};
