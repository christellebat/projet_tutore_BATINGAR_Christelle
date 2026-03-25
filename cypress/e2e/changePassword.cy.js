describe('Changement de mot de passe', () => {

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

    it('Saisie nouveau mot de passe mais login avec nouveau KO', () => {

        cy.get('.oxd-userdropdown-tab').click();
        cy.wait(1000);
        cy.contains('Change Password').click();
        cy.wait(1000);
        cy.url().should('include', 'updatePassword');

        // Ancien mot de passe
        cy.get('input[type="password"]').eq(0).clear().type('admin123', { delay: 100 });
        cy.wait(500);
        // Nouveau mot de passe
        cy.get('input[type="password"]').eq(1).clear().type('humain1234', { delay: 100 });
        cy.wait(500);
        // Confirmation
        cy.get('input[type="password"]').eq(2).clear().type('humain1234', { delay: 100 });
        cy.wait(500);

        cy.contains('button', 'Save').click();
        cy.wait(1000);

        // Déconnexion
        cy.get('.oxd-userdropdown-tab').click();
        cy.wait(500);
        cy.contains('Logout').click();
        cy.wait(1000);

        // Login KO avec nouveau mdp
        cy.get('input[name="username"]').clear().type('Admin', { delay: 100 });
        cy.get('input[name="password"]').clear().type('humain1234', { delay: 100 });
        cy.get('button[type="submit"]').contains('Login').click();
        cy.wait(1000);
        cy.contains('Invalid credentials').should('be.visible');

        // Login OK avec ancien mdp
        cy.get('input[name="username"]').clear().type('Admin', { delay: 100 });
        cy.get('input[name="password"]').clear().type('admin123', { delay: 100 });
        cy.get('button[type="submit"]').contains('Login').click();
        cy.wait(1000);
        cy.url().should('include', '/dashboard');
    });

});