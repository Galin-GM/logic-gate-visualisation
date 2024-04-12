describe('Toolbar Tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('toolbar is rendered', () => {
    cy.get('.sidebar').should('be.visible');
  })

  it('logo is rendered', () => {
    cy.get('.logo-container img').should('have.attr', 'alt', 'logo');
  })

  it('content is rendered', () => {
    cy.contains('.description', 'Inputs').should('exist');
    cy.contains('.description', 'Outputs').should('exist');
    cy.contains('.description', 'Logic Gates').should('exist');
  })

  it('all elements are draggable', () => {
    cy.get('img[draggable="true"]').should('have.length', 11)
  })

  it('all nodes appear', () => {
    cy.get('img[alt="inputOneNode"]').should('exist');
    cy.get('img[alt="inputZeroNode"]').should('exist');
    cy.get('img[alt="switchNode"]').should('exist');
    cy.get('img[alt="outputNode"]').should('exist');
    cy.get('img[alt="andNode"]').should('exist');
    cy.get('img[alt="orNode"]').should('exist');
    cy.get('img[alt="nandNode"]').should('exist');
    cy.get('img[alt="norNode"]').should('exist');
    cy.get('img[alt="xorNode"]').should('exist');
    cy.get('img[alt="xnorNode"]').should('exist');
    cy.get('img[alt="notNode"]').should('exist');
  })

  it('all labels appear', () => {
    cy.contains('.label', 'One Constant').should('exist');
    cy.contains('.label', 'Zero Constant').should('exist');
    cy.contains('.label', 'Switch').should('exist');
    cy.contains('.label', 'Light Bulb').should('exist');
    cy.contains('.gate-label', 'AND').should('exist');
    cy.contains('.gate-label', 'OR').should('exist');
    cy.contains('.gate-label', 'NAND').should('exist');
    cy.contains('.gate-label', 'NOR').should('exist');
    cy.contains('.gate-label', 'XOR').should('exist');
    cy.contains('.gate-label', 'XNOR').should('exist');
    cy.contains('.gate-label', 'NOT').should('exist');
  })

  it('sets the correct data on drag start', () => {
    const dataTransfer = {
      setData: cy.stub().as('setData'),
      effectAllowed: undefined
    };

    cy.get('img[alt="andNode"]').first().trigger('dragstart', {
      dataTransfer
    });

    cy.get('@setData').should('have.been.calledWith', 'application/reactflow', 'andNode');
    cy.wrap(dataTransfer).its('effectAllowed').should('eq', 'move');
  });

})