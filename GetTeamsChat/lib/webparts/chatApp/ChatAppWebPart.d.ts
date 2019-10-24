import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import 'jquery';
export interface IChatAppWebPartProps {
    description: string;
}
export default class ChatAppWebPart extends BaseClientSideWebPart<IChatAppWebPartProps> {
    colors: string[];
    attachmentBody: any[];
    render(): void;
    sendAttachment(files: any, callback: any): Promise<void>;
    uploadFiles(index: any, files: any, callback: any): void;
    base64ToArrayBuffer(base64: any): ArrayBuffer;
    sendNewChannelMsg(channelId: any, teamId: any, channelName: any): void;
    sendMessage(body: any, url: any, callback: any): void;
    clsloader: string;
    sendNewReply(channelId: any, teamId: any, messageId: any, attachmentid: any, dataindex: any): void;
    loadChannelMsgRepliesHtml(replyDatas: any, channelId: any, teamId: any, messageId: any): void;
    loadChannelMsgReplies(channelId: any, teamId: any, messageId: any): void;
    loadCHannelMsgsHtml(channelId: any, teamId: any, channelName: any, channelMsgs: any): void;
    loadChannelMsgs(channelId: any, teamId: any, channelName: any): void;
    loadChannelsHtml(channels: any, teamId: any): void;
    loadAllChannels(teamId: any): void;
    loadTeamsHtml(teams: any): void;
    loadAllTeams(): void;
    sendSingleUserMsg(): void;
    loadChatMsgs(chatId: any): void;
    loadChatMsgHtml(msgData: any): void;
    loadChatHtml(datas: any): void;
    loadAllChats(): void;
    getUserId(email: string): Promise<number>;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
