'use strict';

const PolygonLookup = require('polygon-lookup');

let worldGeojson = undefined;
let worldLookup = undefined;

/**
 * Use geojson for searches
 * @param  {[type]} geojson a FeatureCollection, each feature must have a 'ISO_A3' as property
 * @return {[type]}         [description]
 */
module.exports.use = function (geojson) {
  worldGeojson = geojson;
  worldLookup = new PolygonLookup(worldGeojson);
};

/**
 * @param {LatLng} latlng
 * @returns ISO 3166 alpha-3 country code for geographic coordinates
 */
module.exports.getCountry = function (latlng) {
  return new Promise((resolve, reject) => {
    if (worldGeojson === undefined) {
      reject(new Error('No geographical data loaded'));
    }
    resolve(worldLookup.search(latlng.lng, latlng.lat));
  });
};
