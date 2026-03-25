import { faker } from '@faker-js/faker';

describe('Gestion des employés', () => {

    beforeEach(() => {
        cy.fixture('users.json').then((users) => {
            cy.login(users.validUser.username, users.validUser.password);
        });
    });

    // TEST POSITIF
    it('Ajouter un employé dynamique sans conflit ID', () => {
        const employee = {
            firstName: faker.person.firstName(),
            middleName: faker.person.middleName(),
            lastName: faker.person.lastName()
        };

        cy.contains('span', 'PIM', { timeout: 20000 }).click();
        cy.contains('a', 'Add Employee', { timeout: 20000 }).click();
        cy.get('div.oxd-form-loader', { timeout: 30000 }).should('not.exist');

        cy.createEmployee(employee); // retry intégré
    });

    // TEST NEGATIF : champs obligatoires vides
    it('Afficher erreurs si champs obligatoires non remplis', () => {
        cy.contains('span', 'PIM').click();
        cy.contains('a', 'Add Employee').click();
        cy.get('div.oxd-form-loader').should('not.exist');

        cy.contains('button', 'Save').click();

        cy.contains('Required').should('be.visible');
        cy.get('.oxd-input-field-error-message').should('have.length.at.least', 2);
    });

    // TEST NEGATIF : Last Name > 30 caractères
    it('Afficher une erreur si le Last Name dépasse 30 caractères', () => {
        const longLastName = faker.string.alpha(31);

        cy.contains('span', 'PIM').click();
        cy.contains('a', 'Add Employee').click();
        cy.get('div.oxd-form-loader').should('not.exist');

        cy.get('input[name="firstName"]').type(faker.person.firstName(), { delay: 100 });
        cy.get('input[name="lastName"]').type(longLastName, { delay: 100 });

        cy.contains('button', 'Save').click();
        cy.contains('Should not exceed 30 characters').should('be.visible');
    });

});