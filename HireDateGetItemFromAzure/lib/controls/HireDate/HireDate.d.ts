/// <reference types="react" />
import * as React from 'react';
import { IHireDateProps } from './IHireDateProps';
import { IHireDateState } from './IHireDateState';
export declare class HireDate extends React.Component<IHireDateProps, IHireDateState> {
    private _showHireDates;
    constructor(props: IHireDateProps);
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: IHireDateProps, prevState: IHireDateState): void;
    render(): React.ReactElement<IHireDateProps>;
}
export default HireDate;
