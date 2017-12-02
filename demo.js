const leaflet = require('leaflet');
const ci18n = require('i18n-iso-countries');
const countryIso = require('.');

ci18n.registerLocale(require('i18n-iso-countries/langs/en.json'));

const map = leaflet.map('map').setView([0, 0], 1);

leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click', e => {
  const latlng = e.latlng;
  map.openPopup('Loading... ⌛️', latlng);

  setTimeout(() => showInfo(map, latlng), 0);
});

function showInfo(map, latlng) {
  const isocodes = countryIso.get(latlng.lat, latlng.lng);
  const cnames = isocodes.map(iso => ci18n.getName(iso, 'en'));

  const output = {
    iso: isocodes,
    names: cnames,
    location: latlng
  };

  const msg = JSON.stringify(output, null, 2).replace(/\r?\n|\r/g, '<br/>').replace(/ /g, '&ensp;');
  map.openPopup(msg, latlng);
}
