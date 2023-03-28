// import React from "react";
import { DELAY_IN_MS } from "../../src/constants/delays";
import { reverseString } from '../../src/components/string/utils.ts';
import { btnSubmit, circleElem, stateChanging, stateDefault, stateModified } from "./constants";

describe('testing String component', () => {
  beforeEach(()=>{
    cy.visit('/recursion');
  })

  it('empty input with disapled button', () => {
    cy.get('input').as('input');
    cy.get(btnSubmit).as('button')
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
    cy.get(btnSubmit).as('button');
    cy.get('input').type(str);
    cy.get('@button').click();

    // проверка первой отрисовки, состояние элементов Default 
    cy.get('ul>div').each(($el, index) => {
      cy.get($el).find(circleElem).should(($div) => {
        const className = $div[0].className;
        const text = str[index];
        expect(className).contains(stateDefault);
        expect($div[0]).to.have.text(text);
      });
    });

    clock.wait(DELAY_IN_MS);

    // проверка отрисовки начала изменений, крайние элементы Changing
    cy.get(circleElem).should(($els) => {
      expect($els).to.have.length(4);
      expect($els[0].className).contains(stateChanging);
      expect($els[1].className).contains(stateDefault);
      expect($els[2].className).contains(stateDefault);
      expect($els[3].className).contains(stateChanging);
    })
    cy.get(circleElem).each(($el, index)=> {
      const text = str[index];
      expect($el[0]).to.have.text(text);
    });

    clock.wait(DELAY_IN_MS);

    cy.get(circleElem).should(($els) => {
      expect($els).to.have.length(4);
      expect($els[0].className).contains(stateModified);
      expect($els[1].className).contains(stateChanging);
      expect($els[2].className).contains(stateChanging);
      expect($els[3].className).contains(stateModified);
    })
    cy.get(circleElem).each(($el, index)=> {
      const step = steps[0];
      const text = step[index];
      expect($el[0]).to.have.text(text);
    });

    clock.wait(DELAY_IN_MS);

    cy.get(circleElem).should(($els) => {
      expect($els).to.have.length(4);
      expect($els[0].className).contains(stateModified);
      expect($els[1].className).contains(stateModified);
      expect($els[2].className).contains(stateModified);
      expect($els[3].className).contains(stateModified);
    })
    cy.get(circleElem).each(($el, index)=> {
      const step = steps[1];
      const text = step[index];
      expect($el[0]).to.have.text(text);
    });
  })
})
