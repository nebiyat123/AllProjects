import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import 'jquery';
export interface IInstaFoundationFeedWebPartProps {
    description: string;
}
export default class InstaFoundationFeedWebPart extends BaseClientSideWebPart<IInstaFoundationFeedWebPartProps> {
    render(): void;
    readItems(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
