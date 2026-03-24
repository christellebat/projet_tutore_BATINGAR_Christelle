const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    defaultCommandTimeout: 30000, // global timeout pour gérer lenteur
    setupNodeEvents(on, config) { },
  },
});