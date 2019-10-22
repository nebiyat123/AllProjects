var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import * as strings from 'InstaFeedWebPartStrings';
import { Web } from "sp-pnp-js";
import 'jquery';
var InstaFeedWebPart = (function (_super) {
    __extends(InstaFeedWebPart, _super);
    function InstaFeedWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InstaFeedWebPart.prototype.render = function () {
        this.domElement.innerHTML = "<div style='display: flex; flex-direction: column; margin: 10px;'>" +
            "<div style='display: flex; flex-direction: row; align-items:center; padding: 10px; border-bottom: 0px solid #ebedf2'>" +
            // "<div style='width: 40px;'><img src='/sites/NWTDemo/SiteAssets/Chatapp/IMG/instagram.png' style='max-width: 100%;' /></div>"+
            // "<h3 style='margin:-7px 0 0 10px;'>NewWave</h1>"+
            "</div>" +
            "<div id='dataBind' style='display: flex; flex-wrap:wrap; justify-content:center;'>" +
            // "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><iframe height='400' src='"+this.properties.description+"embed' frameborder='0'></iframe></div>"+
            // "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><iframe height='400' src='"+this.properties.description+"embed' frameborder='0'></iframe></div>"+
            // "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><iframe height='400' src='"+this.properties.description+"embed' frameborder='0'></iframe></div>"+
            "</div>" +
            "</div>";
        this.readItems();
    };
    InstaFeedWebPart.prototype.readItems = function () {
        var web = new Web(this.context.pageContext.site.absoluteUrl);
        web.lists.getByTitle('InstaFeedListData').items.get().then(function (results) {
            var resultLen = results.length;
            var HTML = '';
            if (resultLen === 0) {
                HTML += "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><h3>No post to display</h3></div>";
            }
            if (resultLen !== 0) {
                HTML += "<div style='margin:10px;padding:5px'><iframe height='450' src='" + results[0].FeedURL.Url + "embed' frameborder='0'></iframe></div>";
            }
            $('#dataBind').append(HTML);
        });
    };
    Object.defineProperty(InstaFeedWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    InstaFeedWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    return InstaFeedWebPart;
}(BaseClientSideWebPart));
export default InstaFeedWebPart;

//# sourceMappingURL=InstaFeedWebPart.js.map
