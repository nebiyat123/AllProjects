import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
export interface IHireDateWebPartProps {
    title: string;
    numberUpcomingDays: number;
}
export default class HireDateWebPart extends BaseClientSideWebPart<IHireDateWebPartProps> {
    private graphCLient;
    onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
