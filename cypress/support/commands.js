import { faker } from '@faker-js/faker';

// Connexion
Cypress.Commands.add('login', (username, password, options = {}) => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').clear().type(username, options);
    cy.get('input[name="password"]').clear().type(password, options);
    cy.get('button[type="submit"]').contains('Login').click();
});

// Création d’un employé dynamique avec retry si ID déjà existant
Cypress.Commands.add('createEmployee', (employee, maxRetries = 3) => {

    let attempt = 0;

    function tryCreate() {
        attempt++;
        cy.get('input[name="firstName"]').clear().type(employee.firstName, { delay: 100 });
        cy.get('input[name="middleName"]').clear().type(employee.middleName, { delay: 100 });
        cy.get('input[name="lastName"]').clear().type(employee.lastName, { delay: 100 });

        cy.contains('button', 'Save').click();

        // Vérifie si message "Employee Id already exists" apparaît
        cy.get('body').then(($body) => {
            if ($body.find('.oxd-input-field-error-message:contains("Employee Id already exists")').length > 0) {
                if (attempt < maxRetries) {
                    cy.log(`ID déjà utilisé, retry #${attempt}`);
                    tryCreate();
                } else {
                    throw new Error('Employee ID already exists après plusieurs tentatives');
                }
            } else {
                // Vérification que l'employé est visible dans la liste
                cy.get('h6.oxd-text--h6', { timeout: 30000 })
                    .contains(`${employee.firstName} ${employee.lastName}`)
                    .should('be.visible');
            }
        });
    }

    tryCreate();
});