# country-code
[![Travis CI](https://travis-ci.org/busrapidohq/country-code.svg?branch=master)](https://travis-ci.org/busrapidohq/country-code) [![Codecov](https://img.shields.io/codecov/c/github/busrapidohq/country-code/master.svg)](https://codecov.io/gh/busrapidohq/country-code) [![npm](https://img.shields.io/npm/dm/country-code.svg)](https://www.npmjs.com/package/country-code) [![npm version](https://img.shields.io/npm/v/country-code.svg)](https://www.npmjs.com/package/country-code) [![npm dependencies](https://david-dm.org/busrapidohq/country-code.svg)](https://david-dm.org/busrapidohq/country-code) [![npm dev dependencies](https://david-dm.org/busrapidohq/country-code/dev-status.svg)](https://david-dm.org/busrapidohq/country-code#info=devDependencies)
🗺 Get ISO 3166-1 alpha-3 country code for geographic coordinates.

## Install

```bash
$ npm install --save country-code
$ npm install --save world-countries-boundaries-100m
```
## Countries bounds map file
In order to use this package you need to provide a valid `GeoJSON` FeatureCollection object with the `ISO_A3` property set for each country.
You can get one with customizable accuracy from [world-countries-boundaries](https://github.com/busrapidohq/world-countries-boundaries) repo.

## Usage

```javascript
const countryCode = require('country-code');

// Load a GeoJSON with country boundaries
countryCode.use(require('world-countries-boundaries-1m')());

// query a point
countryCode.get(42.50779, 1.52109);
// > 'AD'
```

## API
### .use(geoJson)
Load a geoJson and preprocess the data to speed up future queries
- *geoJson*, Object, a GeoJson FeatureCollection. You can get one with customizable accuracy at https://github.com/busrapidohq/world-country-boundaries
### .get(lat, lng)
Get an array of country codes for a point.
A point could be within country borders.
- *lat*, Number, latitude
- *lng*, Number, longitude
## Authors
* **Matteo Chen** - [chq-matteo](https://github.com/chq-matteo)
* **Simone Primarosa** - [simonepri](https://github.com/simonepri)

See also the list of [contributors](https://github.com/busrapidohq/world-country/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
