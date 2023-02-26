import React, { FormEvent, useEffect, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./initClass";
import style from './stack-page.module.css';

type TItems<T> = {
  value: T;
  color?: ElementStates.Default | ElementStates.Changing ;
}

export const StackPage: React.FC = () => {
  const stack = new Stack<string>();
  const [items, setItems] = useState<Array<TItems<string>>>([]);
  const [loader, setLoader] = useState(false)
  const [disabled, setDisabled] = useState(true);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    debugger
    if ((e.target as HTMLInputElement).value === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }


  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setLoader(true);
    const input: HTMLInputElement = document.querySelector('input')!;
    const el: string = input.value;
    if(el !== '') {
      stack.push(el);
      setItems([...items, {value: el, color: ElementStates.Changing}]);
    }
    input.value = '';
    setDisabled(true)
    setLoader(false)
  }

  const onDelete = (): void => {
    setLoader(true);
    setColor(items);
    setTimeout(setItems, DELAY_IN_MS, [...items.slice(0, -1)])
    stack.pop();
    setLoader(false)
  }
  const setColor = (items: Array<TItems<string>>) => {
    const arr = items;
    if(items.length) {
      if(arr[arr.length-1].color === ElementStates.Default){
        arr[arr.length-1].color = ElementStates.Changing
      } else {
        arr[arr.length-1].color = ElementStates.Default
      }
      return setItems(arr);
    }
  }

  const onReset = (): void => {
    setLoader(true)
    while(stack.getSize()) {
      stack.pop()
    }
    setItems([])
    setLoader(false)

 }
  useEffect(()=>{
    setTimeout(setColor, DELAY_IN_MS, items);
  }, [items])
  
  return (
    <SolutionLayout title="Стек">
      <form className={style.form} onSubmit={onSubmit} onReset={onReset}>
        <fieldset className={style.container} >
          <Input 
          maxLength={4} 
          isLimitText={true}
          onChange={onChange} />
          <Button
            text='Добавить'
            type='submit' 
            isLoader={loader}
            disabled={disabled}
            />
          <Button
            text="Удалить"
            type='button'
            isLoader={loader}
            onClick={onDelete} />
        </fieldset>
        <Button
          text="Очистить"
          type='reset' 
          isLoader={loader} />
      </form>
      <ul className={style.display}>
        {!!items.length &&
          (items.map((item, index) => {
            const head: string | null = items.length-index ==1 ? 'top' : null;
            if (item) {
              return ( <Circle 
              letter={item.value} 
              index={index} 
              head={head} 
              state={item.color} 
              key={index} />)
            }
          }
          ))
        }
      </ul>

    </SolutionLayout>
  );
};
