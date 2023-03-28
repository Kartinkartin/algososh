import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { btnReset, btnSubmit, circleElem, stateChanging, stateDefault } from "./constants";

describe('testing Fibonacci component', () => {
  beforeEach(() => {
    cy.visit('/stack');
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

  it('correct adding element to stack, correct coloring', () => {
    cy.clock(new Date(), ['Date'])
    cy.get('input').type('A');
    cy.get(btnSubmit).click();

    cy.get('ul>div').should('have.length', 1);
    // проверка содержания и указания на голову стека
    cy.get('ul>div>div').should('have.text', 'topA')
    // проверка индексов
    cy.get('ul>div>p').should('have.text', '0')
    // проверка цветов
    cy.get(circleElem).should(($els) => {
      expect($els).to.have.length(1);
      expect($els[0].className).contains(stateChanging);
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(circleElem).should(($els) => {
      expect($els).to.have.length(1);
      expect($els[0].className).contains(stateDefault);
    })

    cy.get('input').type('B');
    cy.get(btnSubmit).click();

    cy.get('ul>div').should('have.length', 2);
    // проверка содержания и указания на голову стека
    cy.get('ul>div>div').should('have.text', 'AtopB')
    // проверка индексов
    cy.get('ul>div>p').should('have.text', '01')
    // проверка цветов
    cy.get(circleElem).should(($els) => {
      expect($els).to.have.length(2);
      expect($els[0].className).contains(stateDefault);
      expect($els[1].className).contains(stateChanging);
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(circleElem).each(($el) => {
      expect($el[0].className).contains(stateDefault);
    })
  })

  it('correct deleting element from stack', () => {
    cy.get(btnReset).should('be.disabled')
    cy.get('input').type('A');
    cy.get(btnSubmit).click();
    cy.get('input').type('B');
    cy.get(btnSubmit).click();
    cy.get('ul>div').should('have.length', 2);
    cy.get('button[id=deleteBtn]').click();
    // проверка содержания и смещения указателя на голову стека
    cy.get('ul>div>div').should('have.text', 'topA')
    // проверка индексов
    cy.get('ul>div>p').should('have.text', '0')
  })

  it('correct reseting stack', () => {
    cy.get(btnReset).should('be.disabled')
    cy.get('input').type('A');
    cy.get(btnSubmit).click();
    cy.get('input').type('B');
    cy.get(btnSubmit).click();
    cy.get(btnReset).should('not.be.disabled')
    cy.get('ul>div').should('have.length', 2);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(btnReset).click();
    cy.get('ul>div').should('have.length', 0);
    cy.get(btnReset).should('be.disabled')
  })
})
