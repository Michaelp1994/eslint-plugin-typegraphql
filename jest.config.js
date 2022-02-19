"use strict";

// @ts-check
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    globals: {
        "ts-jest": {
            isolatedModules: true,
        },
    },
    verbose: true,
    silent: false,
    preset: "ts-jest/presets/default-esm",
    extensionsToTreatAsEsm: [".ts"],
    testEnvironment: "node",
    setup
    transform: {
        "^.+\\.tsx?$": "ts-jest", // The important part right here
    },
    testRegex: "./src/tests/rules/.+\\.test\\.ts$",
    collectCoverage: false,
    collectCoverageFrom: ["dist/**/*.{js,jsx,ts,tsx}"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    coverageReporters: ["text-summary", "lcov"],
};
