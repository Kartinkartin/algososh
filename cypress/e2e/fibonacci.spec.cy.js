describe('testing Fibonacci component', () => {
  before(()=>{
    cy.visit('/fibonacci');
  })

  it('empty input with disapled button', () => {
    cy.get('input').as('input');
    cy.get('button[type=submit]').as('button')
    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
    cy.get('@input').type('1');
    cy.get('@button').should('not.be.disabled');
    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  })
})
