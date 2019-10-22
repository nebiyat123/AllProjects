import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import * as strings from 'InstaFeedWebPartStrings';
import { Web } from "sp-pnp-js";
import 'jquery';
declare var $;

export interface IInstaFeedWebPartProps {
  description: string;
  embedURl: string;
}

export default class InstaFeedWebPart extends BaseClientSideWebPart<IInstaFeedWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = "<div style='display: flex; flex-direction: column; margin: 10px;'>"+
    "<div style='display: flex; flex-direction: row; align-items:center; padding: 10px; border-bottom: 0px solid #ebedf2'>"+
     // "<div style='width: 40px;'><img src='/sites/NWTDemo/SiteAssets/Chatapp/IMG/instagram.png' style='max-width: 100%;' /></div>"+
    // "<h3 style='margin:-7px 0 0 10px;'>NewWave</h1>"+
     "</div>"+
     "<div id='dataBind' style='display: flex; flex-wrap:wrap; justify-content:center;'>"+
       // "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><iframe height='400' src='"+this.properties.description+"embed' frameborder='0'></iframe></div>"+
       // "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><iframe height='400' src='"+this.properties.description+"embed' frameborder='0'></iframe></div>"+
       // "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><iframe height='400' src='"+this.properties.description+"embed' frameborder='0'></iframe></div>"+
     "</div>"+
   "</div>";
   this.readItems();
  }

  public readItems(){
    let web = new Web(this.context.pageContext.site.absoluteUrl);
    web.lists.getByTitle('InstaFeedListData').items.get().then((results) =>{
      let resultLen = results.length;
      let HTML ='';
      if(resultLen === 0){
        HTML += "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><h3>No post to display</h3></div>";
      }
      if(resultLen !== 0){
        HTML += "<div style='margin:10px;padding:5px'><iframe height='450' src='"+results[0].FeedURL.Url+"embed' frameborder='0'></iframe></div>";
      }
      $('#dataBind').append(HTML);
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
