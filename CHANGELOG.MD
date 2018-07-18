# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.0.0] - [2018-07-18](https://github.com/e2o/vue-element-query/releases/tag/v2.0.0)

### Added
- ResizeObserver polyfill

### Changed
- Internally we no longer use `window.resize` to observe sizing changes. Every component uses the ResizeObserver API now.

### Removed

- `debounce` property for `window.resize` events, on both component- and plugin-level.
- `window.resize` usage in favor of ResizeObserver.

## [1.1.0] - [2018-07-18](https://github.com/e2o/vue-element-query/releases/tag/v1.1.0)

### Added
- Polyfills through [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env).
- Browser support section in README.

### Changed
- Run built script on `prepublishOnly` instead of `prepare`.

## [1.0.7] - [2018-07-18](https://github.com/e2o/vue-element-query/releases/tag/v1.1.0)

### Added
- Polyfills through [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env).
- Browser support section in README.

### Changed
- Run built script on `prepublishOnly` instead of `prepare`.
