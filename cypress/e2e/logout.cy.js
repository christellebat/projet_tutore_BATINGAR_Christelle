describe('Déconnexion', () => {

    beforeEach(() => {
        cy.fixture('users.json').then((users) => {
            cy.login(users.validUser.username, users.validUser.password);
        });
    });

    it('Se déconnecter ', () => {

        // Ignore les erreurs uncaught venant de l'application
        Cypress.on('uncaught:exception', (err, runnable) => {
            // On ignore uniquement l'erreur liée à "Cannot read properties of undefined"
            if (err.message.includes("Cannot read properties of undefined")) {
                return false;
            }
            // Pour toutes les autres erreurs, Cypress échouera le test normalement
        });

        cy.get('.oxd-userdropdown-tab').click();
        cy.wait(500); // pause pour voir le menu
        cy.contains('Logout').click();
        cy.wait(1000); // pause pour voir la redirection
        cy.url().should('include', 'auth/login');
    });

});