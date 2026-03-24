describe('Recherche d’un employé', () => {

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

    it('Rechercher un employé existant avec scroll après Search', () => {

        cy.contains('span', 'PIM', { timeout: 20000 }).click();
        cy.get('div.oxd-table', { timeout: 30000 }).should('be.visible');

        // Saisie du nom sans scroll automatique
        cy.get('input[placeholder="Type for hints..."]')
            .first()
            .should('be.visible')
            .type('PAN Jeremie', { delay: 150, scrollBehavior: false });

        cy.wait(1000);

        cy.contains('button', 'Search')
            .should('be.visible')
            .click();

        cy.wait(800);

        // Scroll manuel vers le bas après Search
        cy.scrollTo('bottom', { duration: 1200 });

        cy.get('div.oxd-table', { timeout: 30000 })
            .contains('PAN Jeremie')
            .should('be.visible');
    });

});