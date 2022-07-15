describe('Programs Page', () => {
  it('should visit programs page', () => {
    cy.visit('http://localhost:3002/programs');
  });

  it('should filter with Active status', () => {
    cy.get('#ACTIVE').wait(4000).check();

    cy.get('td').should('not.contain', 'PAUSED').and('not.contain', 'PAUSE_SCHEDULED');
  });
  it('should filter with Paused status', () => {
    cy.get('#PAUSED').wait(4000).check();

    cy.get('td').should('not.contain', 'ACTIVE').and('not.contain', 'PAUSE_SCHEDULED');
  });
  it('should filter with Pause Scheduled status', () => {
    cy.get('#PAUSE_SCHEDULED').wait(4000).check();

    cy.get('td').should('not.contain', 'ACTIVE').and('not.contain', 'PAUSED');
  });
});
