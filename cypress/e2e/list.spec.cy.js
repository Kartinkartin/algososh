import { initItems } from '../../src/components/list-page/constants.tsx'
import { circleElem, circleElemContent, headAddBtn, headDelBtn, index, indexAddBtn, indexDelBtn, indexInput, pointerTextElem, stateDefault, tailAddBtn, tailDelBtn, value, valueInput } from './constants';

describe('testing Fibonacci component', () => {
  beforeEach(() => {
    cy.visit('/list');
  })

  it('empty input with disapled add and index manipulate buttons', ()=> {
    
    // проверка начального состояния полей ввода и кнопок
    cy.get('input').should('have.value', '').then(() => {
      cy.get(headAddBtn).should('be.disabled')  
      cy.get(tailAddBtn).should('be.disabled')
      cy.get(indexAddBtn).should('be.disabled')
      cy.get(indexDelBtn).should('be.disabled')
      cy.get(headDelBtn).should('not.be.disabled')
      cy.get(tailDelBtn).should('not.be.disabled')
    })
    cy.get(valueInput).type('A');
    cy.get('input').then(($input)=> {
      expect($input[0]).to.have.value('A');
      expect($input[1]).to.have.value('')
    })
    .then(() => {
      cy.get(headAddBtn).should('not.be.disabled')  
      cy.get(tailAddBtn).should('not.be.disabled')
      cy.get(indexAddBtn).should('be.disabled')
      cy.get(indexDelBtn).should('be.disabled')
      cy.get(headDelBtn).should('not.be.disabled')
      cy.get(tailDelBtn).should('not.be.disabled')
    })
    cy.get(indexInput).type('1');
    cy.get('input').then(($input)=> {
      expect($input[0]).to.have.value('A');
      expect($input[1]).to.have.value('1')
    })
    .then(() => {
      cy.get(headAddBtn).should('not.be.disabled')  
      cy.get(tailAddBtn).should('not.be.disabled')
      cy.get(indexAddBtn).should('not.be.disabled')
      cy.get(indexDelBtn).should('not.be.disabled')
      cy.get(headDelBtn).should('not.be.disabled')
      cy.get(tailDelBtn).should('not.be.disabled')
    })
    cy.get(valueInput).clear()
    cy.get('input').then(($input)=> {
      expect($input[0]).to.have.value('');
      expect($input[1]).to.have.value('1')
    })
    .then(() => {
      cy.get(headAddBtn).should('be.disabled')  
      cy.get(tailAddBtn).should('be.disabled')
      cy.get(indexAddBtn).should('be.disabled')
      cy.get(indexDelBtn).should('not.be.disabled')
      cy.get(headDelBtn).should('not.be.disabled')
      cy.get(tailDelBtn).should('not.be.disabled')
    })
    cy.get(indexInput).clear()
    cy.get('input').then(($input)=> {
      expect($input[0]).to.have.value('');
      expect($input[1]).to.have.value('')
    })
    .then(() => {
      cy.get(headAddBtn).should('be.disabled')  
      cy.get(tailAddBtn).should('be.disabled')
      cy.get(indexAddBtn).should('be.disabled')
      cy.get(indexDelBtn).should('be.disabled')
      cy.get(headDelBtn).should('not.be.disabled')
      cy.get(tailDelBtn).should('not.be.disabled')
    })
  })

  it('correct render default list', ()=> {
    const length = initItems.length;
    // проверка длины начального списка
    cy.get('ul>li').should('have.length', length).then(() => {
      // проверка содержания и цвета элемента
      cy.get('ul').within(() => {
        cy.get(circleElem).each(($el, index) => {
          expect($el[0].className).contains(stateDefault);
          cy.get($el[0]).find('p').should('have.text', initItems[index])
        })
        // проверка указателей на head и tail
        cy.get(pointerTextElem).each(($el, index) => {
          if (index===0) {
            cy.get($el).should('have.text', 'head')
          }
          if (index===initItems.length*2 -1) {
            cy.get($el).should('have.text', 'tail')
          }
        })
      })
    })
  })

  it('correct adding to head', ()=> {
    // проверка новой длины списка
    cy.get('ul>li').then(($els) => {
      const $length = $els.length;
      cy.get(valueInput).type('A');
      cy.get(headAddBtn).click();
      cy.get('ul>li').should('have.length', $length+1)
    })
    .then(() => {
      // проверка содержания и указателя нового элемента 
      cy.get('ul').within(() => {
        cy.get(circleElem).first().then(($el) => {
          cy.get($el[0]).find('p').should('have.text', 'A')
        })
        cy.get(pointerTextElem).first().then(($el) => {
          cy.get($el).should('have.text', 'head')
        })
      })
    })
  })

  it('correct adding to tail', () => {
    // проверка новой длины списка
    cy.get('ul>li').then(($els) => {
      const $length = $els.length;
      cy.get(valueInput).type('A');
      cy.get(tailAddBtn).click();
      cy.get('ul>li').should('have.length', $length + 1)
    }).then(() => {
      cy.get('ul').within(() => {
        // проверка содержания и указателя нового элемента 
        cy.get(circleElem).last().then(($el) => {
          cy.get($el[0]).find('p').should('have.text', 'A')
        })
        cy.get(pointerTextElem).last().then(($el) => {
          cy.get($el).should('have.text', 'tail')
        })
      })
    })
  })

  it('correct adding by index', () => {
    cy.get('ul>li').then(($els) => {
      const $length = $els.length;
      cy.get(valueInput).type('A');
      cy.get(indexInput).type('1');
      cy.get(indexAddBtn).click();
      cy.get('ul>li').should('have.length', $length + 1)
    }).then(($els) => {
      cy.get($els).each(($el, index) => {
        if (index === 1) {
          cy.get($el).within(($el) => {
            cy.get($el).find(circleElemContent).should('have.text', 'A')
          })
        }
      })
    })
  })

  it('correct deleting from head', ()=> {
    const first = initItems[0];
    cy.get('ul>li').then(($els) => {
      const $length = $els.length;      
      cy.get(headDelBtn).click();
      cy.get('ul>li').should('have.length', $length-1);
    }).then(() => {
      cy.get(circleElemContent).each(($el) => {
        cy.get($el).should('not.have.text', first)
      })
    })
  })

  it('correct deleting from tail', ()=> {
    const last = initItems[initItems.length-1];
    cy.get('ul>li').then(($els) => {
      const $length = $els.length;      
      cy.get(tailDelBtn).click();
      cy.get('ul>li').should('have.length', $length-1);
    }).then(() => {
      cy.get(circleElemContent).each(($el) => {
        cy.get($el).should('not.have.text', last)
      })
    })
  })

  it('correct deleting by index', ()=> {
    const index = 1;
    const value = initItems[1]
    cy.get('ul>li').then(($els) => {
      const $length = $els.length; 
      cy.get(indexInput).type(index);
      cy.get(indexDelBtn).click();
      cy.get('ul>li').should('have.length', $length-1);
    }).then(() => {
      cy.get(circleElemContent).each(($el) => {
        cy.get($el).should('not.have.text', value)
      })
    })
  })
})
