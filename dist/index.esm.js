function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var plugin = {
  install: function install(Vue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$debounce = _ref.debounce,
        debounce = _ref$debounce === void 0 ? 0 : _ref$debounce;

    Vue.mixin({
      data: function data() {
        return {
          resizeListenerActive: false,
          debounceTimer: null,
          eqSize: {
            width: 0,
            height: 0
          },
          eq: null
        };
      },
      computed: {
        $eq: function $eq() {
          var _this = this;

          if (this.eq && this.eq.breakpoints && // mark this.eqSize.width and this.eqSize.height as dependencies
          // for the reactivity of the computed breakpoints-property
          typeof this.eqSize.width === "number" && typeof this.eqSize.height === "number") {
            // iterate over all queries and set their state
            // base on the query they have as properties
            var instance = Object.keys(this.eq.breakpoints).reduce(function (accumulator, currentValue) {
              return _objectSpread2(_objectSpread2({}, accumulator), {}, _defineProperty({}, currentValue, _this.$_elementQueryMixin_checkAllConditions(_this.eq.breakpoints[currentValue])));
            }, {}); // bind public methods to the $eq instance

            instance.forceUpdate = this.$_elementQueryMixin_forceUpdate;
            return instance;
          }

          return {};
        }
      },
      watch: {
        eq: function eq(value) {
          // $options.eq have been assigned a value
          // and no resize listener was active => initialize
          if (value && !this.resizeListenerActive) {
            this.$_elementQueryMixin_init();
          }
        }
      },
      mounted: function mounted() {
        // make $options.eq reactive by
        // assigning it to the component data
        this.eq = this.$options.eq;
        this.$_elementQueryMixin_init();
      },
      beforeDestroy: function beforeDestroy() {
        this.$_elementQueryMixin_destroy();
      },
      methods: {
        /**
         * initialize the mixin, add a resize listener and
         * calculate the initial width and height of the component
         */
        $_elementQueryMixin_init: function $_elementQueryMixin_init() {
          if (this.eq && this.eq.breakpoints) {
            window.addEventListener("resize", this.$_elementQueryMixin_debouncedResize);
            this.resizeListenerActive = true;
            this.$_elementQueryMixin_resize();
          }
        },

        /**
         * destroy the mixin, remove the resize listener if it was active
         */
        $_elementQueryMixin_destroy: function $_elementQueryMixin_destroy() {
          if (this.resizeListenerActive) {
            window.removeEventListener("resize", this.$_elementQueryMixin_debouncedResize);
            this.resizeListenerActive = false;
          }
        },

        /**
         * gets the current component eqSize (height & width)
         * based on the client sizes of the element
         */
        $_elementQueryMixin_resize: function $_elementQueryMixin_resize() {
          this.eqSize.height = this.$el.clientHeight;
          this.eqSize.width = this.$el.clientWidth;
        },

        /**
         * debounces the resize event as it is bound to the window.resize event
         * this uses the component `eq.debounce` value,
         * with a fallback to plugin debounce value (if it's specified)
         */
        $_elementQueryMixin_debouncedResize: function $_elementQueryMixin_debouncedResize() {
          var _this2 = this;

          clearTimeout(this.debounceTimer);
          this.debounceTimer = setTimeout(function () {
            _this2.$_elementQueryMixin_resize();
          }, this.eq && this.eq.debounce || debounce);
        },

        /**
         * Checks all the conditions of a breakpoint
         * returns `true` if all conditions match
         * @param {object} bp
         */
        $_elementQueryMixin_checkAllConditions: function $_elementQueryMixin_checkAllConditions(bp) {
          var _this3 = this;

          // .find() result === `undefined` means all condition passed as `true`
          // so we invert the returned result
          return !Object.keys(bp).find( // if any condition returns false:
          // we break out of the iteration early because of `.find()`
          function (key) {
            return !_this3.$_elementQueryMixin_checkCondition(key, bp[key]);
          });
        },

        /**
         * Checks the condition of a specific condition + value
         * @param {string} type
         * @param {number} value
         */
        $_elementQueryMixin_checkCondition: function $_elementQueryMixin_checkCondition(type, value) {
          switch (type) {
            case "minWidth":
              return this.eqSize.width >= value;

            case "maxWidth":
              return this.eqSize.width <= value;

            case "minHeight":
              return this.eqSize.height >= value;

            case "maxHeight":
              return this.eqSize.height <= value;
            // no default
          }

          return false;
        },

        /**
         * if an element changed eqSize outside of `window.resize`
         * call this method to force an update on the breakpoints
         */
        $_elementQueryMixin_forceUpdate: function $_elementQueryMixin_forceUpdate() {
          this.$_elementQueryMixin_resize();
        }
      }
    });
  }
};

export default plugin;
