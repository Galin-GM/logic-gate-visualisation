describe('OutputNode Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper');
    });

    it('outputNode is rendered', () => {
        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="outputNode"]').should('be.visible');
        })
    })

    it('handle for outputNode is rendered', () => {
        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="handle"]').should('be.visible');
        })
    })

    it('outputNode image is rendered', () => {
        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="outputNodeImage"]').should('be.visible');
        })
    })

    it('value should be false initially', () => {
        cy.get('[data-cy="outputNodeImage"]').should('have.class', 'value--false');
    })

})
