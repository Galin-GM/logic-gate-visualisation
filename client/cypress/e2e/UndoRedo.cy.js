describe('Undo Redo Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport('macbook-11')
    });

    it("Undo Redo", () => {

        cy.get('.buttonPanel > :nth-child(1)').should('be.disabled');
        cy.get('.buttonPanel > :nth-child(2)').should('be.disabled');

        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })

        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        })

        cy.get('.buttonPanel > :nth-child(1)').should('not.be.disabled');
        cy.get('.buttonPanel > :nth-child(2)').should('be.disabled');

        cy.get('.buttonPanel > :nth-child(1)').click()

        cy.get('.buttonPanel > :nth-child(1)').should('not.be.disabled');
        cy.get('.buttonPanel > :nth-child(2)').should('not.be.disabled');

        cy.get('.buttonPanel > :nth-child(1)').click()

        cy.get('.buttonPanel > :nth-child(1)').should('be.disabled');
        cy.get('.buttonPanel > :nth-child(2)').should('not.be.disabled');

        cy.get('.buttonPanel > :nth-child(2)').click()

        cy.get('.buttonPanel > :nth-child(1)').should('not.be.disabled');
        cy.get('.buttonPanel > :nth-child(2)').should('not.be.disabled');

    })

})