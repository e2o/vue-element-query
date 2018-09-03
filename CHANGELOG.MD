# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [3.0.0] - [2018-09-03](https://github.com/e2o/vue-element-query/releases/tag/v3.0.0)

### Changed

## Fixed
- collision on private data-properties by prefixing them with `$_elementQueryMixin_`. ([@e2o](https://github.com/e2o) in [#6](https://github.com/e2o/vue-element-query/pull/6))  
_Note: This is a breaking change if you previously depended on any of the private properties `size`, `eq` or `resizeObserver` of this plugin. Although it is not recommended that you use these internal data-properties at all, you could update to v3.0.0 by prefixing them with `$_elementQueryMixin_` in your code._

## [2.0.1] - [2018-07-18](https://github.com/e2o/vue-element-query/releases/tag/v2.0.1)

### Added
- Added "ResizeObserver" to package keywords.

### Fixed
- Correctly disconnect from resizeObserver on component destroy.


## [2.0.0] - [2018-07-18](https://github.com/e2o/vue-element-query/releases/tag/v2.0.0)

### Added
- ResizeObserver polyfill.

### Changed
- Internally we no longer use `window.resize` to observe sizing changes. Every component uses the ResizeObserver API now.

### Fixed
- Shield badges in README. (https://github.com/badges/shields/issues/1568)

### Removed
- `debounce` property for `window.resize` events, on both component- and plugin-level.
- `window.resize` usage in favor of ResizeObserver.


## [1.1.0] - [2018-07-11](https://github.com/e2o/vue-element-query/releases/tag/v1.1.0)

### Added
- Polyfills through [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env).
- Browser support section in README.

### Changed
- Run built script on `prepublishOnly` instead of `prepare`.


## [1.0.7] - [2018-07-11](https://github.com/e2o/vue-element-query/releases/tag/v1.0.7)

### Added
- [Rollup](https://github.com/rollup/rollup) to generate an ES Modules and CommonJS build from the source.

### Changed
- Upload both `src/` and `dist/` folders to NPM.
