import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import * as strings from 'InstaFoundationFeedWebPartStrings';
import { Web } from "sp-pnp-js";
import 'jquery';
declare var $;

export interface IInstaFoundationFeedWebPartProps {
  description: string;
}

export default class InstaFoundationFeedWebPart extends BaseClientSideWebPart<IInstaFoundationFeedWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = "<div style='display: flex; flex-direction: column; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); margin: 10px;'>"+
                                  "<div id='F_dataBind' style='display: flex; flex-wrap:wrap; justify-content:center;'>"+
                                  "</div>"+
                                "</div>";
                                this.readItems();
  }

  public readItems(){
    let web = new Web(this.context.pageContext.site.absoluteUrl);
    web.lists.getByTitle('InstaFeedFoundation').items.get().then((results) =>{
      let resultLen = results.length;
      let HTML ='';
      if(resultLen === 0){
        HTML += "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><h3>No post to display</h3></div>";
      }
      if(resultLen !== 0){
        HTML += "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><iframe height='400' src='"+results[1].FeedURL.Url+"embed' frameborder='0'></iframe></div>";
      }
      $('#F_dataBind').append(HTML);
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
