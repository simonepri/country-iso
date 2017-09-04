'use strict';

const PolygonLookup = require('polygon-lookup');

let worldGeojson = {type: 'FeatureCollection', features: []};
let worldLookup = new PolygonLookup(worldGeojson);
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
 * @returns an array of ISO 3166 alpha-3 country code for the geographic coordinates
 */
module.exports.getCountryCodes = function (latlng) {
  return new Promise((resolve, reject) => {
    if (worldGeojson === undefined) {
      reject(new Error('No geographical data loaded'));
    }
    const countries = worldLookup.search(latlng.lng, latlng.lat, -1);
    if (countries.features === undefined) {
      resolve([]);
    }
    resolve(countries.features.map(f => f.properties.ISO_A3));
  });
};
