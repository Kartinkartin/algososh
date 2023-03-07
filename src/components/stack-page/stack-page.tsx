import React, { FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./initClass";
import style from './stack-page.module.css';

type TItems<T> = {
  value: T;
  color?: ElementStates.Default | ElementStates.Changing;
}

export const StackPage: React.FC = () => {
  const stack = new Stack<string>();
  const [items, setItems] = useState<Array<TItems<string>>>([]);
  const [loader, setLoader] = useState(false)
  const nameInput = 'stackInput';
  const {values, handleChange, setValues} = useForm({[nameInput]: ''});

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setLoader(true);
    const el: string = values[nameInput];
    if (el !== '') {
      stack.push(el);
      setItems([...items, { value: el, color: ElementStates.Changing }]);
    }
    setValues({[nameInput]: ''});
    setTimeout(setItems, SHORT_DELAY_IN_MS, ((items: Array<TItems<string>> | []) => {
      const arr = items;
      if (arr.length) {
        arr[arr.length - 1].color = ElementStates.Default
      }
      setLoader(false);
      return [...arr];
    }))
  }

  const onDelete = (): void => {
    setLoader(true);
    setItems((items: Array<TItems<string>> | []) => {
      const arr = items;
      if (arr.length) {
        arr[arr.length - 1].color = ElementStates.Changing
      }
      return [...arr];
    })
    function deleteHandle() {
      setItems([...items.slice(0, -1)]);
      stack.pop();
      setLoader(false)
    } 
    setTimeout(deleteHandle, SHORT_DELAY_IN_MS)
  }

  const onReset = (): void => {
    setLoader(true)
    while (stack.getSize()) {
      stack.pop()
    }
    setItems([])
    setLoader(false)

  }

  return (
    <SolutionLayout title="Стек">
      <form className={style.form} onSubmit={onSubmit} onReset={onReset}>
        <fieldset className={style.container} >
          <Input
            maxLength={4}
            isLimitText={true}
            value={values[nameInput]}
            onChange={handleChange}
            name={nameInput} />
          <Button
            text='Добавить'
            type='submit'
            isLoader={loader}
            disabled={!values[nameInput]}
          />
          <Button
            text="Удалить"
            type='button'
            isLoader={loader}
            onClick={onDelete}
            disabled={!items.length}  />
        </fieldset>
        <Button
          text="Очистить"
          type='reset'
          isLoader={loader}
          disabled={!items.length} />
      </form>
      <ul className={style.display}>
        {!!items.length &&
          (items.map((item, index) => {
            const head: string | null = items.length - index === 1 ? 'top' : null;
            if (item) {
              return (<Circle
                letter={item.value}
                index={index}
                head={head}
                state={item.color}
                key={index}
                extraClass='ml-6 mr-6' />)
            }
            return null
          }
          ))
        }
      </ul>

    </SolutionLayout>
  );
};
