describe('Suppression d’un employé', () => {

    beforeEach(() => {

        Cypress.on('uncaught:exception', () => false);

        cy.fixture('users.json').then((users) => {
            const valid = users.validUser;

            cy.visit('/web/index.php/auth/login');

            cy.get('input[name="username"]', { timeout: 20000 }).type(valid.username);
            cy.get('input[name="password"]').type(valid.password);
            cy.get('button[type="submit"]').click();

            cy.get('.oxd-sidepanel-body', { timeout: 30000 }).should('be.visible');
        });
    });

    it('Supprimer un employé', () => {

        // aller dans PIM
        cy.contains('span', 'PIM', { timeout: 20000 }).click();

        cy.get('div.oxd-table', { timeout: 30000 }).should('be.visible');

        // rechercher employé
        cy.get('input[placeholder="Type for hints..."]', { timeout: 20000 })
            .type('PAN Jeremie');

        cy.contains('button', 'Search').click();

        cy.wait(1000); // pour la démo

        // cliquer sur delete (icône poubelle)
        cy.get('i.bi-trash', { timeout: 20000 }).first().click();

        // popup confirmation
        cy.get('.oxd-dialog-container', { timeout: 10000 })
            .should('be.visible');

        cy.contains('button', 'Yes, Delete').click();

        // vérifier suppression (plus présent)
        cy.get('div.oxd-table', { timeout: 30000 })
            .should('not.contain', 'PAN Jeremie');
    });

});