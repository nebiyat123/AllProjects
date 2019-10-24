import { IMenuProvider, MenuCategory } from "./index";
/**
 * Fake data provider for offline tests.
 */
export declare class MenuFakeProvider implements IMenuProvider {
    getAllItems(): Promise<MenuCategory[]>;
}
