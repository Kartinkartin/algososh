import React, { FormEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { HEAD, TAIL } from "../../constants/element-captions";
import { Queue } from "./initQueue";
import style from './queue-page.module.css';


const queue = new Queue<string>(6);

export const QueuePage: React.FC = () => {
  const [items, setItems] = useState<Array<string | null>>(Array('', '', '', '', '', ''))
  const [head, setHead] = useState(0);
  const [tail, setTail] = useState(0)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements[1]
    const data = (input as HTMLInputElement).value
    addEl(data);
    (input as HTMLInputElement).value = ''
  }

  const addEl = (data: string) => {
    let {head, tail, body} = queue.enqueue(data);
    setHead(head);
    setTail(tail);
    const arr = items;
    for (let i = head; i< tail; i++) {
      arr[i] = body[i];
    }
    setItems([...arr])
  } 

  const onDelete = () => {
    queue.dequeue();
    const arr = items;
    arr[head] = '';
    setHead(head+1);
    setItems([...arr])
  }
  const setDescriptions = (item: string | null, index: number) => {
    const descriptions: Array<string | null>= [null, null]
    if(item && index === head) { descriptions[0] = HEAD }
    if(item && index === tail-1) { descriptions[1] = TAIL }
    return descriptions
  }

  const onReset = () => {
    queue.resqueue();
    setItems(Array('', '', '', '', '', ''))
  }
  
 
  return (
    <SolutionLayout title="Очередь">
      <form className={style.form} onSubmit={onSubmit} onReset={onReset}>
        <fieldset className={style.container} >
          <Input 
          maxLength={4} 
          isLimitText={true}
          id='input' />
          <Button
            text='Добавить'
            type='submit' />
          <Button
            text="Удалить"
            type='button'
            onClick={onDelete} />
        </fieldset>
        <Button
          text="Очистить"
          type='reset' />
      </form>
      <ul className={style.display}>
          {items && items.map((item, index) =>
            <li className={style.circle} key={index}>
              <Circle
                head={setDescriptions(item, index)[0]}
                tail={setDescriptions(item, index)[1]}
                letter={`${item}`}
                index={index}
              />
            </li>
          )}
        </ul>

    </SolutionLayout>
  );
};
