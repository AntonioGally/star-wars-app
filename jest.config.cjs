/** @type {import('jest').Config} */
module.exports = {
    preset: "ts-jest",
    
    verbose: true,
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
    roots: ['<rootDir>/src'],
    setupFiles: ['react-app-polyfill/jsdom'],
    setupFilesAfterEnv: ['<rootDir>/src/jest/setupTest.js'],
    testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg|css|sass|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};