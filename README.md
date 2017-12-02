# country-iso
[![Travis CI](https://travis-ci.org/simonepri/country-iso.svg?branch=master)](https://travis-ci.org/simonepri/country-iso) [![Codecov](https://img.shields.io/codecov/c/github/simonepri/country-iso/master.svg)](https://codecov.io/gh/simonepri/country-iso) [![npm](https://img.shields.io/npm/dm/country-iso.svg)](https://www.npmjs.com/package/country-iso) [![npm version](https://img.shields.io/npm/v/country-iso.svg)](https://www.npmjs.com/package/country-iso) [![npm dependencies](https://david-dm.org/simonepri/country-iso.svg)](https://david-dm.org/simonepri/country-iso) [![npm dev dependencies](https://david-dm.org/simonepri/country-iso/dev-status.svg)](https://david-dm.org/simonepri/country-iso#info=devDependencies)
> 🗺 Get ISO 3166-1 alpha-3 country code for geographic coordinates.

## Install
```bash
$ npm install --save country-iso
```

## Usage
```javascript
const countryIso = require('country-iso');

// Query a point.
countryIso.get(41.9028, 12.4964);
// => ['ITA']
```

> The accuracy of the maps has been tested with [23785 cities](fixtures/cities.geo.json).

## API
## get(lat, lng) ⇒ <code>Array.&lt;string&gt;</code>
Searches for every country which contains the point (lat, lng).

**Returns**: <code>Array.&lt;string&gt;</code> - Array of ISO 3166 alpha-3 country code for the geographic
 coordinates.  

| Param | Type | Description |
| --- | --- | --- |
| lat | <code>number</code> | The latitude of the point. |
| lng | <code>number</code> | The longitude of the point. |

## Authors
* **Matteo Chen** - [chq-matteo](https://github.com/chq-matteo)
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/simonepri/world-country/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
