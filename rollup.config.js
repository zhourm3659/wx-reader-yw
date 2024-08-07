const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("@rollup/plugin-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("rollup-plugin-terser");

module.exports = [
  {
    input: "./src/index.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        entryFileNames: "[name].cjs.js",
        sourcemap: false,
      },
      {
        dir: "dist",
        format: "esm",
        entryFileNames: "[name].esm.js",
        sourcemap: false,
      },
      {
        dir: "dist",
        format: "umd",
        entryFileNames: "[name].umd.js",
        name: "wx_reader",
        sourcemap: false,
        plugins: [terser()],
      },
    ],
    plugins: [resolve(), commonjs(), typescript({ module: "ESNext" })],
  },
];
