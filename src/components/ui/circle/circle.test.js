import React from "react";
import renderer from "react-test-renderer";
import { HEAD, TAIL } from "../../../constants/element-captions";
import { ElementStates } from "../../../types/element-states";

import { Circle } from "./circle";

describe('Circle snapshot test', () => {

    it('Рендер компонента Circle без буквы', () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендер компонента Circle с буквами', () => {
        const tree = renderer
            .create(<Circle letter="aA" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендер компонента Circle с head', () => {
        const tree = renderer
            .create(<Circle head={HEAD}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендер компонента Circle с react-элементом в head', () => {
        const tree = renderer
            .create(<Circle head={<Circle />} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендер компонента Circle с tail', () => {
        const tree = renderer
            .create(<Circle tail={TAIL} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендер компонента Circle с react-элементом в tail', () => {
        const tree = renderer
            .create(<Circle tail={<Circle />} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендер компонента Circle с index', () => {
        const tree = renderer
            .create(<Circle index={0} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('Рендер компонента Circle с пропом isSmall === true', () => {
        const tree = renderer
            .create(<Circle isSmall={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендер компонента Circle в состоянии default', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Default} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендер компонента Circle в состоянии changing', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Changing} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендер компонента Circle в состоянии modified', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Modified} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
