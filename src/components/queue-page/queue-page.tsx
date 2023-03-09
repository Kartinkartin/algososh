import React, { FormEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { HEAD, TAIL } from "../../constants/element-captions";
import { Queue } from "./initQueue";
import style from './queue-page.module.css';
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";


const queue = new Queue<string>(6);

export const QueuePage: React.FC = () => {
  const [items, setItems] = useState<Array<string | null>>(['', '', '', '', '', ''])
  const [head, setHead] = useState<number | null>(null);
  const [tail, setTail] = useState<number | null>(null);
  const [isDeleting, setDeleting] = useState(false);
  const [isAdding, setAdding] = useState(false);
  const [loader, setLoader] = useState(false);
  const nameInput = 'queueInput';
  const { values, handleChange, setValues } = useForm({[nameInput]: ''})

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = values[nameInput];
    addEl(data);
    setValues({...values, [nameInput]: ''});
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
    setHead(null);
    setTail(null);
    setItems(['', '', '', '', '', ''])
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
            onChange={handleChange}
            name={nameInput}
            value={values[nameInput]}
          />
          <Button
            text='Добавить'
            type='submit'
            disabled={!values[nameInput]}
            isLoader={loader} />
          <Button
            text="Удалить"
            type='button'
            onClick={onDelete} 
            isLoader={loader}
            disabled={head===null || tail===null || head === tail } />
        </fieldset>
        <Button
          text="Очистить"
          type='reset' 
          isLoader={loader}
          disabled={head===null || tail===null || head === tail} />
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
