// тестирование переходов по страницам
describe('app works correctly with routes', function () {
    beforeEach(function () {
        cy.visit('/');
    });

    it('should open main page by default', function () {
        cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
    });

    it('should open sring page after click string square', function () {
        cy.get('a[href="/recursion"]').click();
        cy.get('h3').contains('Строка');
    });

    it('should open fibonacci page after click fibonacci square', function () {
        cy.get('a[href="/fibonacci"]').click();
        cy.get('h3').contains('Последовательность Фибоначчи');
    });

    it('should open sorting page after click sorting square', function () {
        cy.get('a[href="/sorting"]').click();
        cy.get('h3').contains('Сортировка массива');
    });

    it('should open stack page after click stack square', function () {
        cy.get('a[href="/stack"]').click();
        cy.get('h3').contains('Стек');
    });

    it('should open queue page after click queue square', function () {
        cy.get('a[href="/queue"]').click();
        cy.get('h3').contains('Очередь');
    });

    it('should open list page after click list square', function () {
        cy.get('a[href="/list"]').click();
        cy.get('h3').contains('Связный список');
    });
}); 
