import React, { FormEvent, useEffect, useState } from "react";
import style from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { reverseString, typeHandler } from "./utils";

export const StringComponent: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [letters, setLetters] = useState<Array<string> | null>(null)
  const [counter, setCounter] = useState<number>(-1);
  const [iterations, setIterations] = useState<Array<Array<string>>> ([]);
  const name = 'stringInput';
  const { values, handleChange, setValues } = useForm({ [name]: '' });


  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);
    setCounter(-1);
    const str = values[name];
    reverseFunc(str);
    setValues({...values, [name]: ''})
  }

  const reverseFunc = (str: string) => {
    const arr = str.split('');
    setIterations([...reverseString(arr)]);
    setLetters(arr);
    setTimeout(setCounter, DELAY_IN_MS, 0);
    let count = 0;
  }

  

  useEffect(() => {
    let nextStep: NodeJS.Timer;
    if(letters?.length && counter > -1) {
      nextStep = setTimeout(() => {
        if (counter < letters.length/2 && iterations[counter]) {
          setLetters(letters => iterations[counter]);
          setCounter(counter => counter+1);
        }
      }, DELAY_IN_MS)
    }
    if(letters?.length && counter >= letters?.length/2) {
      setLoader(false);
    }
    return ()=> {
      clearTimeout(nextStep)
    } 
}, [counter, iterations, letters?.length])

  return (
    <SolutionLayout title="Строка">
      <div className={style.main}>
        <form
          className={style.form}
          name='reverseForm'
          onSubmit={onSubmit}>
          <Input
            maxLength={11}
            isLimitText={true}
            value={values[name]}
            onChange={handleChange}
            name={name}
          />
          <Button
            text='Развернуть'
            type='submit'
            isLoader={loader}
            extraClass='ml-6'
            disabled={!values[name]}
          />
        </form>
        <ul className={style.container}>
          {letters && letters.map((letter, index) =>
            <Circle
              state={typeHandler(letters, index, counter)}
              key={index}
              letter={letter}
              extraClass='ml-8 mr-8'
            />
          )}
        </ul>
      </div>
    </SolutionLayout>
  );
};
