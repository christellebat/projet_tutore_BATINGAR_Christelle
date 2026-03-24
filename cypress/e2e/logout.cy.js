describe('Déconnexion OrangeHRM', () => {

    beforeEach(() => {

        // ignorer les erreurs JS de l'application
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        // charger les données de connexion
        cy.fixture('users.json').then((users) => {
            const valid = users.validUser;

            // accéder à la page login
            cy.visit('/web/index.php/auth/login');

            // saisir les identifiants
            cy.get('input[name="username"]', { timeout: 20000 })
                .should('be.visible')
                .type(valid.username);

            cy.get('input[name="password"]')
                .should('be.visible')
                .type(valid.password);

            // cliquer sur login
            cy.get('button[type="submit"]').click();

            // vérifier que le dashboard est chargé
            cy.get('.oxd-sidepanel-body', { timeout: 30000 })
                .should('be.visible');
        });
    });

    it('Se déconnecter via le menu utilisateur', () => {

        // ouvrir le menu utilisateur
        cy.get('.oxd-userdropdown-name')
            .should('be.visible')
            .click();

        // attendre que le menu dropdown apparaisse
        cy.get('ul.oxd-dropdown-menu', { timeout: 10000 })
            .should('be.visible');

        // ⏳ pause pour la démo
        cy.wait(800);

        // cibler Logout (effet visuel propre)
        cy.contains('a', 'Logout')
            .should('be.visible')
            .then(($el) => {
                $el[0].scrollIntoView();
            });

        // petite pause
        cy.wait(500);

        // cliquer sur Logout
        cy.contains('a', 'Logout').click();

        // vérifier redirection vers login
        cy.url({ timeout: 20000 })
            .should('include', '/auth/login');

        // vérifier que la page login est stable (malgré clignotement)
        cy.get('input[name="username"]', { timeout: 20000 })
            .should('be.visible')
            .and('not.be.disabled');

        cy.get('button[type="submit"]')
            .should('be.visible')
            .and('not.be.disabled');
    });

});