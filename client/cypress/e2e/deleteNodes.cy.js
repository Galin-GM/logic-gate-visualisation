describe('Delete Node Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport('macbook-11')
    });

    it("Delete", () => {
        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })

        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="inputOneNode"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="outputNode"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="inputOneNode"]').click().rightclick().get('.deleteButton > button').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')
        })
    })


    it("Delete All", () => {

        cy.get('.buttonPanel > :nth-child(4)').should('exist').should('be.disabled')

        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })

        cy.get('.buttonPanel > :nth-child(4)').should('exist').should('not.be.disabled')

        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        })

        cy.get('.buttonPanel > :nth-child(4)').should('exist').should('not.be.disabled')

        cy.get('[data-cy="inputOneNode"]').should('exist')
        cy.get('[data-cy="outputNode"]').should('exist')

        cy.get('[data-cy="inputOneNode"]').find('[data-cy="handle"]').click()
        cy.get('[data-cy="inputOneNode"]').click().rightclick().get('.deleteButton > button').click()


        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="inputOneNode"]').should('not.exist')
        })

        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })
        cy.get('[data-cy="inputOneNode"]').should('exist')

        cy.get('.buttonPanel > :nth-child(4)').should('exist').should('not.be.disabled').click()

        cy.get('[data-cy="inputOneNode"]').should('not.exist')
        cy.get('[data-cy="outputNode"]').should('not.exist')

        cy.get('.buttonPanel > :nth-child(4)').should('exist').should('be.disabled')
    })
})