import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from './button';

describe('Button snapshot test', () => {
    it('Рендер кнопки с текстом', () => {
        const tree = renderer
            .create(<Button text='text' />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    
    it('Рендер кнопки без текста', () => {
        const tree = renderer
            .create(<Button />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    
    it('Рендер заблокированной кнопки', () => {
        const tree = renderer
            .create(<Button disabled={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
    
    it('Рендер кнопки с индикацией загрузки', () => {
        const tree = renderer
            .create(<Button isLoader={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })
});
