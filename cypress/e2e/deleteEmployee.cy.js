describe('Suppression d’un employé - démo fluide', () => {

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

    it('Supprimer un employé avec gestion No Records Found', () => {

        //  Aller dans PIM
        cy.contains('span', 'PIM', { timeout: 20000 }).click();

        //  Attendre que le tableau soit visible
        cy.get('div.oxd-table', { timeout: 30000 }).should('be.visible');

        //  Saisir le nom dans Employee Name
        cy.get('input[placeholder="Type for hints..."]')
            .first()
            .should('be.visible')
            .clear()
            .type('PAN Jeremie', { delay: 150, scrollBehavior: false });

        cy.wait(1000); // pause pour voir la saisie

        //  Cliquer sur Search
        cy.contains('button', 'Search')
            .should('be.visible')
            .click();

        cy.wait(800);

        //  Vérifier si aucun résultat
        cy.get('span.oxd-text--span').then(($el) => {
            if ($el.text().includes('No Records Found')) {
                cy.log('Aucun employé trouvé, rien à supprimer.');
                return; // arrêter le test ici sans erreur
            }

            // Sinon, continuer la suppression
            cy.scrollTo('bottom', { duration: 1200 });
            cy.wait(500);

            cy.get('i.bi-trash', { timeout: 20000 }).first().click();

            cy.get('p.oxd-text--p', { timeout: 10000 })
                .should('contain.text', 'The selected record will be permanently deleted');

            cy.wait(800);

            cy.contains('button', 'Yes, Delete')
                .should('be.visible')
                .click();

            cy.wait(1000);

            // Vérifier que l'employé n'est plus dans le tableau
            cy.get('div.oxd-table', { timeout: 30000 })
                .should('not.contain', 'PAN');
        });
    });

});