import LoginPage from '../pages/LoginPage';

describe('Login OrangeHRM', () => {

    it('Login valide', () => {
        cy.fixture('users.json').then((users) => {
            const valid = users.validUser;

            LoginPage.visit();
            LoginPage.login(valid.username, valid.password);

            // attendre que le menu latéral et la barre du dashboard soient visibles
            cy.get('.oxd-sidepanel-body').should('be.visible');
            cy.get('.oxd-topbar-header').should('be.visible');
        });
    });

    it('Login invalide', () => {
        cy.fixture('users.json').then((users) => {
            const invalid = users.invalidUser;

            LoginPage.visit();
            LoginPage.login(invalid.username, invalid.password);

            // vérifier que le message d’erreur apparaît
            cy.get('.oxd-alert-content-text')
                .should('contain.text', 'Invalid credentials');
        });
    });

});