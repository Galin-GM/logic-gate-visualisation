describe('Add Logic Gate Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it("Input One Node", () => {
        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })
        .get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 250, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('[data-cy="handle--true"]').click();
        cy.get('[data-cy="handle"]').click();
        cy.get('.reactflow-wrapper').within(() => {
            cy.get('.react-flow__edge').should("exist")
        })
    })

})