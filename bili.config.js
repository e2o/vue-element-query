const isDev = process.env.NODE_ENV === "dev";

const config = {
  input: {
    "vue-element-query": "./src/index.js",
  },
  output: {
    dir: "./dist/",
    format: isDev ? ["esm"] : ["esm", "cjs", "umd", "umd-min"],
    moduleName: "VueElementQuery",
  },
};

export default config;
