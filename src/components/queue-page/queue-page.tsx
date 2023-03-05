import React, { FormEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { HEAD, TAIL } from "../../constants/element-captions";
import { Queue } from "./initQueue";
import style from './queue-page.module.css';
import { SHORT_DELAY_IN_MS } from "../../constants/delays";


const queue = new Queue<string>(6);

export const QueuePage: React.FC = () => {
  const [items, setItems] = useState<Array<string | null>>(Array('', '', '', '', '', ''))
  const [head, setHead] = useState<number | null>(null);
  const [tail, setTail] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [isDeleting, setDeleting] = useState(false);
  const [isAdding, setAdding] = useState(false);
  const [loader, setLoader] = useState(false);

  const onChange = () => {
    const input = document.forms?.namedItem('queueForm')?.elements[1] as HTMLInputElement;
    if(input.value === '') { 
      setDisabled(true) 
    } else {
      setDisabled(false)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements[1]
    const data = (input as HTMLInputElement).value
    addEl(data);
    (input as HTMLInputElement).value = '';
    setDisabled(true);
    setLoader(true);
  }
  

  const addEl = (data: string) => {
    let { head, tail, body } = queue.enqueue(data);
    setHead(head);
    setTail(tail);
    const arr = [...items];
    for (let i = head; i < tail; i++) {
      arr[i] = body[i];
    }
    setItems([...arr])
    setAdding(true);
    setTimeout(setAdding, SHORT_DELAY_IN_MS, (false))
    setTimeout(setLoader, SHORT_DELAY_IN_MS, (false));
  }

  const onDelete = () => {
    if(head !== null && tail !== null) {
      setLoader(true)
      setDeleting(true);
      queue.dequeue();
      const arr = [...items];
      if(head !== null) {
        arr[head] = '';
        setTimeout(setHead, SHORT_DELAY_IN_MS, (head + 1));
      }
      setTimeout(setDeleting,SHORT_DELAY_IN_MS, (false));
      setTimeout(setItems,SHORT_DELAY_IN_MS, ([...arr]));
      setTimeout(setLoader, SHORT_DELAY_IN_MS, false);
    }
  }

  const setDescriptions = (item: string | null, index: number) => {
    const descriptions: Array<string | null> = [null, null]
    if(item) {
      if (index === head) { descriptions[0] = HEAD }
      if (tail !==null && index === tail - 1) { descriptions[1] = TAIL }
    }
    return descriptions
  }

  const onReset = () => {
    queue.resqueue();
    setItems(Array('', '', '', '', '', ''))
  }

  const setColor = (index: number) => {
    if(tail !== null && index === tail-1) {
      return isAdding ? ElementStates.Changing :ElementStates.Default
    }
    if(head !== null && index === head) {
      return isDeleting ? ElementStates.Changing :ElementStates.Default
    }
    return ElementStates.Default
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={style.form} onSubmit={onSubmit} onReset={onReset} name='queueForm'>
        <fieldset className={style.container}  >
          <Input
            maxLength={4}
            isLimitText={true}
            id='input'
            onChange={onChange} />
          <Button
            text='Добавить'
            type='submit'
            disabled={disabled}
            isLoader={loader} />
          <Button
            text="Удалить"
            type='button'
            onClick={onDelete} 
            isLoader={loader} />
        </fieldset>
        <Button
          text="Очистить"
          type='reset' 
          isLoader={loader} />
      </form>
      <ul className={style.display}>
        {items && items.map((item, index) =>
          <li className={style.circle} key={index}>
            <Circle
              head={setDescriptions(item, index)[0]}
              tail={setDescriptions(item, index)[1]}
              letter={`${item}`}
              index={index}
              state={setColor(index)}
            />
          </li>
        )}
      </ul>
    </SolutionLayout>
  );
};
