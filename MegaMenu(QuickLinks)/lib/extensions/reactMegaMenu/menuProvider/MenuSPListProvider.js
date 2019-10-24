import { Log } from "@microsoft/sp-core-library";
import { Web } from "@pnp/sp";
var LOG_SOURCE = "ReactMegaMenuApplicationCustomizer_MenuSPListProvider";
/**
 * Mega Menu items SharePoint list provider.
 * Gets data from SharePoint list to populate the mega menu.
 * Can cache menu items in browser session storage to speed up
 * the menu load.
 */
var MenuSPListProvider = (function () {
    function MenuSPListProvider(webAbsoluteUrl, enableSessionStorageCache) {
        if (enableSessionStorageCache === void 0) { enableSessionStorageCache = false; }
        /**
         * Browser session storage unique key.
         */
        this._sessionStorageKey = "MegaMenuFormattedList_";
        this._webAbsoluteUrl = webAbsoluteUrl;
        this._sessionStorageCacheEnabled = enableSessionStorageCache;
        this._sessionStorageKey += webAbsoluteUrl;
    }
    /**
     * Gets all items from SharePoint list and stores the formatted
     * mega menu list in the sessionStorage for quick access.
     */
    MenuSPListProvider.prototype.getAllItems = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var result = [];
            if (_this._sessionStorageCacheEnabled) {
                result = _this._fetchFromSessionStorge();
                if (result.length) {
                    return resolve(result);
                }
            }
            // session storage is disabled, empty or corrupt so fetch menu items from the SharePoint list.
            _this._fetchFromSPList().then(function (items) {
                result = _this._groupByCategory(items);
                if (_this._sessionStorageCacheEnabled) {
                    // cache for the session for quick access.
                    var jsonToString = JSON.stringify(result);
                    window.sessionStorage.setItem(_this._sessionStorageKey, jsonToString);
                }
                return resolve(result);
            });
        });
    };
    /**
     * Fetches the menu items from the browser session storage.
     */
    MenuSPListProvider.prototype._fetchFromSessionStorge = function () {
        var result = [];
        // get the list items from the session storage if available.
        var stringResult = window.sessionStorage.getItem(this._sessionStorageKey);
        if (stringResult) {
            try {
                result = JSON.parse(stringResult);
            }
            catch (error) {
                // somenthing is wrong on parse then proceed and fetch from server.
                Log.error(LOG_SOURCE, error);
            }
        }
        return result;
    };
    /**
     * Fetches the menu items from the server, SharePoint mega menu list.
     */
    MenuSPListProvider.prototype._fetchFromSPList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var web = new Web(_this._webAbsoluteUrl);
            web.lists.ensure("Mega Menu List")
                .then(function (listResult) {
                listResult.list.items
                    .select("ID", "MegaMenuCategory", "MegaMenuItemName", "MegaMenuItemUrl")
                    .get()
                    .then(function (items) {
                    resolve(items);
                })
                    .catch(function (error) {
                    Log.error(LOG_SOURCE, new Error("Mega Menu List does not exits."));
                    reject(error);
                });
            })
                .catch(function (error) {
                Log.error(LOG_SOURCE, new Error("Mega Menu List does not exits."));
                reject(error);
            });
        });
    };
    /**
     * Groups the SharePoint list menu items by category.
     * Would re-map the table structured data to json nested data.
     * @param items SPListItem
     */
    // tslint:disable:no-string-literal
    MenuSPListProvider.prototype._groupByCategory = function (items) {
        var result = [];
        var _loop_1 = function (i) {
            var item = items[i];
            // init menu item.
            var menuItem = {
                id: item["ID"],
                name: item["MegaMenuItemName"],
                url: item["MegaMenuItemUrl"]
            };
            // check if category already exists in the result object.
            var categories = result.filter(function (x) { return x.category === item["MegaMenuCategory"]; });
            if (categories.length) {
                // push to the existing category.
                categories[0].items.push(menuItem);
            }
            else {
                // add new category and push the new menu item.
                result.push({ category: item["MegaMenuCategory"], items: [menuItem] });
            }
        };
        for (var i = 0; i < items.length; i++) {
            _loop_1(i);
        }
        return result;
    };
    return MenuSPListProvider;
}());
export { MenuSPListProvider };
//# sourceMappingURL=MenuSPListProvider.js.map