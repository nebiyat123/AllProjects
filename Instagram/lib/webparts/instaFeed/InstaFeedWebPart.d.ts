import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import 'jquery';
export interface IInstaFeedWebPartProps {
    description: string;
    embedURl: string;
}
export default class InstaFeedWebPart extends BaseClientSideWebPart<IInstaFeedWebPartProps> {
    render(): void;
    readItems(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
