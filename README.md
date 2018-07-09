# vue-element-query

VueJS mixin plugin for creating element size queries in components.

_How is this different than the other libraries out there?_

This plugin gives each component it's own sizing queries and active breakpoint state. [Other](https://github.com/scaccogatto/vue-viewports) [libraries](https://github.com/reinerBa/Vue-Responsive) [use](https://github.com/drenglish/vue-match-media) [the](https://github.com/jofftiquez/vue-media-query-mixin) [window](https://github.com/apertureless/vue-breakpoints) [size](https://github.com/AlexandreBonaventure/vue-mq) [to determine](https://github.com/SeregPie/VueResizeSensor) [breakpoints](https://github.com/adi518/vue-breakpoint-component). This is less powerful because each component should be able to define it's own behaviour without being aware of the components around it. And that's exactly what this plugin brings to you.

* * *

## Table of contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Example](#example)
-   [Contributing](#contributing)
-   [License](#license)

* * *

# Installation

## Using NPM

```sh
npm install vue-element-query --save
```

## Using Yarn

```sh
yarn add vue-element-query
```

## VueJS

Import the plugin and register it with the current Vue instance.

```js
import Vue from "vue";
import VueElementQuery from "vue-element-query";

Vue.use(VueElementQuery);
```

This will make the mixin available for use in every component you register under this Vue instance.

# Usage

## Basic

The breakpoint queries passed in the `eq.breakpoints` option will have their active state exposed on the `$eq` object.

Any combination of the following queries can be combined to create a breakpoint:

-   `minWidth`
-   `maxWidth`
-   `minHeight`
-   `maxHeight`

A breakpoint will only be active when **all** of it's queries match.

```html
<template>
  <div>
    <h1>I'm a title that is always rendered.</h1>
    <h2 v-if="$eq.medium">Only visible when my component has a medium size.</h2>
    <h3 v-if="$eq.medium || $eq.large">Visible on either medium or large size.</h3>
    <h4 :class="{'very-tiny': $eq.small}">I get a special class when my component is small.</h4>
  </div>
</template>

<script>
export default {
  eq: {
    breakpoints: {
      small: { maxWidth: 499 },
      medium: { minWidth: 500, maxWidth: 1199 },
      large: { minWidth: 1200 },
      potato: { minHeight: 123, maxHeight: 1234 }
      ...
    }
  }
};
</script>
```

## Debouncing sizing listeners

The resize listeners for all components can be debounced through a global plugin option `debounce`.

```js
import Vue from "vue";
import VueElementQuery from "vue-element-query";

Vue.use(VueElementQuery, { debounce: 500 }); // debounce all resize listeners by 500ms
```

Similarly, this can be overwritten at component level by specifying the debounce time (in ms) on the `eq` instance.

```js
export default {
  eq: {
    debounce: 250, // wait 250ms before triggering size calculation for this component
    breakpoints: {
      small: { maxWidth: 499 },
      medium: { minWidth: 500, maxWidth: 1199 },
      large: { minWidth: 1200 }
    }
  },
};
```

## Forcing size recalculation

Because of technical limitations in the browser, size recalculations of components are only done on `window.resize`. If for some reason the size of a component changes following an action other than the resizing of the browser window, you can sync the component sizing & breakpoints again by forcing an update on the component.

```js
// inside the component
this.$eq.forceUpdate
```

## Watching component size changes

A listener can be set on the breakpoint states, to watch them get (de-)activated.
This way you can trigger additional actions if needed on separate component sizes.

```js
export default {
  eq: {
    breakpoints: {
      small: { maxWidth: 499 },
      medium: { minWidth: 500, maxWidth: 1199 },
      large: { minWidth: 1200 }
    }
  },
  watch: {
    "$eq.small": function(newState) {
      if (newState) console.log("small breakpoint activated");
      if (!newState) console.log("small breakpoint de-activated");
    },
    "$eq.medium": function(newState) {
      if (newState) console.log("medium breakpoint activated");
      if (!newState) console.log("medium breakpoint de-activated");
    },
    "$eq.large": function(newState) {
      if (newState) console.log("large breakpoint activated");
      if (!newState) console.log("large breakpoint de-activated");
    }
  }
};
```

# Example

A small example (mainly used for development and testing purposes) can be found inside the [example folder](./example)

# Contributing

Feel free to provide feedback, open issues or create pull-requests to this repository.

# License

vue-element-query is [MIT licensed](./LICENSE).

* * *

<a href="https://www.npmjs.com/package/vue-element-query"><img src="https://img.shields.io/npm/v/vue-element-query.svg"></a>
<a href="https://www.npmjs.com/package/vue-element-query"><img src="https://img.shields.io/npm/dt/vue-element-query.svg"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
