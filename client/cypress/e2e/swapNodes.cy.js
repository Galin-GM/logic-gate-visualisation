describe('Swap Nodes Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport('macbook-11')
    });

    it("Swap Nodes", () => {
        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })

        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="inputOneNode"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="outputNode"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')
            cy.get('[data-cy="inputOneNode"]').click().rightclick()
                .get('.swapButtons > :nth-child(2)').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')
        })



    })

})