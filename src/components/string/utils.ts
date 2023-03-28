import React from "react";
import { ElementStates } from "../../types/element-states";

//развораччивает массив, возвращает массив шагов для отрисовки
export const reverseString = (letters: Array<string>): Array<Array<string>> => {
  const iterations: Array<Array<string>> = [];
  const arr = [...letters];
  for (let i = 0; i < letters.length / 2; i++) {
    swap(arr, i);
    iterations.push([...arr]);
  }
  return iterations;
}

//меняет местами два элемента 
const swap = (arr: Array<string>, index: number) => {
  const tmp = arr[index];
  arr[index] = arr[arr.length - 1 - index];
  arr[arr.length - 1 - index] = tmp;
}

// устанавливает цвет
export const typeHandler = (arr: Array<string>, index: number, counter: number) => {
  if (index < counter || index > arr.length - 1 - counter) {
    return ElementStates.Modified
  }
  if (index > counter && index < arr.length - 1 - counter) {
    return ElementStates.Default
  }
  if (index === counter || index === arr.length - 1 - counter) {
    return ElementStates.Changing
  }
}

