import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList, TPoint } from "./initList";
import styles from './list-page.module.css';

const list = new LinkedList<TPoint>();
const initItems = ['0', '34', '8', '1'];
for (let item of initItems) {
  list.appendTail({ value: item, state: ElementStates.Default });
}

export const ListPage: React.FC = () => {
  const [counter, setCounter] = useState<number | null>(null);
  const [size, setSize] = useState<number>(() => list.getSize());
  const [items, setItems] = useState<Array<TPoint | null>>([]);
  const [smallValue, setSmallValue] = useState<TPoint | null>(null);
  const valueInput = 'valueInput';
  const indexInput = 'indexInput';
  const { values, handleChange, setValues } = useForm({[valueInput]: '', [indexInput]: ''});
  const [isDeleting, setDeleting] = useState(false);
  const [isAdding, setAdding] = useState(false);

  const addToHead = () => {
    const data = values[valueInput];
    const newItem: TPoint = { value: data, state: ElementStates.Changing }
    setAdding(true);
    setCounter(0);
    setSmallValue(newItem);
    // отрисовка нового списка
    const appendHandler = () => {
      list.appendHead({ value: data, state: ElementStates.Modified });
      setSize((size) => list.getSize());
      setAdding(false);
    }
    setTimeout(appendHandler, SHORT_DELAY_IN_MS);
    // отрисовка нового списка синим
    const returnToDef = () => {
      list.removeHead();
      list.appendHead({ value: data, state: ElementStates.Default });
      setCounter(null);
    }
    setTimeout(returnToDef, SHORT_DELAY_IN_MS * 2);
    setValues({...values, [valueInput]: ''})
  }

  const addToTail = () => {
    const data = values[valueInput];
    const newItem: TPoint = { value: data, state: ElementStates.Changing }
    setAdding(true);
    setCounter(size - 1);
    setSmallValue(newItem);
    // Рендер с новым зеленым элементом
    const appendHandler = () => {
      list.appendTail({ value: data, state: ElementStates.Modified });
      setSize((size) => list.getSize());
      setAdding(false);
    }
    setTimeout(appendHandler, SHORT_DELAY_IN_MS);
    // новый список, окрашенный синим
    const returnToDef = () => {
      list.removeTail();
      list.appendTail({ value: data, state: ElementStates.Default });
      setCounter(null);
    }
    setTimeout(returnToDef, SHORT_DELAY_IN_MS * 2);
    setValues({...values, [valueInput]: ''})
  }

  const deleteHead = () => {
    setDeleting(true);
    setCounter(0);
    const item = {
      value: '',
      state: ElementStates.Default
    }
    const items = [...list.print()];
    setSmallValue({ value: items[0].value, state: ElementStates.Changing })
    list.removeHead();
    list.appendHead(item);
    function deleteHandle() {
      list.removeHead();
      setSize((size) => list.getSize());
      setDeleting(false);
      setCounter(null);
    }
    setTimeout(deleteHandle, SHORT_DELAY_IN_MS);
  }

  const deleteTail = () => {
    setDeleting(true);
    setCounter(size - 1);
    const item = {
      value: '',
      state: ElementStates.Default
    }
    const items = [...list.print()];
    setSmallValue({ value: items[items.length - 1].value, state: ElementStates.Changing })
    list.removeTail();
    list.appendTail(item);
    function deleteHandle() {
      list.removeTail();
      setSize((size) => list.getSize());
      setDeleting(false);
      setCounter(null);
    }
    setTimeout(deleteHandle, SHORT_DELAY_IN_MS);
  }

  const addIndex = () => {
    const data: string = values[valueInput];
    const index: number = +values[indexInput];
    setCounter(0);
    setAdding(true);
    setSmallValue({ value: data, state: ElementStates.Changing })
    let arr = [...list.print()];
    const circleExchange = (i: number) => {
      list.removeAt(i);
      list.insertAt({ value: arr[i].value, state: ElementStates.Changing }, i);
      setItems([...list.print()]);
      setCounter(i + 1);
    }
    // меняет элементы до индекса
    for (let i = 0; i < index; i++) {
      setTimeout(circleExchange, SHORT_DELAY_IN_MS * (i + 1), (i));
    }
    // добавление
    function appendHandle() {
      setCounter(null);
      setAdding(false);
      //меняет отрисовку элементов на синюю обратно
      for (let i = 0; i < index; i++) {
        list.removeAt(i);
        list.insertAt({ value: arr[i].value, state: ElementStates.Default }, i);
      }
      list.insertAt({ value: data, state: ElementStates.Modified }, index);
      setSize((size) => list.getSize());
    }
    setTimeout(appendHandle, SHORT_DELAY_IN_MS * (index + 1));
    // отрисовка синим всего списка
    const finishRender = (index: number) => {
      list.removeAt(index);
      list.insertAt({ value: data, state: ElementStates.Default }, index);
      setCounter(null);
    }
    setTimeout(finishRender, SHORT_DELAY_IN_MS * (index + 2), index);
    setValues({[valueInput]: '', [indexInput]: ''});
  }

  const removeIndex = () => {
    const index: number = +values[indexInput];
    setCounter(index);
    let arr = [...list.print()]
    setSmallValue({ value: arr[index].value, state: ElementStates.Changing })
    const circleExchange = (i: number) => {
      list.removeAt(i);
      list.insertAt({ value: arr[i].value, state: ElementStates.Changing }, i);
      setItems([...list.print()]);
    }
    // меняет элементы до индекса
    for (let i = 0; i <= index; i++) {
      setTimeout(circleExchange, SHORT_DELAY_IN_MS * i, (i));
    }
    // отрисовка перед удалением
    const finishRender = (index: number) => {
      list.removeAt(index);
      list.insertAt({ value: '', state: ElementStates.Default }, index);
      setDeleting(true);
      setItems([...list.print()]);
    }
    setTimeout(finishRender, SHORT_DELAY_IN_MS * (index + 1), index);
    //удаление
    function deleteHandle() {
      //меняет отрисовку элементов на синюю обратно
      for (let i = 0; i < index; i++) {
        list.removeAt(i);
        list.insertAt({ value: arr[i].value, state: ElementStates.Default }, i);
      }
      list.removeAt(index);
      setSize((size) => list.getSize());
      setDeleting(false);
      setCounter(null);
    }
    setTimeout(deleteHandle, SHORT_DELAY_IN_MS * (index + 2));
    setValues({...values, [indexInput]: ''});
  }

  const printHandle = () => {
    const items: Array<TPoint> = [...list.print()];
    return !!size && items.map((item, index) => {
      return (
        <li className={styles.item_container} key={index} >
          {(isAdding && counter === index) &&
            (
              <div className={styles.upper_container}>
                <Circle
                  isSmall={true}
                  letter={smallValue?.value}
                  state={smallValue?.state}
                  extraClass='ml-12 pl-2' />
              </div>
            )}
          <div className={styles.item}>
            <Circle
              letter={item.value}
              index={index}
              extraClass="ml-8 mr-8 mt-4"
              state={item.state}
              head={index === 0 && !isAdding ? HEAD : null}
              tail={index === size - 1 && !isDeleting ? TAIL : null} />
            {index !== size - 1 && (<ArrowIcon />)}
          </div>
          {(isDeleting && counter === index) &&
            (
              <div className={styles.lower_container}>
                <Circle
                isSmall={true}
                letter={smallValue?.value}
                state={smallValue?.state}
                extraClass='ml-12 pl-2' />
              </div>)}
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
              value={values[valueInput]}
              onChange={handleChange} />
          </div>
          <Button
            text='Добавить в head'
            type='button'
            linkedList="small"
            extraClass='ml-6 mr-6'
            onClick={addToHead}
            disabled={!values[valueInput]}
            isLoader={isAdding || counter !== null} />
          <Button
            text='Добавить в tail'
            type='button'
            linkedList="small"
            extraClass='mr-6'
            onClick={addToTail}
            disabled={!values[valueInput]}
            isLoader={isAdding || counter !== null} />
          <Button
            text='Удалить из head'
            type='button'
            linkedList="small"
            extraClass='mr-6'
            onClick={deleteHead}
            isLoader={isAdding || counter !== null}
            disabled={!list.getSize()} />
          <Button
            text='Удалить из tail'
            type='button'
            linkedList="small"
            extraClass='mr-6'
            onClick={deleteTail}
            isLoader={isAdding || counter !== null}
            disabled={!list.getSize()} />
        </fieldset>
        <fieldset className={styles.form_line}>
          <div className={styles.input}>
            <Input
              placeholder="Введите индекс"
              extraClass='pr-6'
              type="number"
              name='indexInput'
              value={values[indexInput]}
              onChange={handleChange}
              min='0'
              max={`${list.getSize()-1}`}
            />
          </div>
          <Button
            text='Добавить по индексу'
            type='button'
            linkedList="big"
            extraClass='ml-6 mr-6'
            onClick={addIndex}
            disabled={ !values[indexInput] || !values[valueInput] || +values[indexInput] >= list.getSize() }
            isLoader={isAdding || counter !== null} />
          <Button
            text='Удалить по индексу'
            type='button'
            linkedList="big"
            extraClass='mr-6'
            onClick={removeIndex}
            disabled={ !values[indexInput] || +values[indexInput] >= list.getSize() }
            isLoader={isAdding || counter !== null} />
        </fieldset>
      </form>
      <ul className={styles.display}>
        {printHandle()}
      </ul>
    </SolutionLayout>
  );
};
