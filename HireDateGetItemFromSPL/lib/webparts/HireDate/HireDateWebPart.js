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
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'HireDateWebPartStrings';
import HireDate from './components/HireDate';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
var HireDateWebPart = (function (_super) {
    __extends(HireDateWebPart, _super);
    function HireDateWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HireDateWebPart.prototype.onInit = function () {
        return _super.prototype.onInit.call(this).then(function (_) {
            // other init code may be present
        });
    };
    HireDateWebPart.prototype.render = function () {
        var _this = this;
        var element = React.createElement(HireDate, {
            title: this.properties.title,
            numberUpcomingDays: this.properties.numberUpcomingDays,
            context: this.context,
            displayMode: this.displayMode,
            updateProperty: function (value) {
                _this.properties.title = value;
            }
        });
        ReactDom.render(element, this.domElement);
    };
    HireDateWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(HireDateWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    HireDateWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                PropertyPaneTextField('title', {
                                    label: strings.DescriptionFieldLabel
                                }),
                                PropertyFieldNumber("numberUpcomingDays", {
                                    key: "numberUpcomingDays",
                                    label: strings.NumberUpComingDaysLabel,
                                    description: strings.NumberUpComingDaysLabel,
                                    value: this.properties.numberUpcomingDays,
                                    maxValue: 10,
                                    minValue: 5,
                                    disabled: false
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return HireDateWebPart;
}(BaseClientSideWebPart));
export default HireDateWebPart;
//# sourceMappingURL=HireDateWebPart.js.map