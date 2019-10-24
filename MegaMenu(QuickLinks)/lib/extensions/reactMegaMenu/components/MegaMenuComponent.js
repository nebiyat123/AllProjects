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
import * as React from "react";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import styles from "./MegaMenuComponent.module.scss";
var MegaMenuComponent = (function (_super) {
    __extends(MegaMenuComponent, _super);
    function MegaMenuComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showPanel: false,
            menuItems: []
        };
        return _this;
    }
    MegaMenuComponent.prototype.componentDidMount = function () {
        var _this = this;
        // get the mega menu items and update the component state.
        this.props.menuProvider.getAllItems().then(function (result) {
            _this.setState(function (prevState, props) {
                prevState.menuItems = result;
                return prevState;
            });
        });
    };
    MegaMenuComponent.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(DefaultButton, { "data-id": "menuButton", className: styles.menuButton, title: "Quick Links", text: "Quick Links", ariaLabel: "Quick Links", onClick: this.showMenu.bind(this) }),
            React.createElement(Panel, { isOpen: this.state.showPanel, type: PanelType.smallFixedNear, customWidth: "100px", headerClassName: styles.topPanel, onDismiss: this.hideMenu.bind(this) },
                React.createElement("div", { "data-id": "menuPanel", className: styles.grid },
                    React.createElement("div", { className: styles.row }, this.state.menuItems.map(function (menuCategory, categoryIndex) {
                        return React.createElement("div", { "data-id": "" + menuCategory.category, key: categoryIndex, className: styles.col6 },
                            React.createElement("div", { className: styles.categoryItem }, menuCategory.category),
                            menuCategory.items.map(function (item, itemIndex) {
                                return React.createElement("div", { "data-id": "" + item.id, key: itemIndex, className: styles.menuItem },
                                    React.createElement("a", { href: item.url }, item.name));
                            }));
                    }))))));
    };
    MegaMenuComponent.prototype.showMenu = function () {
        this.setState(function (prevState, props) {
            prevState.showPanel = true;
            return prevState;
        });
    };
    MegaMenuComponent.prototype.hideMenu = function () {
        this.setState(function (prevState, props) {
            prevState.showPanel = false;
            return prevState;
        });
    };
    return MegaMenuComponent;
}(React.Component));
export default MegaMenuComponent;
//# sourceMappingURL=MegaMenuComponent.js.map