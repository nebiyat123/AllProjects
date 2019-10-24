import { IMenuProvider, MenuCategory } from "./index";
/**
 * Mega Menu items SharePoint list provider.
 * Gets data from SharePoint list to populate the mega menu.
 * Can cache menu items in browser session storage to speed up
 * the menu load.
 */
export declare class MenuSPListProvider implements IMenuProvider {
    /**
     * Web absolute url so we can call pnp-js and get the menu list items.
     */
    private readonly _webAbsoluteUrl;
    /**
     * Enables or disables session storage as caching mechanism.
     */
    private readonly _sessionStorageCacheEnabled;
    /**
     * Browser session storage unique key.
     */
    private readonly _sessionStorageKey;
    constructor(webAbsoluteUrl: string, enableSessionStorageCache?: boolean);
    /**
     * Gets all items from SharePoint list and stores the formatted
     * mega menu list in the sessionStorage for quick access.
     */
    getAllItems(): Promise<MenuCategory[]>;
    /**
     * Fetches the menu items from the browser session storage.
     */
    private _fetchFromSessionStorge();
    /**
     * Fetches the menu items from the server, SharePoint mega menu list.
     */
    private _fetchFromSPList();
    /**
     * Groups the SharePoint list menu items by category.
     * Would re-map the table structured data to json nested data.
     * @param items SPListItem
     */
    private _groupByCategory(items);
}
