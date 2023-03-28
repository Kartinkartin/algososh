import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { btnSubmit, circleElemContent } from "./constants";

describe('testing Fibonacci component', () => {
  beforeEach(()=>{
    cy.visit('/fibonacci');
  })

  it('empty input with disapled button', () => {
    cy.get('input').as('input');
    cy.get(btnSubmit).as('button')
    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
    cy.get('@input').type('1');
    cy.get('@button').should('not.be.disabled');
    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  })

  it('correct generation numbers', () => {
    cy.get('input').type('3');
    cy.get(btnSubmit).as('button')
    cy.get('@button').click();
    cy.clock(new Date(), ['Date']);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('ul>li').should('have.length', '1').then((els) => {
      cy.get(els[0]).get(circleElemContent).should('have.text', '1');
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('ul>li').should('have.length', '2').then((els) => {
      cy.get(els).get(circleElemContent).should('have.text', '11')
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('ul>li').should('have.length', '3').then((els) => {
      cy.get(els).get(circleElemContent).should('have.text', '112')
    })

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('ul>li').should('have.length', '4').then((els) => {
      cy.get(els).get(circleElemContent).should('have.text', '1123')
    })
  })
})
