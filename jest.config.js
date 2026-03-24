module.exports = {
    testEnvironment: "node",
    testMatch: ["**/_tests_/**/*.test.js"],
    modulePathIgnorePatterns: ["<rootDir>/.prisma/"],
    moduleNameMapper: {
        "^@prisma/client$": "<rootDir>/node_modules/@prisma/client"
    }
  };