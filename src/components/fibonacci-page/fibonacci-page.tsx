import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './fibonacci-page.module.css';
import { fib } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [items, setItems] = useState<Array<number>>([]);
  const [loader, setLoader] = useState(false);
  const [n, setN] = useState<number | undefined>(undefined);
  const inputName = 'numInput';
  const { values, handleChange, setValues } = useForm({[inputName]: ''});

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setLoader(true);
    setItems([]);
    calcFib(values[inputName]);
    setValues({[inputName]: ''})
  }

  const calcFib = (data: string) => {
    if (Number.isNaN(data)) { return null }
    setN(Number(data));
  }

  useEffect(() => {
    if (n !== undefined && items.length <= n) {
      const delay = SHORT_DELAY_IN_MS;
      const i = items.length;
      setTimeout(setItems, delay, ((items: Array<number>) => {
        const el = fib(i);
        return [...items, el];
      }))
    }

    if (items.length === n) {
      setLoader(false)
    }
  }, [items, n])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.main}>
        <form className={style.form} onSubmit={onSubmit}>
          <Input
            type='number'
            min='0'
            max='19'
            isLimitText={true}
            onChange={handleChange}
            value={values[inputName]}
            name={inputName}
          />
          <div>
          <Button
            text='Рассчитать'
            type='submit'
            isLoader={loader}
            disabled={ !values[inputName] || +values[inputName] < 0 || +values[inputName] > 19 }
            extraClass='ml-6'
            linkedList="small"
          />
          </div>
          
        </form>
        <ul className={style.container}>
          {items && items.map((item, index) =>
            <li className={style.circle} key={index}>
              <Circle
                letter={`${item}`}
                index={index}
              />
            </li>
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
