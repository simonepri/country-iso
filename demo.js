const leaflet = require('leaflet');
const ci18n = require('i18n-iso-countries');
const GeoJsonGeometriesLookup = require('geojson-geometries-lookup');

ci18n.registerLocale(require('i18n-iso-countries/langs/en.json'));

async function fetchMapAsync() {
  const response = await fetch('https://unpkg.com/@geo-maps/countries-maritime-10m/map.geo.json');
  const data = await response.json();
  return data;
}

let worldLookup = null;
async function getCodes(lat, lng) {
  if (worldLookup === null) {
    const map = await fetchMapAsync();
    worldLookup = new GeoJsonGeometriesLookup(map);
  }

  const countries = worldLookup.getContainers({type: 'Point', coordinates: [lng, lat]});

  if (countries.features.length > 0) {
    // TODO: Remove the usage of the set!
    return [...new Set(countries.features.map(f => f.properties.A3))];
  }
  return [];
}

async function showInfo(map, latlng) {
  latlng = latlng.wrap();
  const isocodes = await getCodes(latlng.lat, latlng.lng);
  const cnames = isocodes.map(iso => ci18n.getName(iso, 'en'));

  const output = {
    iso: isocodes,
    names: cnames,
    location: latlng
  };

  const msg = JSON.stringify(output, null, 2).replace(/\r?\n|\r/g, '<br/>').replace(/ /g, '&ensp;');
  map.openPopup(msg, latlng);
}

const map = leaflet.map('map').setView([0, 0], 1);
leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
map.on('click', e => {
  const latlng = e.latlng;
  map.openPopup('Loading... ⌛️', latlng);

  setTimeout(() => showInfo(map, latlng), 0);
});
