describe('Connect Node Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport('macbook-11')
    });

    it("Connect", () => {
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
        })
    })

    it("And", () => {
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })
        cy.get('img[alt="andNode"]').drag('.reactflow-wrapper', {
            target: { x: 270, y: 320 },
        })
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 400 },
        })
        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 450, y: 320 },
        })

        cy.get('.reactflow-wrapper').within(() => {

            cy.get('[data-testid="rf__node-node_0"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="andNode"]').find('[data-cy="handleA"]').click()

            cy.get('[data-testid="rf__node-node_2"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="andNode"]').find('[data-cy="handleB"]').click()

            cy.get('[data-cy="andNode"]').find('[data-cy="outputHandle"]').click()
            cy.get('[data-cy="outputNode"]').find('[data-cy="handle"]').click()

            // Both false
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')

            // One true
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')

            // Both true
            cy.get('[data-testid="rf__node-node_2"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')

            // One false
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')
        })
    })

    it("Or", () => {
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })
        cy.get('img[alt="orNode"]').drag('.reactflow-wrapper', {
            target: { x: 270, y: 320 },
        })
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 400 },
        })
        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 450, y: 320 },
        })

        cy.get('.reactflow-wrapper').within(() => {

            cy.get('[data-testid="rf__node-node_0"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="orNode"]').find('[data-cy="handleA"]').click()

            cy.get('[data-testid="rf__node-node_2"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="orNode"]').find('[data-cy="handleB"]').click()

            cy.get('[data-cy="orNode"]').find('[data-cy="outputHandle"]').click()
            cy.get('[data-cy="outputNode"]').find('[data-cy="handle"]').click()

            // Both false
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')

            // One true
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')

            // Both true
            cy.get('[data-testid="rf__node-node_2"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')

            // One false
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')
        })
    })

    it("Nand", () => {
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })
        cy.get('img[alt="nandNode"]').drag('.reactflow-wrapper', {
            target: { x: 270, y: 320 },
        })
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 400 },
        })
        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 450, y: 320 },
        })

        cy.get('.reactflow-wrapper').within(() => {

            cy.get('[data-testid="rf__node-node_0"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="nandNode"]').find('[data-cy="handleA"]').click()

            cy.get('[data-testid="rf__node-node_2"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="nandNode"]').find('[data-cy="handleB"]').click()

            cy.get('[data-cy="nandNode"]').find('[data-cy="outputHandle"]').click()
            cy.get('[data-cy="outputNode"]').find('[data-cy="handle"]').click()

            // Both false
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')

            // One true
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')

            // Both true
            cy.get('[data-testid="rf__node-node_2"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')

            // One false
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')
        })
    })

    it("nor", () => {
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })
        cy.get('img[alt="norNode"]').drag('.reactflow-wrapper', {
            target: { x: 270, y: 320 },
        })
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 400 },
        })
        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 450, y: 320 },
        })

        cy.get('.reactflow-wrapper').within(() => {

            cy.get('[data-testid="rf__node-node_0"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="norNode"]').find('[data-cy="handleA"]').click()

            cy.get('[data-testid="rf__node-node_2"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="norNode"]').find('[data-cy="handleB"]').click()

            cy.get('[data-cy="norNode"]').find('[data-cy="outputHandle"]').click()
            cy.get('[data-cy="outputNode"]').find('[data-cy="handle"]').click()

            // Both false
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')

            // One true
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')

            // Both true
            cy.get('[data-testid="rf__node-node_2"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')

            // Both false
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')
        })
    })

    it("Xor", () => {
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })
        cy.get('img[alt="xorNode"]').drag('.reactflow-wrapper', {
            target: { x: 270, y: 320 },
        })
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 400 },
        })
        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 450, y: 320 },
        })

        cy.get('.reactflow-wrapper').within(() => {

            cy.get('[data-testid="rf__node-node_0"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="xorNode"]').find('[data-cy="handleA"]').click()

            cy.get('[data-testid="rf__node-node_2"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="xorNode"]').find('[data-cy="handleB"]').click()

            cy.get('[data-cy="xorNode"]').find('[data-cy="outputHandle"]').click()
            cy.get('[data-cy="outputNode"]').find('[data-cy="handle"]').click()

            // Both false
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')

            // One true
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')

            // Both true
            cy.get('[data-testid="rf__node-node_2"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')

            // Both false
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')
        })
    })

    it("Xnor", () => {
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })
        cy.get('img[alt="xnorNode"]').drag('.reactflow-wrapper', {
            target: { x: 270, y: 320 },
        })
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 400 },
        })
        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 450, y: 320 },
        })

        cy.get('.reactflow-wrapper').within(() => {

            cy.get('[data-testid="rf__node-node_0"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="xnorNode"]').find('[data-cy="handleA"]').click()

            cy.get('[data-testid="rf__node-node_2"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="xnorNode"]').find('[data-cy="handleB"]').click()

            cy.get('[data-cy="xnorNode"]').find('[data-cy="outputHandle"]').click()
            cy.get('[data-cy="outputNode"]').find('[data-cy="handle"]').click()

            // Both false
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')

            // One true
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')

            // Both true
            cy.get('[data-testid="rf__node-node_2"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')

            // Both false
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')
        })
    })

    it("Not", () => {
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })
        cy.get('img[alt="notNode"]').drag('.reactflow-wrapper', {
            target: { x: 270, y: 320 },
        })

        // Not used
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 400 },
        })

        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 450, y: 320 },
        })


        cy.get('.reactflow-wrapper').within(() => {

            cy.get('[data-testid="rf__node-node_0"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="notNode"]').find('[data-cy="handleAnot"]').click()

            // cy.get('[data-cy="notNode"]').find('[data-cy="outputHandle"]').click()
            // cy.get('[data-cy="outputNode"]').find('[data-cy="handle"]').click()

            // One false
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--true')

            // One true
            cy.get('[data-testid="rf__node-node_0"]').click()
            cy.get('[data-cy="outputNode"]').should('class.name', 'handle--false')
        })
    })

})
