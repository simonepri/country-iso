# country-iso
[![Travis CI](https://travis-ci.org/simonepri/country-iso.svg?branch=master)](https://travis-ci.org/simonepri/country-iso) [![Codecov](https://img.shields.io/codecov/c/github/simonepri/country-iso/master.svg)](https://codecov.io/gh/simonepri/country-iso) [![npm](https://img.shields.io/npm/dm/country-iso.svg)](https://www.npmjs.com/package/country-iso) [![npm version](https://img.shields.io/npm/v/country-iso.svg)](https://www.npmjs.com/package/country-iso) [![npm dependencies](https://david-dm.org/simonepri/country-iso.svg)](https://david-dm.org/simonepri/country-iso) [![npm dev dependencies](https://david-dm.org/simonepri/country-iso/dev-status.svg)](https://david-dm.org/simonepri/country-iso#info=devDependencies)
> 🗺 Get ISO 3166-1 alpha-3 country code from geographic coordinates.

<p align="center">
  <a href="http://simonepri.github.io/country-iso/"><img src="https://raw.githubusercontent.com/simonepri/country-iso/master/demo/index.png" width="400"/></a>
</p>

<p align="center">Click on the map to see a live preview.</p>

## Synopsis
Given the latitude and longitude coordinates this package returns the country code of the country in which the coordinates fall into.

The package internally uses [@geo-maps/countries-maritime](https://github.com/simonepri/geo-maps/blob/master/info/countries-maritime.md) map with 10m resolution to give you the right country code.
The accuracy of the map has been tested with [23785 cities](fixtures/cities.geo.json) but the [demo](http://simonepri.github.io/country-iso/) allows you to actually test it manually by just clicking on the map to see what it returns.

Do you believe that this is useful? If so, <a href="#start-of-content">support us with a ⭐️</a>!

## Install
```bash
$ npm install --save country-iso
```

## Usage
You can query any `(lat,lng)` pair on the earth. It also works for territorial waters and disputed countries.

```javascript
const countryIso = require('country-iso');

// Query a point in Italy.
countryIso.get(41.9028, 12.4964);
// => ['ITA']

// Query a disputed country.
countryIso.get(24, -14);
// => ['ESH', 'MAR']

// Query a point somewhere in Atlantic Ocean.
countryIso.get(40, -40);
// => []
```

## API
## get(lat, lng) ⇒ <code>Array.&lt;string&gt;</code>
Searches for every country which contains the point (lat, lng).

**Returns**: <code>Array.&lt;string&gt;</code> - Array of ISO 3166 alpha-3 country code for the geographic
 coordinates.  

| Param | Type | Description |
| --- | --- | --- |
| lat | <code>number</code> | The latitude of the point. |
| lng | <code>number</code> | The longitude of the point. |

## Related
* [is-sea](https://github.com/simonepri/is-sea): 🌊 Check whether a geographic coordinate is in the sea or not on the earth.

## Authors
* **Matteo Chen** - [chq-matteo](https://github.com/chq-matteo)
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/world-country/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
