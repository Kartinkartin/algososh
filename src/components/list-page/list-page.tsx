import React, { useEffect, useState } from "react";
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
  list.appendTail(item);
}

export const ListPage: React.FC = () => {
  const [counter, setCounter] = useState<number | null>(null);
  const [size, setSize] = useState<number>(() => list.getSize());
  const [indexDisabled, setIndexDisabled] = useState(true);
  const [valueDisabled, setValueDisabled] = useState(true);

  const addToHead = () => {
    const input = document.forms.namedItem('listForm')?.elements.namedItem('valueInput') as HTMLInputElement;
    const data = input?.value;
    list.appendHead(data);
    setSize((size) => list.getSize())
    input.value = '';
  }

  const addToTail = () => {
    const input = document.forms.namedItem('listForm')?.elements.namedItem('valueInput') as HTMLInputElement;
    const data = input?.value;
    list.appendTail(data);
    setSize((size) => list.getSize())
    input.value = '';
  }

  const deleteHead = () => {
    list.removeHead();
    setSize((size) => list.getSize());
  }

  const deleteTail = () => {
    list.removeTail();
    setSize((size) => list.getSize());
  }

  const addIndex = () => {
    const inputData = document.forms.namedItem('listForm')?.elements.namedItem('valueInput') as HTMLInputElement;
    const data: string = inputData.value;
    const inputIndex = document.forms.namedItem('listForm')?.elements.namedItem('indexInput') as HTMLInputElement;
    const index: number = +inputIndex.value;
    list.insertAt(data, index)
    setSize((size) => list.getSize());
  }

  const removeIndex = () => {
    const inputIndex = document.forms.namedItem('listForm')?.elements.namedItem('indexInput') as HTMLInputElement;
    const index: number = +inputIndex.value;
    list.removeAt(index);
    setSize((size) => list.getSize());
  }

  const onChangeValue = () => {
    const inputData = document.forms.namedItem('listForm')?.elements.namedItem('valueInput') as HTMLInputElement;
    const data: string = inputData.value;
    if(data === '') {
      setValueDisabled(true);
    } else {
      setValueDisabled(false);
    }
  }

  const onChangeIndex = () => {
    const inputIndex = document.forms.namedItem('listForm')?.elements.namedItem('indexInput') as HTMLInputElement;
    const data: string = inputIndex.value;
    if(data === '') {
      setIndexDisabled(true);
    } else {
      setIndexDisabled(false);
    }
  }

  const printHandle = () => {
    const items: Array<string> = list.print();
    return !!size && items.map((item, index) => {
      return (
        <li className={styles.item} key={index} >
          <Circle
            letter={item}
            index={index}
            extraClass="ml-8 mr-8"
            head={index === 0 ? HEAD : null}
            tail={index === size - 1 ? TAIL : null} />
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
              name='valueInput'
              onChange={onChangeValue} />
          </div>
          <Button
            text='Добавить в head'
            type='button'
            linkedList="small"
            extraClass='ml-6 mr-6'
            onClick={addToHead}
            disabled={valueDisabled} />
          <Button
            text='Добавить в tail'
            type='button'
            linkedList="small"
            extraClass='mr-6'
            onClick={addToTail}
            disabled={valueDisabled} />
          <Button
            text='Удалить из head'
            type='button'
            linkedList="small"
            extraClass='mr-6'
            onClick={deleteHead} />
          <Button
            text='Удалить из tail'
            type='button'
            linkedList="small"
            extraClass='mr-6'
            onClick={deleteTail} />
        </fieldset>
        <fieldset className={styles.form_line}>
          <div className={styles.input}>
            <Input
              placeholder="Введите индекс"
              extraClass='pr-6'
              type="number"
              name='indexInput'
              onChange={onChangeIndex}
            />
          </div>
          <Button
            text='Добавить по индексу'
            type='button'
            linkedList="big"
            extraClass='ml-6 mr-6'
            onClick={addIndex}
            disabled={indexDisabled || valueDisabled} />
          <Button
            text='Удалить по индексу'
            type='button'
            linkedList="big"
            extraClass='mr-6'
            onClick={removeIndex}
            disabled={indexDisabled} />
        </fieldset>
      </form>
      <ul className={styles.display}>
        {printHandle()}
      </ul>
    </SolutionLayout>
  );
};
