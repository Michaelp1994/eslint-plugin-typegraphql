/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    // verbose: true,
    // silent: false,
    testEnvironment: "node",
    testRegex: "./src/tests/rules/.+\\.test\\.ts$",
};
