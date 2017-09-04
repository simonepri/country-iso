'use strict';
/**
 * Use geojson for searches
 * @param  {[type]} geojson a FeatureCollection, each feature must have a 'ISO_A3' as property
 * @return {[type]}         [description]
 */
module.exports.use = function (geojson) {
  worldGeojson = geojson;
  worldLookup = new PolygonLookup(worldGeojson);
};

