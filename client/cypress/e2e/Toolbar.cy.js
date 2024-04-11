describe('Toolbar Tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it("The toolbar should render correctly", () => {
    cy.get('.sidebar').should("exist")
    cy.get('img[alt="logo"]').should("exist")
    cy.get('img[alt="inputOneNode"]').should("exist")
    cy.get('img[alt="inputZeroNode"]').should("exist")
    cy.get('img[alt="switchNode"]').should("exist")
    cy.get('img[alt="outputNode"]').should("exist")
    cy.get('img[alt="andNode"]').should("exist")
    cy.get('img[alt="orNode"]').should("exist")
    cy.get('img[alt="nandNode"]').should("exist")
    cy.get('img[alt="norNode"]').should("exist")
    cy.get('img[alt="xorNode"]').should("exist") 
    cy.get('img[alt="xnorNode"]').should("exist")
    cy.get('img[alt="notNode"]').should("exist")  
  })

  it('should allow dragging of input nodes', () => {
    cy.get('img[alt="inputOneNode"]').first().trigger('dragstart', {
      dataTransfer: {
        setData: (type, data) => {
          expect(type).to.eq('application/reactflow');
          expect(data).to.eq('inputOneNode'); 
        }
      }
    });
    cy.get('img[alt="inputZeroNode"]').first().trigger('dragstart', {
      dataTransfer: {
        setData: (type, data) => {
          expect(type).to.eq('application/reactflow');
          expect(data).to.eq('inputZeroNode'); 
        }
      }
    });
    cy.get('img[alt="switchNode"]').first().trigger('dragstart', {
      dataTransfer: {
        setData: (type, data) => {
          expect(type).to.eq('application/reactflow');
          expect(data).to.eq('switchNode'); 
        }
      }
    });
    cy.get('img[alt="outputNode"]').first().trigger('dragstart', {
      dataTransfer: {
        setData: (type, data) => {
          expect(type).to.eq('application/reactflow');
          expect(data).to.eq('outputNode'); 
        }
      }
    });
    cy.get('img[alt="andNode"]').first().trigger('dragstart', {
      dataTransfer: {
        setData: (type, data) => {
          expect(type).to.eq('application/reactflow');
          expect(data).to.eq('andNode'); 
        }
      }
    });
    cy.get('img[alt="orNode"]').first().trigger('dragstart', {
      dataTransfer: {
        setData: (type, data) => {
          expect(type).to.eq('application/reactflow');
          expect(data).to.eq('orNode'); 
        }
      }
    });
    cy.get('img[alt="nandNode"]').first().trigger('dragstart', {
      dataTransfer: {
        setData: (type, data) => {
          expect(type).to.eq('application/reactflow');
          expect(data).to.eq('nandNode'); 
        }
      }
    });
    cy.get('img[alt="norNode"]').first().trigger('dragstart', {
      dataTransfer: {
        setData: (type, data) => {
          expect(type).to.eq('application/reactflow');
          expect(data).to.eq('norNode'); 
        }
      }
    });
    cy.get('img[alt="xorNode"]').first().trigger('dragstart', {
      dataTransfer: {
        setData: (type, data) => {
          expect(type).to.eq('application/reactflow');
          expect(data).to.eq('xorNode'); 
        }
      }
    });
    cy.get('img[alt="xnorNode"]').first().trigger('dragstart', {
      dataTransfer: {
        setData: (type, data) => {
          expect(type).to.eq('application/reactflow');
          expect(data).to.eq('xnorNode'); 
        }
      }
    });
    cy.get('img[alt="notNode"]').first().trigger('dragstart', {
      dataTransfer: {
        setData: (type, data) => {
          expect(type).to.eq('application/reactflow');
          expect(data).to.eq('notNode'); 
        }
      }
    });
    
  });




})