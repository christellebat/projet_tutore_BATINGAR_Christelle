import LoginPage from '../pages/LoginPage';

describe('Login OrangeHRM', () => {

    beforeEach(() => {
        cy.fixture('users.json').then((users) => {
            LoginPage.visit();
        });
    });

    it('Connexion valide avec pauses', () => {
        cy.fixture('users.json').then((users) => {
            const valid = users.validUser;
            cy.log('Saisie identifiant');
            LoginPage.login(valid.username, valid.password, { delay: 100 });
            cy.wait(1000);

            cy.url().should('include', '/dashboard');
            cy.log('Dashboard affiché');
        });
    });

    it('Connexion invalide', () => {
        LoginPage.login('Admin', 'wrongpassword', { delay: 100 });
        cy.wait(500);
        cy.contains('Invalid credentials').should('be.visible');
    });

});