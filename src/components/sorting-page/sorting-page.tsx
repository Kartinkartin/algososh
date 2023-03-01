import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
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
    const sortType = (document.forms.namedItem('form')?.elements.namedItem('sortType') as RadioNodeList)?.value;
    if (sortType === 'selectionSort') {
      selectionSortAscending([...arr])
    } else {
      bubbleSortAscending([...arr])
    }
  }

  const descendingSortHandler = () => {
    const sortType = (document.forms.namedItem('form')?.elements.namedItem('sortType') as RadioNodeList)?.value;
    if (sortType === 'selectionSort') {
      selectionSortDescending([...arr])
    } else {
      bubbleSortDescending([...arr])
    }
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
      for (let j = i + 1; j < length; j++) {
        setTimeout(setArr, SHORT_DELAY_IN_MS*j, ((arr: number[]) => {
          if (arr[maxInd] > arr[j]) {
            swap(arr, maxInd, j)
          }
          return [...arr]
        }))
        
      }
    }
    setArr([...arr])
  };
  // сортировка выбором по убыванию
  const selectionSortDescending = (arr: number[]) => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      let minInd = i;
      for (let j = i + 1; j < length; j++) {
        setTimeout(setArr, SHORT_DELAY_IN_MS*(j+i), ((arr: number[]) => {
          if (arr[minInd] < arr[j]) {
            swap(arr, minInd, j)
          }
          return [...arr]
        }))
        
      }
    }
    setArr([...arr])

  };

  //Сортировка пузырьком по возрастанию
  const bubbleSortAscending = (arr: number[]) => {
    const { length } = arr;
    for (let i = 0; i < length-1; i++) {
      for (let j = 0; j < length - i; j++) {
        setTimeout(setArr, SHORT_DELAY_IN_MS*(j+i),((arr) => {
          if (arr[i] > arr[i + 1]) {
            swap(arr, i, i + 1)
          }
          return [...arr]
        }))
        
      }
    }
    setArr([...arr])
  }
  //Сортировка пузырьком по возрастанию
  const bubbleSortDescending = (arr: number[]) => {
    // console.log(arr)
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i; j++) {
        setTimeout(setArr, SHORT_DELAY_IN_MS*(j+i), ((arr) => {
          if (arr[i] < arr[i + 1]) {
            swap(arr, i, i + 1)
          }
          // console.log(`i=${i}, j=${j}, ${arr}`)
          return [...arr]
        }))
      }
    }
  }

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
      <form className={style.form} name='form'>
        <fieldset className={style.checkboxes}>
          <RadioInput label='Выбор' name='sortType' value='selectionSort' defaultChecked />
          <RadioInput label='Пузырёк' name='sortType' value='bubbleSort' />
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
            <Column 
            index={item}
            state={ElementStates.Default} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
