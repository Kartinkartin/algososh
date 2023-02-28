import React, { useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './sorting-page.module.css';

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<Array<number>>([])

  // учитывать два условия. 
  // Выбор или Пузырек. 
  // Сортировка по возрастанию или убыванию
  const ascendingSortHandler = () => {
    selectionSortAscending([...arr])
  }

  const descendingSortHandler = () => {
    selectionSortDescending([...arr])
  }

  const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };
  
  // сортировка выбором по возрастанию
  const selectionSortAscending = (arr: number[]) => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      let maxInd = i;
      for (let j = i+1; j < length; j++) {
        if (arr[maxInd] > arr[j])
        {
          swap(arr, maxInd, j)
        }
      }
    }
    setArr([...arr])
  };
  // сортировка выбором по убыванию
  const selectionSortDescending = (arr: number[]) => {
    const { length } = arr;
    for (let i = 0; i < length ; i++) {
      let maxInd = i;
      for (let j = i+1; j < length ; j++) {
        if (arr[maxInd] < arr[j])
        {
          swap(arr, maxInd, j)
        }
      }
    }
    setArr([...arr])

  };

  //Сортировка пузырьком — один из самых известных алгоритмов сортировки. 
  // Здесь нужно последовательно сравнивать значения соседних элементов
  // и менять числа местами, если предыдущее оказывается больше последующего.
  // Таким образом элементы с большими значениями оказываются в конце списка,
  // а с меньшими остаются в начале.

  const randomArr = () => {
    // массив должен состоять из целых чисел [0;100],
    // минимальное количество элементов массива minLen = 3, максимальное maxLen = 17.
    const length = Math.round(Math.random() * 14) + 3;
    const arr = Array(length);
    for (let i = 0; i < length; i++) {
      arr[i] = Math.round(Math.random() * 100)
    }
    setArr(arr);
  }

  useEffect(() => {
    randomArr();
  }, [])

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={style.form}>
        <fieldset className={style.checkboxes}>
          <RadioInput label='Выбор' name='sortType' defaultChecked />
          <RadioInput label='Пузырёк' name='sortType' />
        </fieldset>
        <div className={style.buttonsBox}>
          <div className={style.sortButtons}>
            <Button text='По возрастанию' sorting={Direction.Ascending} onClick={ascendingSortHandler} />
            <Button text='По убыванию' sorting={Direction.Descending} onClick={descendingSortHandler} />
          </div>
          <Button text='Новый массив' onClick={randomArr} />
        </div>
      </form>
      <ul className={style.arrContainer}>
        {arr && arr.map((item, index) => (
          <li className={style.element} key={index} >
            <Column index={item} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
