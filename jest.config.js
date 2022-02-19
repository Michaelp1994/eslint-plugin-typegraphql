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
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "./src/tests/rules/.+\\.test\\.ts$",
    collectCoverage: false,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    coverageReporters: ["text-summary", "lcov"],
};
