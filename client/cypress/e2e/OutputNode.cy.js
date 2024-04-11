describe('OutputNode Tests', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it("The output node should render correctly", () => {
      cy.get('img[alt="outputNode"]').should("exist")

      cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
        
      }).then((success) => {
        assert.isTrue(success)
      })

      cy.get('.reactflow-wrapper').within(() => {
        cy.get(`[data-cy="handle"]`).should("exist")
        .should('have.class', 'handle--false');
      })
  })

})