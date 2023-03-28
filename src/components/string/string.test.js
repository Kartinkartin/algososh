import React from "react";
import { reverseString } from "./utils";

describe("Тестирование функции разворота строки", () => {
    it('Корректно разворачивает строку с чётным количеством символов', () => {
        expect(reverseString('1234')).toContainEqual(['4', '3', '2', '1']);
    })
    it('Корректно разворачивает строку с нечетным количеством символов', () => {
        expect(reverseString('12345')).toContainEqual(['5', '4', '3', '2', '1']);
    })
    it('Корректно разворачивает строку с одним символом', () => {
        expect(reverseString('1')).toContainEqual(['1']);
    })
    it('Корректно разворачивает строку пустую строку', () => {
        expect(reverseString('')).toEqual([]);
    })
})
