/// <reference types="react" />
import * as React from 'react';
import { IHireDateCardProps } from './IHireDateCardProps';
import { IHireDateCardPState } from './IHireDateCardState';
export declare class HireDateCard extends React.Component<IHireDateCardProps, IHireDateCardPState> {
    private _Persona;
    private _HireDateMsg;
    constructor(props: IHireDateCardProps);
    render(): React.ReactElement<IHireDateCardProps>;
    domElement(domElement: any, arg1: string): void;
    private _HireDateIsToday(HireDate);
    private _getInitial(userName);
    private _onRenderTertiaryText;
}
export default HireDateCard;
