describe('Suppression d’un employé', () => {

    beforeEach(() => {
        // Ignorer les erreurs uncaught venant de l'application
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.warn('Erreur ignorée :', err.message);
            return false; // Empêche l’échec du test
        });

        cy.fixture('users.json').then((users) => {
            const valid = users.validUser;

            cy.visit('/web/index.php/auth/login');

            cy.get('input[name="username"]', { timeout: 20000 }).type(valid.username);
            cy.get('input[name="password"]').type(valid.password);
            cy.get('button[type="submit"]').click();

            cy.get('.oxd-sidepanel-body', { timeout: 30000 }).should('be.visible');
        });
    });

    it('Supprimer un employé existant', () => {
        const employeeName = 'PAN';

        cy.contains('span', 'PIM', { timeout: 20000 }).click();
        cy.contains('a', 'Employee List', { timeout: 20000 }).click();

        // Saisie de l'employé à supprimer (uniquement le champ visible)
        cy.get('input[placeholder="Type for hints..."]')
            .filter(':visible')
            .first()
            .should('be.visible')
            .type(employeeName, { delay: 150, scrollBehavior: false });

        cy.contains('button', 'Search')
            .should('be.visible')
            .click();
        cy.wait(800);

        // Vérifier si "No Records Found"
        cy.get('span.oxd-text--span').then(($spans) => {
            const noResult = [...$spans].some(span => span.innerText.includes('No Records Found'));

            if (noResult) {
                cy.log('Aucun employé trouvé, rien à supprimer.');
            } else {
                // Scroll vers le bas pour voir le résultat
                cy.scrollTo('bottom', { duration: 1200 });

                // Cliquer sur l’icône corbeille
                cy.get('i.bi-trash').first().click();

                // Confirmer la suppression
                cy.contains('button', 'Yes, Delete').click();

                // Vérifier que l’employé n’apparaît plus
                cy.get('input[placeholder="Type for hints..."]')
                    .filter(':visible')
                    .first()
                    .clear()
                    .type(employeeName, { delay: 150, scrollBehavior: false });

                cy.contains('button', 'Search').click();
                cy.get('span.oxd-text--span')
                    .contains('No Records Found')
                    .should('be.visible');
            }
        });
    });

});