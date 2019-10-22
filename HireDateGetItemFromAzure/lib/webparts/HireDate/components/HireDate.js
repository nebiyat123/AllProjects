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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import styles from './HireDate.module.scss';
import { HireDate } from '../../../controls/HireDate';
import * as moment from 'moment';
import SPService from '../../../services/SPService';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
var imgBackgroundBallons = require('../../../../assets/ballonsBackgroud.png');
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as strings from 'HireDateWebPartStrings';
var HireDates = (function (_super) {
    __extends(HireDates, _super);
    function HireDates(props) {
        var _this = _super.call(this, props) || this;
        _this._users = [];
        _this._spServices = new SPService(_this.props.context);
        _this.state = {
            Users: [],
            showHireDates: true
        };
        return _this;
    }
    HireDates.prototype.componentDidMount = function () {
        this.GetUsers();
    };
    HireDates.prototype.SortAnniversarys = function (users) {
        console.log(users);
        return users.sort(function (a, b) {
            if (a.hiredate > b.hiredate) {
                return -1;
            }
            if (a.hiredate < b.hiredate) {
                return 1;
            }
            return 0;
        });
    };
    HireDates.prototype.componentDidUpdate = function (prevProps, prevState) {
    };
    // Render
    HireDates.prototype.render = function () {
        var _center = !this.state.showHireDates ? "center" : "";
        return (React.createElement("div", { className: styles.HireDate, style: { textAlign: _center } },
            React.createElement("div", { className: styles.container },
                React.createElement(WebPartTitle, { displayMode: this.props.displayMode, title: this.props.title, updateProperty: this.props.updateProperty }),
                !this.state.showHireDates ?
                    React.createElement("div", { className: styles.backgroundImgBallons },
                        React.createElement(Image, { imageFit: ImageFit.cover, src: imgBackgroundBallons, width: 150, height: 150 }),
                        React.createElement(Label, { className: styles.subTitle }, strings.MessageNoHireDates))
                    :
                        React.createElement(HireDate, { users: this.state.Users }))));
    };
    // Load List Of Users
    HireDates.prototype.GetUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _otherMonthsHireDates, _dezemberHireDates, CurrentYear, listItems, AllowedItem, _i, listItems_1, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._spServices.getPHireDates(this.props.NumberofItems)];
                    case 1:
                        listItems = _a.sent();
                        AllowedItem = this.props.NumberofItems;
                        if (listItems && listItems.length > 0) {
                            _otherMonthsHireDates = [];
                            _dezemberHireDates = [];
                            for (_i = 0, listItems_1 = listItems; _i < listItems_1.length; _i++) {
                                item = listItems_1[_i];
                                if (item.extension_bd2923d14f8d4d96a1f0280682a13e4c_employeeNumber) {
                                    this._users.push({ key: item.mail, userName: item.displayName, userEmail: item.mail, jobDescription: item.jobTitle, hiredate: moment(item.extension_bd2923d14f8d4d96a1f0280682a13e4c_employeeNumber).local().format() });
                                }
                            }
                        }
                        this._users = this.SortAnniversarys(this._users);
                        this._users = this._users.filter(function (itm, i) {
                            if (AllowedItem > i)
                                return itm;
                        });
                        //  this._users=[];
                        this.setState({
                            Users: this._users,
                            showHireDates: this._users.length === 0 ? false : true
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return HireDates;
}(React.Component));
export default HireDates;
//# sourceMappingURL=HireDate.js.map