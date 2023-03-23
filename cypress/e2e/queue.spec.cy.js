import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('testing Fibonacci component', () => {
  beforeEach(() => {
    cy.visit('/queue');
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

  it('correct adding element to queue, correct coloring', () => {
    // проверка начального состояния
    cy.get('div[class*=circle_circle]').should(($els)=> {
      expect($els).to.have.length(6)
    })
    .each(($el) => {
      expect($el[0].className).contains('default');
    })
    cy.get('input').type('A');
    cy.get('button[type=submit]').click();

    // проверка содержания и наличия указателя на элементе на начало и конец очереди
    cy.get('ul>li>div>div').should('have.text', 'headAtail')
    // проверка цветов
    cy.get('div[class*=circle_circle]').then(([$zero, ...$els]) => {
      expect($zero.className).contains('changing');
      cy.get($els).each(($el) => {
        expect($el[0].className).contains('default')
      })
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class*=circle_circle]').should(($els) => {
      expect($els).to.have.length(6);
      expect($els[0].className).contains('default');
    })

    cy.get('input').type('B');
    cy.get('button[type=submit]').click();

    cy.get('ul>li').should('have.length', 6);
    // проверка содержания и указания на голову стека
    cy.get('ul>li>div>div').should('have.text', 'headABtail')
    // проверка цветов
    cy.get('div[class*=circle_circle]').should(($els) => {
      expect($els).to.have.length(6);
      expect($els[0].className).contains('default');
      expect($els[1].className).contains('changing');
      expect($els[2].className).contains('default');
    })
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class*=circle_circle]').each(($el) => {
      expect($el[0].className).contains('default');
    })
  })

  it('correct deleting element from queue', () => {
    cy.get('button[type=reset]').should('be.disabled')
    cy.get('input').type('A');
    cy.get('button[type=submit]').click();
    cy.get('input').type('B');
    cy.get('button[type=submit]').click();
    cy.get('ul>li').should('have.length', 6);
    cy.get('button[id=deleteBtn]').click();
    cy.wait(SHORT_DELAY_IN_MS)
    // проверка содержания и смещения указателя на голову стека
    cy.get('ul>li>div').then(($els)=>{
      const $content = cy.get($els[0]).find('div[class*=circle_circle]')
      $content.should('have.text', '');
      const $headPointer = cy.get($els[1]).find('div[class*=text]:first')
      $headPointer.should('have.text', 'head')
    })
  })

  it('correct reseting queue', () => {
    cy.get('button[type=reset]').should('be.disabled')
    cy.get('input').type('A');
    cy.get('button[type=submit]').click();
    cy.get('input').type('B');
    cy.get('button[type=submit]').click();
    cy.get('button[type=reset]').should('not.be.disabled')
    cy.get('ul>li>div>div').should('have.text', 'headABtail');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('button[type=reset]').click();
    cy.get('ul>div').should('have.length', 0);
    cy.get('button[type=reset]').should('be.disabled')
  })
})
