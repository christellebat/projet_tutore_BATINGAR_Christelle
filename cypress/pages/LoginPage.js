class LoginPage {

    visit() {
        // accéder à la page login
        cy.visit('/web/index.php/auth/login');

        // attendre que le formulaire soit visible
        cy.get('form[novalidate]', { timeout: 15000 }).should('be.visible');
    }

    fillUsername(username) {
        cy.get('input[name="username"]', { timeout: 10000 }).type(username, { delay: 50 });
    }

    fillPassword(password) {
        cy.get('input[name="password"]', { timeout: 10000 }).type(password, { delay: 50 });
    }

    submit() {
        cy.get('button[type="submit"]', { timeout: 10000 }).click();
    }

    login(username, password) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.submit();
    }
}

export default new LoginPage();