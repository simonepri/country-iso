'use strict';

const PolygonLookup = require('polygon-lookup');

/**
 * Pre computes an R-Tree from a GeoJSON Object and uses the data future queries
 * For an example @see {@link https://github.com/busrapidohq/world-countries-boundaries}
 * @param  {Object} geoJson Valid GeoJSON FeatureCollection, each feature must have .properties.ISO_A3
 * @return
 */
function useGeoJSON(geoJson) {
  this.worldGeojson = geoJson;
  this.worldLookup = new PolygonLookup(this.worldGeojson);
}

/**
 * Searches for every country which contains the point (lat, lng)
 * @param {Number} lat  Latitude of the point
 * @param {Number} lng  Longitude of the point
 * @return {Promise<String[]>} Promises an array of ISO 3166 alpha-3 country code for the geographic coordinates
 */
function getCode(lat, lng) {
  return new Promise((resolve, reject) => {
    if (this.worldGeojson === undefined) {
      reject(new Error('No geographical data loaded'));
    }
    const countries = this.worldLookup.search(lng, lat, -1);
    resolve(countries.features.map(f => f.properties.ISO_A3));
  });
}

/**
 * Searches for every country which contains the point (lat, lng)
 * @param {Number} lat  Latitude of the point
 * @param {Number} lng  Longitude of the point
 * @return {String[]}  Array of ISO 3166 alpha-3 country code for the geographic coordinates
 */
function getCodeSync(lat, lng) {
  if (this.worldGeojson === undefined) {
    throw new Error('No geographical data loaded');
  }
  const countries = this.worldLookup.search(lng, lat, -1);
  return countries.features.map(f => f.properties.ISO_A3);
}

module.exports = {
  use: useGeoJSON,
  get: getCode,
  getSync: getCodeSync
};
