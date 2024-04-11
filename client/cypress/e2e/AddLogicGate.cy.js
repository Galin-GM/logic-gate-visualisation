describe('Add Logic Gate Tests', () => {
  
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it("Input One Node", () => {
        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper').then((success) => {
          assert.isTrue(success)
        })
        cy.get('.reactflow-wrapper').within(() => {
          cy.get(`[data-cy="inputOneNode"]`).should("exist")
          .within(() => {
            cy.get(`[data-cy="handle--true"]`).should("exist")
          })  
        })
    })

    it("Input Zero Node", () => {
        cy.get('img[alt="inputZeroNode"]').drag('.reactflow-wrapper').then((success) => {
          assert.isTrue(success)
        })
        cy.get('.reactflow-wrapper').within(() => {
          cy.get(`[data-cy="inputZeroNode"]`).should("exist")
          .within(() => {
            cy.get(`[data-cy="handle--false"]`).should("exist")
          })  
        })
    })

    it("Switch Node", () => {
        cy.get('img[alt="switchNode"]').drag('.reactflow-wrapper').then((success) => {
          assert.isTrue(success)
        })
        cy.get('.reactflow-wrapper').within(() => {
          cy.get(`[data-cy="switchNode"]`).should("exist")
          .within(() => {
            cy.get(`[data-cy="handle--true"]`).should("exist")
          }).click().within(() => {
            cy.get(`[data-cy="handle--false"]`).should("exist")
          })
        })
    })
  
    it("Output Node", () => {
        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper').then((success) => {
          assert.isTrue(success)
        })
        cy.get('.reactflow-wrapper').within(() => {
          cy.get(`[data-cy="handle"]`).should("exist")
          .should('have.class', 'handle--false');
        })
    })

    it("And Node", () => {  
        cy.get('img[alt="andNode"]').drag('.reactflow-wrapper').then((success) => {
          assert.isTrue(success)
        })
        cy.get('.reactflow-wrapper').within(() => {
          cy.get(`[data-cy="andNode"]`).should("exist").within(() => {
            cy.get(`[data-cy="handleA"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="handleB"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="output"]`).should("exist").should('have.class', 'handle--false')
          })
        })
    })

    it("Or Node", () => {  
        cy.get('img[alt="orNode"]').drag('.reactflow-wrapper').then((success) => {
          assert.isTrue(success)
        })
        cy.get('.reactflow-wrapper').within(() => {
          cy.get(`[data-cy="orNode"]`).should("exist").within(() => {
            cy.get(`[data-cy="handleA"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="handleB"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="output"]`).should("exist").should('have.class', 'handle--false')
          })
        })
    })

    it("Not Node", () => {  
        cy.get('img[alt="notNode"]').drag('.reactflow-wrapper').then((success) => {
          assert.isTrue(success)
        })
        cy.get('.reactflow-wrapper').within(() => {
          cy.get(`[data-cy="notNode"]`).should("exist").within(() => {
            cy.get(`[data-cy="handleA"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="output"]`).should("exist").should('have.class', 'handle--true')
          })
        })
    })

    it("Nand Node", () => {  
        cy.get('img[alt="nandNode"]').drag('.reactflow-wrapper').then((success) => {
          assert.isTrue(success)
        })
        cy.get('.reactflow-wrapper').within(() => {
          cy.get(`[data-cy="nandNode"]`).should("exist").within(() => {
            cy.get(`[data-cy="handleA"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="handleB"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="output"]`).should("exist").should('have.class', 'handle--true')
          })
        })
    })

    it("Nor Node", () => {  
        cy.get('img[alt="norNode"]').drag('.reactflow-wrapper').then((success) => {
          assert.isTrue(success)
        })
        cy.get('.reactflow-wrapper').within(() => {
          cy.get(`[data-cy="norNode"]`).should("exist").within(() => {
            cy.get(`[data-cy="handleA"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="handleB"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="output"]`).should("exist").should('have.class', 'handle--true')
          })
        })
    })

    it("Xor Node", () => {  
        cy.get('img[alt="xorNode"]').drag('.reactflow-wrapper').then((success) => {
          assert.isTrue(success)
        })
        cy.get('.reactflow-wrapper').within(() => {
          cy.get(`[data-cy="xorNode"]`).should("exist").within(() => {
            cy.get(`[data-cy="handleA"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="handleB"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="output"]`).should("exist").should('have.class', 'handle--false')
          })
        })
    })

    it("Xnor Node", () => {  
        cy.get('img[alt="xnorNode"]').drag('.reactflow-wrapper').then((success) => {
          assert.isTrue(success)
        })
        cy.get('.reactflow-wrapper').within(() => {
          cy.get(`[data-cy="xnorNode"]`).should("exist").within(() => {
            cy.get(`[data-cy="handleA"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="handleB"]`).should("exist").should('have.class', 'handle--false')
            cy.get(`[data-cy="output"]`).should("exist").should('have.class', 'handle--true')
          })
        })
    })




})