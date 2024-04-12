describe('InputNode Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('inputOneNode is rendered', () => {
        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="inputOneNode"]').should('exist')
        })
    })

    it('inputZeroNode is rendered', () => {
        cy.get('img[alt="inputZeroNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="inputZeroNode"]').should('exist')
        })
    })

    it('switchNode is rendered', () => {
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="switchNode"]').should('exist')
        })
    })

    it('inputOneNode data is correct', () => {
        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="inputOneNode"]')
                .get('[data-cy="handle"]').should('have.class', 'handle--true')
        })
    })

    it('inputZeroNode data is correct', () => {
        cy.get('img[alt="inputZeroNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="inputZeroNode"]')
                .get('[data-cy="handle"]').should('have.class', 'handle--false')
        })
    })

    it('switchNode data is correct', () => {
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="switchNode"]')
                .get('[data-cy="handle"]').should('have.class', 'handle--true')
        })
    })

})
