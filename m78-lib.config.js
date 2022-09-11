import { defineConfig } from "@m78/build-tools/defineConfig.js";

export default defineConfig([
  {
    inpDir: "src",
    outDir: "esm",
    swcConfig: {
      module: {
        type: "es6",
      },
    },
    ignore: [],
  },
  {
    inpDir: "src",
    outDir: "umd",
    swcConfig: {
      module: {
        type: "umd",
      },
    },
    ignore: [],
  },
]);
