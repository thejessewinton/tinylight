"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsup_1 = require("tsup");
exports.default = (0, tsup_1.defineConfig)({
    entry: ['src/index.tsx'],
    minify: true,
    target: 'es2018',
    external: ['react'],
    sourcemap: true,
    dts: true,
    format: ['esm', 'cjs'],
    injectStyle: true,
    outDir: 'dist',
});
