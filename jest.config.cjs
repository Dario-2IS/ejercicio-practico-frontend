const { compilerOptions } = require('./tsconfig');
const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {},
        {
            prefix: '<rootDir>/',

        }),
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
}