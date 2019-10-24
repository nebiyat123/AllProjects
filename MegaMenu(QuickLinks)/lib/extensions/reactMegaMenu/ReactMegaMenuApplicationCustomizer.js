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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import * as ReactDom from "react-dom";
import { override } from "@microsoft/decorators";
import { BaseApplicationCustomizer, PlaceholderName } from "@microsoft/sp-application-base";
import MegaMenuComponent from "./components/MegaMenuComponent";
import { MenuSPListProvider, MenuFakeProvider } from "./menuProvider/index";
/** A Custom Action which can be run during execution of a Client Side Application */
var ReactMegaMenuApplicationCustomizer = (function (_super) {
    __extends(ReactMegaMenuApplicationCustomizer, _super);
    function ReactMegaMenuApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactMegaMenuApplicationCustomizer.prototype.onInit = function () {
        var placeholder;
        placeholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom);
        // init the react mega menu component.
        var element = React.createElement(MegaMenuComponent, {
            menuProvider: this.getMenuProvider()
        });
        // render the react element in the top placeholder.
        ReactDom.render(element, placeholder.domElement);
        return Promise.resolve();
    };
    ReactMegaMenuApplicationCustomizer.prototype.getMenuProvider = function () {
        if (this.properties.isDebug) {
            return new MenuFakeProvider();
        }
        // get the current web absolute url by default.
        var webUrl = this.context.pageContext.web.absoluteUrl;
        if (this.properties.rootWebOnly) {
            // if rootWebOnly property enabled then use
            // the SharePoint root web mega menu list.
            webUrl = this.context.pageContext.site.absoluteUrl;
        }
        return new MenuSPListProvider(webUrl, this.properties.enableSessionStorageCache);
    };
    __decorate([
        override
    ], ReactMegaMenuApplicationCustomizer.prototype, "onInit", null);
    return ReactMegaMenuApplicationCustomizer;
}(BaseApplicationCustomizer));
export default ReactMegaMenuApplicationCustomizer;
//# sourceMappingURL=ReactMegaMenuApplicationCustomizer.js.map