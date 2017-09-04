'use strict';

const PolygonLookup = require('polygon-lookup');

/**
 * Use geojson for searches
 * @param  {[type]} geojson a FeatureCollection, each feature must have a 'ISO_A3' as property
 * @return {[type]}         [description]
 */
module.exports.use = function (geojson) {
  this.worldGeojson = geojson;
  this.worldLookup = new PolygonLookup(this.worldGeojson);
};

/**
 * @param {LatLng} latlng
 * @returns an array of ISO 3166 alpha-3 country code for the geographic coordinates
 */
module.exports.getCountryCodes = function (latlng) {
  return new Promise((resolve, reject) => {
    if (this.worldGeojson === undefined) {
      reject(new Error('No geographical data loaded'));
    }
    const countries = this.worldLookup.search(latlng.lng, latlng.lat, -1);
    resolve(countries.features.map(f => f.properties.ISO_A3));
  });
};
