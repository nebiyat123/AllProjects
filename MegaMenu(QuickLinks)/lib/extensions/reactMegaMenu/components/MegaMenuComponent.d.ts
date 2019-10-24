/// <reference types="react" />
import * as React from "react";
import { IMegaMenuProps } from "./IMegaMenuProps";
import { IMegaMenuState } from "./IMegaMenuState";
export default class MegaMenuComponent extends React.Component<IMegaMenuProps, IMegaMenuState> {
    constructor(props: IMegaMenuProps);
    componentDidMount(): void;
    render(): React.ReactElement<IMegaMenuProps>;
    showMenu(): void;
    hideMenu(): void;
}
