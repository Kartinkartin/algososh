import React, { useState } from "react";
import { HEAD, TAIL } from "../../constants/element-captions";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Node, LinkedList } from "./initList";
import styles from './list-page.module.css';

const list = new LinkedList<string>();
const initItems = ['0', '34', '8', '1'];
for (let item of initItems) {
  list.append(item);
}

export const ListPage: React.FC = () => {
  const [counter, setCounter] = useState<number | null>(null);

  const addToHead = () => { }
  
  const addToTail = () => {
    const input = document.forms.namedItem('listForm')?.elements.namedItem('valueInput');
    debugger
  }

  const printHandle = () => {
    const items: Array<string> = list.print();
    const size = list.getSize();
    return items && items.map((item, index) => {
      return (
        <li className={styles.item} key={index} >
          <Circle
            letter={item}
            index={index}
            extraClass="ml-8 mr-8" 
            head={index===0 ? HEAD : null}
            tail={index===size-1 ? TAIL : null} />
          {index !== size - 1 && (<ArrowIcon />)}
        </li>
      )
    })
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} name='listForm' >
        <fieldset className={styles.form_line}>
          <div className={styles.input}>
            <Input
              placeholder="Введите значение"
              maxLength={4}
              isLimitText={true}
              extraClass='pr-6'
              name='valueInput' />
          </div>
          <Button
            text='Добавить в head'
            type='button'
            linkedList="small"
            extraClass='ml-6 mr-6'
            onClick={addToHead} />
          <Button
            text='Добавить в tail'
            type='button'
            linkedList="small"
            extraClass='mr-6' 
            onClick={addToTail} />
          <Button
            text='Удалить из head'
            type='button'
            linkedList="small"
            extraClass='mr-6' />
          <Button
            text='Удалить из tail'
            type='button'
            linkedList="small"
            extraClass='mr-6' />
        </fieldset>
        <fieldset className={styles.form_line}>
          <div className={styles.input}>
            <Input
              placeholder="Введите индекс"
              extraClass='pr-6'
              type="number"
            />
          </div>
          <Button
            text='Добавить по индексу'
            type='button'
            linkedList="big"
            extraClass='ml-6 mr-6' />
          <Button
            text='Удалить по индексу'
            type='button'
            linkedList="big"
            extraClass='mr-6' />
        </fieldset>
      </form>
      <ul className={styles.display}>
        {printHandle()}
      </ul>
    </SolutionLayout>
  );
};
