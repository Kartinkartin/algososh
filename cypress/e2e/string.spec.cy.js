// import React from "react";
import { DELAY_IN_MS } from "../../src/constants/delays";
import { reverseString } from '../../src/components/string/utils.ts';

describe('testing String component', () => {
  beforeEach(()=>{
    cy.visit('/recursion');
  })

  it('empty input with disapled button', () => {
    cy.get('input').as('input');
    cy.get('button[type=submit]').as('button')
    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
    cy.get('@input').type('123');
    cy.get('@button').should('not.be.disabled');
    cy.get('@input').clear();
    cy.get('@button').should('be.disabled');
  })

  it('correct reverse string with correct animation', () => {
    // заглушаются методы объекта Date
    // при использовании clock без аргументов и click отрисовка замирает на 2 секунде
    const clock = cy.clock(new Date(), ['Date'])
    // ввод строки "1234"
    const str = '1234';
    const steps = reverseString(str);
    cy.get('button[type=submit]').as('button');
    cy.get('input').type(str);
    cy.get('@button').click();

    // проверка первой отрисовки, состояние элементов Default 
    cy.get('ul>div').each(($el, index) => {
      cy.get($el).find('div[class*="circle_circle"]').should(($div) => {
        const className = $div[0].className;
        const text = str[index];
        expect(className).contains('circle_default');
        expect($div[0]).to.have.text(text);
      });
    });

    clock.wait(DELAY_IN_MS);

    // проверка отрисовки начала изменений, крайние элементы Changing
    cy.get('div[class*=circle_circle]').should(($els) => {
      expect($els).to.have.length(4);
      expect($els[0].className).contains('circle_changing');
      expect($els[1].className).contains('circle_default');
      expect($els[2].className).contains('circle_default');
      expect($els[3].className).contains('circle_changing');
    })
    cy.get('div[class*=circle_circle]').each(($el, index)=> {
      const text = str[index];
      expect($el[0]).to.have.text(text);
    });

    clock.wait(DELAY_IN_MS);

    cy.get('div[class*=circle_circle]').should(($els) => {
      expect($els).to.have.length(4);
      expect($els[0].className).contains('circle_modified');
      expect($els[1].className).contains('circle_changing');
      expect($els[2].className).contains('circle_changing');
      expect($els[3].className).contains('circle_modified');
    })
    cy.get('div[class*=circle_circle]').each(($el, index)=> {
      const step = steps[0];
      const text = step[index];
      expect($el[0]).to.have.text(text);
    });

    clock.wait(DELAY_IN_MS);

    cy.get('div[class*=circle_circle]').should(($els) => {
      expect($els).to.have.length(4);
      expect($els[0].className).contains('circle_modified');
      expect($els[1].className).contains('circle_modified');
      expect($els[2].className).contains('circle_modified');
      expect($els[3].className).contains('circle_modified');
    })
    cy.get('div[class*=circle_circle]').each(($el, index)=> {
      const step = steps[1];
      const text = step[index];
      expect($el[0]).to.have.text(text);
    });
  })
})
