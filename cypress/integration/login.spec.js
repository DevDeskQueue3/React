context('Form Actions', () => {
    before(() => {
        cy.visit('http://localhost:3000/student/login');
    });

    it('Can enter email address', () => {

        cy.get('[data-cy="email"] input')
            .type('darrentebo83@outlook.com')
            .should('have.value', 'darrentebo83@outlook.com');
    });
});