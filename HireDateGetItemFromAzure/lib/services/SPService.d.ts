import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
export declare class SPService {
    private _context;
    private graphClient;
    private HireDateListTitle;
    constructor(_context: WebPartContext | ApplicationCustomizerContext);
    getPHireDates(upcommingDays: number): Promise<any[]>;
}
export default SPService;
