import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default [
  {
    entry: "src/index.js",
    targets: [
      {
        dest: pkg.main,
        format: "cjs"
      }
    ],
    plugins: [
      babel({
        exclude: ["node_modules/**"]
      })
    ]
  }
];
