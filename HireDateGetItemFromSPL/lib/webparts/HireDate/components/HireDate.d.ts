/// <reference types="react" />
import * as React from 'react';
import { IHireDateProps } from './IHireDateProps';
import { IHireDateState } from './IHireDateState';
export default class HireDates extends React.Component<IHireDateProps, IHireDateState> {
    private _users;
    private _spServices;
    constructor(props: IHireDateProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IHireDateProps, prevState: IHireDateState): void;
    render(): React.ReactElement<IHireDateProps>;
    private GetUsers();
}
