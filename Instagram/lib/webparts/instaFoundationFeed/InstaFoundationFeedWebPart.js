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
import * as strings from 'InstaFoundationFeedWebPartStrings';
import { Web } from "sp-pnp-js";
import 'jquery';
var InstaFoundationFeedWebPart = (function (_super) {
    __extends(InstaFoundationFeedWebPart, _super);
    function InstaFoundationFeedWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InstaFoundationFeedWebPart.prototype.render = function () {
        this.domElement.innerHTML = "<div style='display: flex; flex-direction: column; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); margin: 10px;'>" +
            "<div id='F_dataBind' style='display: flex; flex-wrap:wrap; justify-content:center;'>" +
            "</div>" +
            "</div>";
        this.readItems();
    };
    InstaFoundationFeedWebPart.prototype.readItems = function () {
        var web = new Web(this.context.pageContext.site.absoluteUrl);
        web.lists.getByTitle('InstaFeedFoundation').items.get().then(function (results) {
            var resultLen = results.length;
            var HTML = '';
            if (resultLen === 0) {
                HTML += "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><h3>No post to display</h3></div>";
            }
            if (resultLen !== 0) {
                HTML += "<div style='margin:10px;padding:5px; border:1px solid #ebedf2'><iframe height='400' src='" + results[1].FeedURL.Url + "embed' frameborder='0'></iframe></div>";
            }
            $('#F_dataBind').append(HTML);
        });
    };
    Object.defineProperty(InstaFoundationFeedWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    InstaFoundationFeedWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    return InstaFoundationFeedWebPart;
}(BaseClientSideWebPart));
export default InstaFoundationFeedWebPart;

//# sourceMappingURL=InstaFoundationFeedWebPart.js.map
