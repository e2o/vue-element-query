import { babel } from "@rollup/plugin-babel";
import pkg from "./package.json";

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/index.js",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [
      babel({
        babelHelpers: "bundled",
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                browsers: "last 2 versions"
              },
              modules: false,
              spec: true,
              useBuiltIns: "usage",
              forceAllTransforms: true,
              corejs: {
                version: 3,
                proposals: false
              }
            }
          ]
        ]
      })
    ]
  }
];
