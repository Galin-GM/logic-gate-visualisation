describe('LogicGate Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('andGate is rendered', () => {
        cy.get('img[alt="andNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="andNode"]').should('exist')
                .get('[data-cy="handleA"]').should('exist')
                .get('[data-cy="handleB"]').should('exist')
                .get('[data-cy="outputHandle"]').should('exist')
        })
    })

    it('orGate is rendered', () => {
        cy.get('img[alt="orNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="orNode"]').should('exist')
                .get('[data-cy="handleA"]').should('exist')
                .get('[data-cy="handleB"]').should('exist')
                .get('[data-cy="outputHandle"]').should('exist')
        })
    })

    it('nandGate is rendered', () => {
        cy.get('img[alt="nandNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="nandNode"]').should('exist')
                .get('[data-cy="handleA"]').should('exist')
                .get('[data-cy="handleB"]').should('exist')
                .get('[data-cy="outputHandle"]').should('exist')
        })
    })

    it('norGate is rendered', () => {
        cy.get('img[alt="norNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="norNode"]').should('exist')
                .get('[data-cy="handleA"]').should('exist')
                .get('[data-cy="handleB"]').should('exist')
                .get('[data-cy="outputHandle"]').should('exist')
        })
    })

    it('xorGate is rendered', () => {
        cy.get('img[alt="xorNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="xorNode"]').should('exist')
                .get('[data-cy="handleA"]').should('exist')
                .get('[data-cy="handleB"]').should('exist')
                .get('[data-cy="outputHandle"]').should('exist')
        })
    })

    it('xnorGate is rendered', () => {
        cy.get('img[alt="xnorNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="xnorNode"]').should('exist')
                .get('[data-cy="handleA"]').should('exist')
                .get('[data-cy="handleB"]').should('exist')
                .get('[data-cy="outputHandle"]').should('exist')
        })
    })

    it('notGate is rendered', () => {
        cy.get('img[alt="notNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="notNode"]').should('exist')
                .get('[data-cy="handleAnot"]').should('exist')
                .get('[data-cy="outputHandle"]').should('exist')
        })
    })


    it('andNode data is correct', () => {
        cy.get('img[alt="andNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="andNode"]')
                .get('[data-cy="handleA"]').should('have.class', 'handle--false')
                .get('[data-cy="handleB"]').should('have.class', 'handle--false')
                .get('[data-cy="outputHandle"]').should('have.class', 'handle--false')
        })
    })

    it('orNode data is correct', () => {
        cy.get('img[alt="orNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="orNode"]')
                .get('[data-cy="handleA"]').should('have.class', 'handle--false')
                .get('[data-cy="handleB"]').should('have.class', 'handle--false')
                .get('[data-cy="outputHandle"]').should('have.class', 'handle--false')
        })
    })

    it('nandNode data is correct', () => {
        cy.get('img[alt="nandNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="nandNode"]')
                .get('[data-cy="handleA"]').should('have.class', 'handle--false')
                .get('[data-cy="handleB"]').should('have.class', 'handle--false')
                .get('[data-cy="outputHandle"]').should('have.class', 'handle--true')
        })
    })

    it('norNode data is correct', () => {
        cy.get('img[alt="norNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="norNode"]')
                .get('[data-cy="handleA"]').should('have.class', 'handle--false')
                .get('[data-cy="handleB"]').should('have.class', 'handle--false')
                .get('[data-cy="outputHandle"]').should('have.class', 'handle--true')
        })
    })

    it('xorNode data is correct', () => {
        cy.get('img[alt="xorNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="xorNode"]')
                .get('[data-cy="handleA"]').should('have.class', 'handle--false')
                .get('[data-cy="handleB"]').should('have.class', 'handle--false')
                .get('[data-cy="outputHandle"]').should('have.class', 'handle--false')
        })
    })

    it('xnorNode data is correct', () => {
        cy.get('img[alt="xnorNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="xnorNode"]')
                .get('[data-cy="handleA"]').should('have.class', 'handle--false')
                .get('[data-cy="handleB"]').should('have.class', 'handle--false')
                .get('[data-cy="outputHandle"]').should('have.class', 'handle--true')
        })
    })

    it('notNode data is correct', () => {
        cy.get('img[alt="notNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        }).then((success) => {
            assert.isTrue(success)
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="notNode"]')
                .get('[data-cy="handleAnot"]').should('have.class', 'handle--false')
                .get('[data-cy="outputHandle"]').should('have.class', 'handle--true')
        })
    })




})
