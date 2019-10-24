/// <reference types="mocha" />
/// <reference types="sinon" />
import * as React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import MegaMenuComponent from "../components/MegaMenuComponent";
import { MenuSPListProvider } from "../menuProvider";
mocha.timeout(0);
/**
 * Test the initial state i.e. button visible, menu invisible.
 */
describe("ReactMegaMenuApplicationCustomizer menu closed", function () {
    var reactComponent;
    var menuProviderStub;
    var componentDidMountSpy;
    var fakeMenuData = new Promise(function (resolve, reject) {
        resolve([
            {
                category: "Department of Finance",
                items: [
                    { id: 1, name: "Economic", url: "https://Economic" },
                    { id: 2, name: "Banking", url: "https://Banking" }
                ]
            },
            {
                category: "Department of Education and Skills",
                items: [
                    { id: 3, name: "School Holidays", url: "https://Holidays" }
                ]
            }
        ]);
    });
    /**
     * Before mocha hook.
     */
    before(function () {
        // add spy on the did mount event.
        componentDidMountSpy = sinon.spy(MegaMenuComponent.prototype, "componentDidMount");
        // stub the menu provider so we use fake data to test.
        menuProviderStub = sinon.stub(MenuSPListProvider.prototype, "getAllItems").returns(fakeMenuData);
        // mount the react component.
        reactComponent = mount(React.createElement(MegaMenuComponent, {
            menuProvider: new MenuSPListProvider("http://test.com")
        }));
    });
    after(function () {
        componentDidMountSpy.restore();
        menuProviderStub.restore();
    });
    it("should button be visible", function () {
        var cssSelector = "[data-id='menuButton']";
        var menuButton;
        menuButton = reactComponent.find(cssSelector);
        expect(menuButton.length).to.be.greaterThan(0);
    });
    it("should menu element be null", function () {
        var menu = document.querySelector("div[data-id='menuPanel']");
        expect(menu).to.be.equal(null);
    });
    it("should initial state be null", function () {
        expect(reactComponent.state().showPanel).to.be.equal(false);
        expect(reactComponent.state().menuItems.length).to.be.equal(0);
    });
    it("should componentDidMount and menuProvider.getAllItems be called after 50 milisecs", function (done) {
        setTimeout(function () {
            expect(componentDidMountSpy.calledOnce).to.be.equal(true);
            expect(menuProviderStub.calledOnce).to.be.equal(true);
            done();
        }, 50);
    });
    it("should has 2 menuItems in the menuItems state after 50 milisecs", function (done) {
        setTimeout(function () {
            expect(reactComponent.state().showPanel).to.be.equal(false);
            expect(reactComponent.state().menuItems.length).to.be.equal(2);
            done();
        }, 50);
    });
});
describe("ReactMegaMenuApplicationCustomizer menu opened", function () {
    var reactComponent;
    var menuProviderStub;
    var fakeMenuData = new Promise(function (resolve, reject) {
        resolve([
            {
                category: "Department of Finance",
                items: [
                    { id: 1, name: "Economic", url: "https://Economic" },
                    { id: 2, name: "Banking", url: "https://Banking" }
                ]
            },
            {
                category: "Department of Education and Skills",
                items: [
                    { id: 3, name: "School Holidays", url: "https://Holidays" }
                ]
            }
        ]);
    });
    /**
     * Before mocha hook.
     */
    before(function (done) {
        // stub the menu provider so we use fake data to test.
        menuProviderStub = sinon.stub(MenuSPListProvider.prototype, "getAllItems").returns(fakeMenuData);
        // mount the react component.
        reactComponent = mount(React.createElement(MegaMenuComponent, {
            menuProvider: new MenuSPListProvider("http://test.com")
        }));
        var menuButton;
        menuButton = reactComponent.find("[data-id='menuButton']").first();
        menuButton.simulate("click"); // open the menu.
        setTimeout(done, 50); // all the menu items should be loaded after 200.
    });
    /**
     * At that stage the menu is open so let's verify
     * that some stuff exist on the newly loaded panel
     * with menu categories and items.
     * We cant use enzyme to find html element since the panel is outside of our react component,
     * therefore go back to vanila JavaScript element selectors.
     */
    it("should menu be visible", function () {
        var menu = document.querySelector("div[data-id='menuPanel']");
        expect(menu).to.not.be.equal(null);
    });
    it("should showPanel state changed to true", function () {
        expect(reactComponent.state().showPanel).to.be.equal(true);
    });
    it("should has rendered just two menu category elements", function () {
        var menuCategories;
        menuCategories = document.querySelectorAll("[class*='categoryItem']");
        expect(menuCategories.length).to.be.equal(2);
    });
    it("should has rendered just three menu item elements", function () {
        var menuItems;
        menuItems = document.querySelectorAll("[class*='menuItem']");
        expect(menuItems.length).to.be.equal(3);
    });
    it("verify Department of Finance category and items", function () {
        var category;
        category = document.querySelector("[data-id='Department of Finance']");
        var categoryText = category.querySelector("[class*='categoryItem']").innerHTML;
        var economicText = category.querySelector("[data-id='1'] a").text;
        var bankingText = category.querySelector("[data-id='2'] a").text;
        expect(categoryText).to.be.equal("Department of Finance");
        expect(economicText).to.be.equal("Economic");
        expect(bankingText).to.be.equal("Banking");
    });
    it("verify Department of Education and Skills category and items", function () {
        var category;
        category = document.querySelector("[data-id='Department of Education and Skills']");
        var categoryText = category.querySelector("[class*='categoryItem']").innerHTML;
        var holidaysText = category.querySelector("[data-id='3'] a").text;
        expect(categoryText).to.be.equal("Department of Education and Skills");
        expect(holidaysText).to.be.equal("School Holidays");
    });
});
//# sourceMappingURL=ReactMegaMenuApplicationCustomizer.test.js.map