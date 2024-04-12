describe('Controls Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport('macbook-11')
    });

    it("Controls Render", () => {

        cy.get('.react-flow__controls-zoomin').should('exist').should('not.be.disabled')
        cy.get('.react-flow__controls-zoomout').should('exist').should('not.be.disabled')
        cy.get('.react-flow__controls-fitview').should('exist').should('not.be.disabled')
        cy.get('.react-flow__controls-interactive').should('exist').should('not.be.disabled')
        cy.get('.buttonPanel > :nth-child(1)').should('exist').should('be.disabled')
        cy.get('.buttonPanel > :nth-child(2)').should('exist').should('be.disabled')
        cy.get('.buttonPanel > :nth-child(3)').should('exist').should('be.disabled')
        cy.get('.buttonPanel > :nth-child(4)').should('exist').should('be.disabled')

    })

    it("Zoom In", () => {

        cy.get('.react-flow__controls-zoomin').should('exist').should('not.be.disabled')
        cy.get('.react-flow__controls-zoomin').click().click().click().click().click().click()
        cy.get('.react-flow__controls-zoomin').should('exist').should('be.disabled')

    })

    it("Zoom Out", () => {

        cy.get('.react-flow__controls-zoomout').should('exist').should('not.be.disabled')
        cy.get('.react-flow__controls-zoomout').click().click().click().click()
        cy.get('.react-flow__controls-zoomout').should('exist').should('be.disabled')

    })

    it("Zoom In And Out", () => {

        cy.get('.react-flow__controls-zoomin').should('exist').should('not.be.disabled')
        cy.get('.react-flow__controls-zoomout').should('exist').should('not.be.disabled')

        cy.get('.react-flow__controls-zoomin').click().click().click().click().click().click()

        cy.get('.react-flow__controls-zoomin').should('exist').should('be.disabled')
        cy.get('.react-flow__controls-zoomout').should('exist').should('not.be.disabled')

        cy.get('.react-flow__controls-zoomout').click()

        cy.get('.react-flow__controls-zoomin').should('exist').should('not.be.disabled')
        cy.get('.react-flow__controls-zoomout').should('exist').should('not.be.disabled')

        cy.get('.react-flow__controls-zoomout').click().click().click().click().click()
            .click().click().click()

        cy.get('.react-flow__controls-zoomin').should('exist').should('not.be.disabled')
        cy.get('.react-flow__controls-zoomout').should('exist').should('be.disabled')

    })

    it("Fitview", () => {

        cy.get('.react-flow__controls-fitview').should('exist').should('not.be.disabled')

        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })

        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        })

        cy.get('[data-cy="inputOneNode"]').should('exist')
        cy.get('[data-cy="outputNode"]').should('exist')

        cy.get('.react-flow__controls-fitview').click()

        cy.get('[data-cy="inputOneNode"]').should('exist').should('is.visible')
        cy.get('[data-cy="outputNode"]').should('exist').should('is.visible')

    })

    it("Fitview", () => {

        cy.get('.react-flow__controls-interactive').should('exist').should('not.be.disabled')

        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })

        cy.get('[data-cy="inputOneNode"]').should('exist').click()
            .should('class.name', 'selected')

        cy.get('.reactflow-wrapper').click()

        cy.get('.react-flow__controls-interactive').click()

        cy.get('[data-cy="inputOneNode"]').should('exist').click()
            .should('not.class.name', 'selected')

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

    it("Auto Layout", () => {

        cy.get('.buttonPanel > :nth-child(3)').should('exist').should('be.disabled')

        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })

        cy.get('.buttonPanel > :nth-child(3)').should('exist').should('not.be.disabled')

        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        })

        cy.get('.buttonPanel > :nth-child(3)').should('exist').should('not.be.disabled')

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

        cy.get('.buttonPanel > :nth-child(3)').should('exist').should('not.be.disabled').click()

        cy.get('[data-cy="inputOneNode"]').should('exist')
        cy.get('[data-cy="outputNode"]').should('exist')

        cy.get('.buttonPanel > :nth-child(3)').should('exist').should('not.be.disabled')
    })



})