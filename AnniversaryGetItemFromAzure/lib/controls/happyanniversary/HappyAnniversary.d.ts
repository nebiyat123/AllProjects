/// <reference types="react" />
import * as React from 'react';
import { IHappyAnniversaryProps } from './IHappyAnniversaryProps';
import { IHappAnniversaryState } from './IHappyAnniversaryState';
export declare class HappyAnniversary extends React.Component<IHappyAnniversaryProps, IHappAnniversaryState> {
    private _showAnniversarys;
    constructor(props: IHappyAnniversaryProps);
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: IHappyAnniversaryProps, prevState: IHappAnniversaryState): void;
    render(): React.ReactElement<IHappyAnniversaryProps>;
}
export default HappyAnniversary;
