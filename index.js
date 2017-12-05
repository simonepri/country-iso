'use strict';

const GeoJsonPolygonLookup = require('geojson-geometries-lookup');
const getMap = require('@geo-maps/countries-maritime-10m');

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
  if (worldLookup === null) {
    const map = getMap();
    worldLookup = new GeoJsonPolygonLookup(map);
  }

  const countries = worldLookup.getContainers({type: 'Point', coordinates: [lng, lat]});

  if (countries.features.length > 0) {
    // TODO: Remove the usage of the set!
    return [...new Set(countries.features.map(f => f.properties.A3))];
  }
  return [];
}

module.exports = {
  get: getCode
};
