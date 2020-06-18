context('Form Actions', () => {
    before(() => {
        cy.visit('http://localhost:3000/student/login');
    });

    it('Can enter email address', () => {
        cy.get('[data-cy="email"] input')
            .type('darrentebo83@outlook.com')
            .should('have.value', 'darrentebo83@outlook.com');
    });

    it('Can enter a password', () => {
        cy.get('[data-cy="password"] input')
            .type('testypassword')
            .should('have.value', 'testypassword');
    });

    it('Can validate form fields', () => {
        cy.get('[data-cy="email"] input')
            .clear()
            .type('test');
        
        cy.get('[data-cy="password"] input')
            .clear()
            .type('d');

        cy.get('[data-cy="email-error"]')
            .should('be.visible');

        cy.get('[data-cy="password-error"]')
            .should('be.visible');
    });
});