describe('Formula Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport('macbook-11')
    });

    it("Formula", () => {
        cy.get('img[alt="inputOneNode"]').drag('.reactflow-wrapper', {
            target: { x: 100, y: 300 },
        })

        cy.get('img[alt="outputNode"]').drag('.reactflow-wrapper', {
            target: { x: 300, y: 300 },
        })

        cy.get('.reactflow-wrapper').within(() => {
            cy.get('[data-cy="inputOneNode"]').find('[data-cy="handle"]').click()
            cy.get('[data-cy="outputNode"]').find('[data-cy="handle"]').click()
            cy.get('.textBar').invoke('val').then(value => {
                expect(value).to.equal('1');
            });
            cy.get('.react-flow__edgeupdater-source').click()
            cy.get('.textBar').invoke('val').then(value => {
                expect(value).to.equal('');
            });
        })



    })

})