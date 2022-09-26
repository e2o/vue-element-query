export default {
  install(Vue, { debounce = 0 } = {}) {
    Vue.mixin({
      data() {
        return {
          $_elementQueryMixin_resizeObserver: null,
          $_elementQueryMixin_size: {
            width: null,
            height: null
          },
          eq: null
        };
      },
      computed: {
        $eq() {
          if (
            this.eq &&
            this.eq.breakpoints &&
            // mark this.eqSize.width and this.eqSize.height as dependencies
            // for the reactivity of the computed breakpoints-property
            typeof this.eqSize.width === "number" &&
            typeof this.eqSize.height === "number"
          ) {
            // iterate over all queries and set their state
            // base on the query they have as properties
            const instance = Object.keys(this.eq.breakpoints).reduce(
              (accumulator, currentValue) => ({
                ...accumulator,
                [currentValue]: this.$_elementQueryMixin_checkAllConditions(
                  this.eq.breakpoints[currentValue]
                )
              }),
              { ready: true }
            );

            // bind public methods to the $eq instance
            instance.forceUpdate = this.$_elementQueryMixin_forceUpdate;

            return instance;
          }

          return { ready: false };
        }
      },
      watch: {
        eq(value) {
          // $options.eq have been assigned a value
          // and no resize listener was active => initialize
          if (value && !this.resizeListenerActive) {
            this.$_elementQueryMixin_init();
          }
        }
      },
      mounted() {
        // make $options.eq reactive by
        // assigning it to the component data
        this.eq = this.$options.eq;

        this.$_elementQueryMixin_init();
      },
      beforeDestroy() {
        this.$_elementQueryMixin_destroy();
      },
      methods: {
        /**
         * initialize the mixin, add a resize listener and
         * calculate the initial width and height of the component
         */
        $_elementQueryMixin_init() {
          if (this.eq && this.eq.breakpoints) {
            window.addEventListener(
              "resize",
              this.$_elementQueryMixin_debouncedResize
            );

            this.resizeListenerActive = true;

            this.$_elementQueryMixin_resize();
          }
        },

        /**
         * destroy the mixin, remove the resize listener if it was active
         */
        $_elementQueryMixin_destroy() {
          if (this.resizeListenerActive) {
            window.removeEventListener(
              "resize",
              this.$_elementQueryMixin_debouncedResize
            );

            this.resizeListenerActive = false;
          }
        },

        /**
         * gets the current component eqSize (height & width)
         * based on the client sizes of the element
         */
        $_elementQueryMixin_resize() {
          this.eqSize.height = this.$el.clientHeight;
          this.eqSize.width = this.$el.clientWidth;
        },

        /**
         * debounces the resize event as it is bound to the window.resize event
         * this uses the component `eq.debounce` value,
         * with a fallback to plugin debounce value (if it's specified)
         */
        $_elementQueryMixin_debouncedResize() {
          clearTimeout(this.debounceTimer);
          this.debounceTimer = setTimeout(() => {
            this.$_elementQueryMixin_resize();
          }, (this.eq && this.eq.debounce) || debounce);
        },

        /**
         * Checks all the conditions of a breakpoint
         * returns `true` if all conditions match
         * @param {object} bp
         */
        $_elementQueryMixin_checkAllConditions(bp) {
          // .find() result === `undefined` means all condition passed as `true`
          // so we invert the returned result
          return !Object.keys(bp).find(
            // if any condition returns false:
            // we break out of the iteration early because of `.find()`
            key => !this.$_elementQueryMixin_checkCondition(key, bp[key])
          );
        },

        /**
         * Checks the condition of a specific condition + value
         * @param {string} type
         * @param {number} value
         */
        $_elementQueryMixin_checkCondition(type, value) {
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
        $_elementQueryMixin_forceUpdate() {
          this.$_elementQueryMixin_resize();
        }
      }
    });
  }
};
