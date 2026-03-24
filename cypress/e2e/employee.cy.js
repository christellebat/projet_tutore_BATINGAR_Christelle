import LoginPage from '../pages/LoginPage';

describe('Gestion des employés', () => {

    beforeEach(() => {
        cy.fixture('users.json').then((users) => {
            const valid = users.validUser;
            LoginPage.visit();
            LoginPage.login(valid.username, valid.password);

            // attendre le menu latéral du dashboard
            cy.get('.oxd-sidepanel-body', { timeout: 20000 }).should('be.visible');
        });
    });

    it('Ajouter un employé PAN PO Jeremie', () => {
        // cliquer sur PIM
        cy.get('span.oxd-main-menu-item--name', { timeout: 20000 })
            .contains('PIM')
            .click();

        // attendre que les onglets PIM soient visibles
        cy.get('a.oxd-topbar-body-nav-tab-item', { timeout: 20000 })
            .should('be.visible');

        // cliquer sur Add Employee
        cy.get('a.oxd-topbar-body-nav-tab-item')
            .contains('Add Employee')
            .click();

        // attendre que le loader disparaisse
        cy.get('div.oxd-form-loader', { timeout: 30000 })
            .should('not.exist');

        // remplir les champs obligatoires uniquement
        cy.get('input[name="firstName"]', { timeout: 10000 })
            .should('be.visible')
            .and('not.be.disabled')
            .type('PAN');

        cy.get('input[name="middleName"]')
            .type('PO');

        cy.get('input[name="lastName"]')
            .type('Jeremie');

        // cliquer sur Save
        cy.get('button[type="submit"]')
            .contains('Save')
            .should('be.visible')
            .and('not.be.disabled')
            .click();

        // attendre Employee List
        cy.get('a.oxd-topbar-body-nav-tab-item', { timeout: 30000 })
            .contains('Employee List')
            .should('be.visible');

        // vérifier que l'employé ajouté est visible
        cy.get('h6.oxd-text--h6', { timeout: 30000 })
            .contains('PAN Jeremie')
            .should('be.visible');
    });

});