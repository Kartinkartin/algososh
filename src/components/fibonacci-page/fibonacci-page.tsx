import React, { FormEvent, useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {
  const [items, setItems] = useState<Array<number>>([]);
  const [loader, setLoader] = useState(false);
  const [isDisable, setDisable] = useState(true);
  const [n, setN] = useState<number | undefined>(undefined)

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setLoader(true);
    setItems([]);
    const input = (e.target as HTMLFormElement)[0];
    const data: string = (input as HTMLInputElement).value;
    calcFib(data);
    (input as HTMLInputElement).value = '';
  }

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = (e.target as HTMLInputElement).value;
    if(value === '') { setDisable(true) } else { setDisable(false) }
  }

  const calcFib = (data: string) => {
    if (Number.isNaN(data)) { return null }
    setN(Number(data));
  }
  const fib = (n: number, memo: Record<number, number> = {}): number => {
    if (n in memo) {
      return memo[n];
    }
    if (n < 2) {
      return 1;
    }
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
  };

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
            max='19'
            isLimitText={true}
            onChange={onChange}
          />
          <Button
            text='Рассчитать'
            type='submit'
            isLoader={loader}
            disabled={isDisable}
          />
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
