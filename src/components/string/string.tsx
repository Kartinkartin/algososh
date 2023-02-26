import React, { useEffect, useState } from "react";
import style from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [letters, setLetters] = useState<Array<string> | null>(null)
  const [counter, setCounter] = useState<number>(-1);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setLoader(true)
    setCounter(-1);
    const input = document.querySelector('input')!;
    const str = input.value;
    reverseFunc(str);
    input.value = '';
  }

  const reverseFunc = (str: string) => {
    const arr = str.split('');
    setLetters(arr);
    // setTimeout(`${DELAY_IN_MS}`);
    // for(let i =0; i < arr.length/2; i++ ){
    //   setTimeout(setLetters, DELAY_IN_MS,(letters: any)=>{ 
    //     const arr = letters.slice();
    //     debugger
    //     swap(arr, i); 
    //     setCounter(i+1);
    //     return [...arr] 
    //   })
    // }
  }
  //меняет местами два элемента 
  const swap = (arr: Array<string>, index: number) => {
    const tmp = arr[index];
    arr[index] = arr[arr.length - 1 - index];
    arr[arr.length - 1 - index] = tmp
  }
  const typeHandler = (arr: Array<string>, index: number, counter: number) => {
    if (index < counter || index > arr.length - 1 - counter) { return ElementStates.Changing }
    if (index > counter && index < arr.length - 1 - counter) { return ElementStates.Default }
    if (index === counter || index === arr.length - 1 - counter) { return ElementStates.Modified }
  }
  useEffect(() => {
    if (counter === -1) {
      setTimeout(setCounter, DELAY_IN_MS, 0)
    } else {
      const index = counter
      const delay = DELAY_IN_MS * (index + 1);
      if (letters?.length && index < letters.length / 2) {
        setTimeout(setLetters, delay, (letters: any) => {
          const arr = letters.slice();
          debugger
          swap(arr, index);
          return [...arr]
        })
        setCounter(index + 1);
      }
    }
  }, [letters, counter])

  return (
    <SolutionLayout title="Строка">
      <div className={style.main}>
        <form className={style.form} onSubmit={(e) => { onSubmit(e) }}>
          <Input
            maxLength={11}
            isLimitText={true}
          />
          <Button
            text='Развернуть'
            type='submit'
            isLoader={loader}
          />
        </form>
        <ul className={style.container}>
          {letters && letters.map((letter, index) =>
            <Circle
              state={typeHandler(letters, index, counter)}
              key={index}
              letter={letter}
            />
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
