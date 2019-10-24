import { BaseApplicationCustomizer } from "@microsoft/sp-application-base";
import { IMenuProvider } from "./menuProvider/index";
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IReactMegaMenuApplicationCustomizerProperties {
    /**
     * If isDebug=true then the customizer will use fake json data instead of
     * existing sharepoitn list.
     * Note: that property in the debug url queryString should be:
     *                  GOOD:{"isDebug":false}
     *                  WRONG: {"isDebug":"false"}
     */
    isDebug: boolean;
    /**
     * If rootWebOnly=true then the mega menu should collect menu data from
     *  the root site mega menu list only.
     * Note: that property in the debug url queryString should be:
     *                  GOOD:{"rootWebOnly":false}
     *                  WRONG: {"rootWebOnly":"false"}
     */
    rootWebOnly: boolean;
    /**
     * If enableSessionStorageCache=true then the menu items should be cached during
     * the browser session in the local session storage for quick access.
     * Note: that property in the debug url queryString should be:
     *                  GOOD:{"enableSessionStorageCache":false}
     *                  WRONG: {"enableSessionStorageCache":"false"}
     */
    enableSessionStorageCache: boolean;
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class ReactMegaMenuApplicationCustomizer extends BaseApplicationCustomizer<IReactMegaMenuApplicationCustomizerProperties> {
    onInit(): Promise<void>;
    protected getMenuProvider(): IMenuProvider;
}
