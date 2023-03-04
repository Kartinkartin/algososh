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
  const [arr, setArr] = useState<Array<number>>([]);
  const [inSorting, setSorting] = useState<[number, number] | []>([]);
  const [ascendLoader, setAscendLoader] = useState<boolean | undefined>(false);
  const [descendLoader, setDescendLoader] = useState<boolean | undefined>(false);
  const sortType = (document.forms.namedItem('form')?.elements.namedItem('sortType') as RadioNodeList)?.value;
  const [sortedIndex, setSortedInex] = useState<number | null>(null);

  // учитывать выбор или Пузырек. 
  const ascendingSortHandler = () => {
    setAscendLoader(true);
    const sortType = (document.forms.namedItem('form')?.elements.namedItem('sortType') as RadioNodeList)?.value;
    if (sortType === 'selectionSort') {
      selectionSortAscending([...arr]);
    } else {
      bubbleSortAscending([...arr]);
    }
  }

  const descendingSortHandler = () => {
    setDescendLoader(true);
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
    setSortedInex(null);

    const { length } = arr;
    const items = [...arr];
    let counter = 0;
    for (let i = 0; i < length; i++) {
      let maxInd = i;
      for (let j = i + 1; j < length; j++) {
        setTimeout(setSorting, SHORT_DELAY_IN_MS * counter, ([maxInd, j]));
        if (items[maxInd] > items[j]) {
          swap(items, maxInd, j)
          setTimeout(setArr, SHORT_DELAY_IN_MS * counter, ([...items]));
        }
        setTimeout(setSortedInex, SHORT_DELAY_IN_MS * counter, maxInd);
        counter++;
      }
    }
    setTimeout(setSorting, SHORT_DELAY_IN_MS * counter, ([]));
  };

  // сортировка выбором по убыванию
  const selectionSortDescending = (arr: number[]) => {
    setSortedInex(null);

    const { length } = arr;
    const items = [...arr];
    let counter = 0;
    for (let i = 0; i < length; i++) {
      let minInd = i;
      for (let j = i + 1; j < length; j++) {
        setTimeout(setSorting, SHORT_DELAY_IN_MS * counter, ([minInd, j]));
        if (items[minInd] < items[j]) {
          swap(items, minInd, j)
          setTimeout(setArr, SHORT_DELAY_IN_MS * counter, ([...items]));
        }
        setTimeout(setSortedInex, SHORT_DELAY_IN_MS * counter, minInd);
        counter++;
      }
    }
    setTimeout(setSorting, SHORT_DELAY_IN_MS * counter, ([]));
  };

  //Сортировка пузырьком по возрастанию
  const bubbleSortAscending = (arr: number[]) => {
    setSortedInex(null);

    const { length } = arr;
    const items = [...arr];
    let counter = 0
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (items[j] > items[j + 1]) {
          setTimeout(setSorting, SHORT_DELAY_IN_MS * counter, ([j, j + 1]));
          swap(items, j, j + 1);
          counter++;
          setTimeout(setArr, SHORT_DELAY_IN_MS * counter, [...items]);
        }
        setTimeout(setSortedInex, SHORT_DELAY_IN_MS * counter, length - i - 1);
      }
    }
    setTimeout(setSorting, SHORT_DELAY_IN_MS * counter, []);
  }

  //Сортировка пузырьком по убыванию
  const bubbleSortDescending = (arr: number[]) => {
    setSortedInex(null);

    const { length } = arr;
    const items = [...arr]
    let counter = 0
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (items[j] < items[j + 1]) {
          setTimeout(setSorting, SHORT_DELAY_IN_MS * 1 * counter, ([j, j + 1]));
          swap(items, j, j + 1);
          counter++;
          setTimeout(setArr, SHORT_DELAY_IN_MS * 1 * counter, [...items]);
        }
        setTimeout(setSortedInex, SHORT_DELAY_IN_MS * counter, length - i - 1);
      }
    }
    setTimeout(setSorting, SHORT_DELAY_IN_MS * counter, []);
  }

  const randomArr = () => {
    // массив должен состоять из целых чисел [0;100],
    // минимальное количество элементов массива minLen = 3, максимальное maxLen = 17.
    setSortedInex(null); // сбрасываю состояние для отрисовки
    const length = Math.round(Math.random() * 14) + 3;
    const arr = Array(length);
    for (let i = 0; i < length; i++) {
      arr[i] = Math.round(Math.random() * 100)
    }
    setArr(arr);
  }

  const typeState = (index: number) => {
    if(inSorting.length) {
      if (inSorting.includes(index)) {
        return ElementStates.Changing
      } else if(sortType === 'selectionSort' && sortedIndex) {
        if (index < sortedIndex) { return ElementStates.Modified }
      } else if(sortType === 'bubbleSort' && sortedIndex) {
        if (index > sortedIndex) { return ElementStates.Modified }
      } else {
        return ElementStates.Default
      }
    }
    if(!inSorting.length && sortedIndex) {
      return ElementStates.Modified
    }
    return ElementStates.Default
  }

  useEffect(() => {
    setSortedInex(null);
    setSorting([]);
    setArr([]);
    randomArr();
  }, [])

  useEffect(()=> {
    console.log(sortedIndex)
    if(sortType === 'selectionSort' && sortedIndex) {
      if (sortedIndex === arr.length-2) {  
        setAscendLoader(false);
        setDescendLoader(false);
      }
    } else if(sortType === 'bubbleSort' && sortedIndex) {
      if (sortedIndex === 1) {  
        setAscendLoader(false);
        setDescendLoader(false); 
      }
    }
  }, [sortedIndex])

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={style.form} name='form'>
        <fieldset className={style.checkboxes}>
          <RadioInput label='Выбор' name='sortType' value='selectionSort' defaultChecked />
          <RadioInput label='Пузырёк' name='sortType' value='bubbleSort'  />
        </fieldset>
        <div className={style.buttonsBox}>
          <div className={style.sortButtons}>
            <Button text='По возрастанию'
              sorting={Direction.Ascending}
              onClick={ascendingSortHandler}
              isLoader={ascendLoader}
              disabled={descendLoader} />
            <Button text='По убыванию'
              sorting={Direction.Descending}
              onClick={descendingSortHandler}
              isLoader={descendLoader}
              disabled={ascendLoader} />
          </div>
          <Button
            text='Новый массив'
            onClick={randomArr}
            disabled={ascendLoader || descendLoader} />
        </div>
      </form>
      <ul className={style.arrContainer}>
        {arr && arr.map((item, index) => (
          <li className={style.element} key={index} >
            <Column
              index={item}
              state={typeState(index)} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
