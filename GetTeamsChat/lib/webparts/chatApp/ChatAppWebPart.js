// suru@yettobetitled.onmicrosoft.com
// June17@2019
// TestUser@yettobetitled.onmicrosoft.com
// we1c@me27
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
// LOADER USAGE
// <i class="fas fa-sync fa-spin"></i> - ELEMENT
// $("#loader").hide(); -- FULL PAGE
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'ChatAppWebPartStrings';
import { SPComponentLoader } from '@microsoft/sp-loader';
import 'jquery';
import pnp from 'sp-pnp-js';
var ChatAppWebPart = /** @class */ (function (_super) {
    __extends(ChatAppWebPart, _super);
    function ChatAppWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colors = ['#3369FF', '#FF5233', '#E922B6', '#3BE922'];
        _this.attachmentBody = [];
        _this.clsloader = '';
        return _this;
    }
    ChatAppWebPart.prototype.render = function () {
        var _this = this;
        SPComponentLoader.loadCss('/sites/NWTDemo/SiteAssets/Chatapp/CSS/style.css');
        SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css');
        SPComponentLoader.loadCss('/sites/NWTDemo/SiteAssets/Chatapp/CSS/bootstrap.min.css');
        SPComponentLoader.loadScript('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js');
        SPComponentLoader.loadScript('/sites/NWTDemo/SiteAssets/Chatapp/JS/index.js');
        this.domElement.innerHTML = "<body class=\"black-txt\">\n    <div id=\"loader\">\n      <div class=\"loader d-flex h-100 w-100 align-items-center justify-content-center\">\n          <div>\n              <img src=\"/sites/NWTDemo/SiteAssets/Chatapp/IMG/TeamsLogo.png\" class=\"img-fluid\" />\n              <p class=\"saving text-center\">Loading<span>.</span><span>.</span><span>.</span></p>\n          </div>\n      </div>\n    </div>\n    <div class=\"d-none d-sm-block h-100 w-100\">\n        <div class=\"d-flex h-100 w-100\">\n            <div class=\"nav-select purple-bg\">\n                <ul class=\"nav-list no-list-style text-white\">\n                    <li  onclick=\"showChatList('chat')\" id=\"chatTab\">\n                        <div class=\"d-flex flex-column text-center cursor-p\">\n                            <span class=\"nav-logo\"><i class=\"fas fa-comment-dots\"></i></span>\n                            <span class=\"nav-txt\">Chat</span>\n                        </div>\n                    </li>\n                    <li class=\"active\" onclick=\"showChatList('teams')\" id=\"teamTab\">\n                        <div class=\"d-flex flex-column text-center cursor-p\">\n                            <span class=\"nav-logo\"><i class=\"fas fa-users\"></i></span>\n                            <span class=\"nav-txt\">Teams</span>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"chat-user-list bg-white\">\n                <!-- singles users -->\n                <ul class=\"no-list-style\" id=\"user-list\">\n                     \n                </ul>\n                <ul class=\"no-list-style\" id=\"channel-list\">\n                    <li class=\"pl-4 pr-4 pt-2 pb-2 cursor-p\">\n                        <div class=\"d-flex align-items-center\">\n                            <div class=\"chat-single-logo\">\n                                <div class=\"d-flex align-items-center justify-content-center f-1-2 h-100\">\n                                  <span>AB</span>\n                                </div>\n                            </div>\n                            <div class=\"chat-single-name\">\n                                <div class=\"d-flex flex-column pl-2\">\n                                    <div class=\"d-flex\">\n                                        <span class=\"mr-auto f-1- text-truncate ml-2 f-w-6\">Channel 1</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"d-flex\">\n                            <ul class=\"ml-auto no-list-style channel-list\">\n                                <li class=\"pt-1 pb-1 text-truncate\"><span class=\"f-1-4 ml-2\">Channel 1</span></li>\n                                <li class=\"pt-1 pb-1 text-truncate\"><span class=\"f-1-4 ml-2\">Channel 1</span></li>\n                                <li class=\"pt-1 pb-1 text-truncate\"><span class=\"f-1-4 ml-2\">Channel 1</span></li>\n                            </ul>\n                        </div>\n                    </li>\n                    <li class=\"chat-single-list d-flex align-items-center pl-4 pr-4 pt-2 pb-2 cursor-p\">\n                        <div class=\"chat-single-logo\">\n                          <div class=\"d-flex align-items-center justify-content-center f-1-2 h-100\">\n                            <span>AB</span>\n                          </div>\n                        </div>\n                        <div class=\"chat-single-name\">\n                            <div class=\"d-flex flex-column pl-2\">\n                                <div class=\"d-flex\">\n                                    <span class=\"mr-auto f-1-3 text-truncate ml-2 f-w-6\">Channel 2</span>\n                                </div>\n                            </div>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"chat-content-wrap bg-light\">\n                <div class=\"chat-head d-flex align-items-center ml-3 mr-3 pt-2 pb-2 border-bottom\">\n                    <span  id=\"userLogo\"></span>\n                    <div class=\"chat-title-name\">\n                        <div class=\"d-flex flex-column pl-2\">\n                            <div class=\"d-flex\">\n                                <span class=\"mr-auto f-1-4 font-weight-bold text-truncate ml-2\" id=\"msgHeader\"></span>\n                                <span class=\"text-secondary cursor-p close-chat f-1-4\"><i\n                                        class=\"\"></i></span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"container chat-content-list\">\n                    <div class=\"row h-100\">\n                        <div class=\"col-md-10 offset-md-1 col-sm-12 h-100\">\n                            <div class=\"d-flex flex-column h-100\">\n                                <div class=\"mt-3 mb-3 chat-content-height\">\n                                    <!-- single user conversation -->\n                                    <ul class=\"no-list-style\" style=\"display:none\">\n                                        <li class=\"d-flex pl-3 pr-3 flex-row mt-2 mb-3\">\n                                            <div class=\"chat-content-logo rounded-circle mt-2\">\n                                                <div class=\"d-flex align-items-center justify-content-center f-1-2 h-100\">\n                                                <span>AB</span>\n                                              </div>\n                                            </div>\n                                            <div class=\"chat-single-msg bg-white pl-3 pr-3 pt-2 pb-2 ml-2\">\n                                                <div class=\"d-flex flex-column pl-2\">\n                                                    <div class=\"d-flex\">\n                                                        <span class=\"f-1\">John Doe</span>\n                                                        <span class=\"f-1 text-muted ml-2\">30-05-2019 05:00 AM</span>\n                                                    </div>\n                                                    <span class=\"f-1-2\">123131</span>\n                                                </div>\n                                            </div>\n                                        </li>\n                                        <li class=\"d-flex pl-3 pr-3 flex-row-reverse\">\n                                            <div class=\"chat-single-msg pl-3 pr-3 pt-2 pb-2 ml-2 purple-light-bg\">\n                                                <div class=\"d-flex flex-column\">\n                                                    <div class=\"d-flex\">\n                                                        <span class=\"f-1 text-muted\">30-05-2019 05:00 AM</span>\n                                                    </div>\n                                                    <span class=\"f-1-2\">312</span>\n                                                </div>\n                                            </div>\n                                        </li>\n                                    </ul>\n                                    <!-- channel list -->\n                                    <ul class=\"no-list-style\" id=\"chennelmsg-main\">\n                                        \n                                    </ul>\n                                </div>\n                                <div class=\"mt-auto chat-box border-top pl-4 pr-4 pt-3 pb-2\" id=\"chennelmsg-main-textarea\">\n                                    \n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"d-block d-sm-none h-100 w-100\">\n        <div class=\"d-flex flex-column h-100 w-100\">\n            <div class=\"m-chat d-flex flex-column\">\n                <div class=\"h-100 bg-white\" style=\"display:none\">\n                    <ul class=\"no-list-style\">\n                         \n                    </ul>\n                </div>\n                <div class=\"h-100 bg-light\">\n                    \n                    <div class=\"container chat-content-list\">\n                        <div class=\"row h-100\">\n                            <div class=\"col-sm-12 h-100\">\n                                <div class=\"d-flex flex-column h-100\">\n                                    <div class=\"mt-3 mb-3\">\n                                        <!-- single user conversation -->\n                                        <ul class=\"no-list-style\" style=\"display:none\">\n                                            \n                                        </ul>\n                                        <!-- channel list -->\n                                        <ul>\n                                            \n                                        </ul>\n                                    </div>\n                                    <div class=\"mt-auto chat-box border-top pl-4 pr-4 pt-3 pb-2\">\n                                        <textarea class=\"form-control rounded-0 border-0\"\n                                            placeholder=\"Enter your single chat message\"></textarea>\n                                        <div class=\"d-flex chat-btn-grp align-items-center\" id=\"btnSingleChat\">                                        \n                                        <span class=\"cursor-p\">\n                                        <input type=\"file\" class=\"d-none\" />\n                                        <i class=\"fas fa-paperclip\" onclick='$(this).prev().click()'></i>\n                                        </span>  \n                                            <span class=\"ml-auto pr-3 f-1-3 cursor-p\" id=\"chat-send-btn\">\n                                                <i class=\"far fa-paper-plane\"></i>\n                                            </span>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"m-nav-select purple-bg\">\n                <ul class=\"m-nav-list no-list-style text-white h-100 d-flex\">\n                    <li class=\"active w-50\">\n                        <div class=\"d-flex flex-column text-center p-rel h-100\">\n                            <span class=\"nav-logo\"><i class=\"fas fa-comment-dots\"></i></span>\n                            <span class=\"nav-txt\">Chat</span>\n                        </div>\n                    </li>\n                    <li class=\"w-50\">\n                        <div class=\"d-flex flex-column text-center p-rel h-100\">\n                            <span class=\"nav-logo\"><i class=\"fas fa-users\"></i></span>\n                            <span class=\"nav-txt\">Teams</span>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</body>";
        var usrMail = this.context.pageContext.user.email;
        var that = this;
        var usrPrincipalName = this.context.pageContext.user.loginName;
        var foobar = {
            securityEnabledOnly: false
        };
        this.getUserId(usrMail).then(function (usrIdResult) {
            _this.context.msGraphClientFactory.getClient().then(function (client) {
                client
                    .api('/teams/d07d72d5-2b43-45fc-92c7-58bb32d1f315/channels')
                    .version('beta')
                    .get()
                    .then(function (content) {
                    // console.log('Teams ', content);
                })
                    .catch(function (err) {
                    //  console.log('err ', err);
                });
            });
        });
        $(document).ready(function (e) {
            $(document).on('click', '.clschatTab', function () {
                $('.nav-select li:first-of-type').addClass('active');
                $('#channel-list').hide();
                $('#user-list').show();
            });
            $(document).on('click', '.clsteamTab', function () {
                $('.nav-select li:last-of-type').addClass('active');
                $('#user-list').hide();
                $('#channel-list').show();
            });
            $(document).on('click', '.cancelReplyBox', function () {
                $('#reply-box').hide();
                $('#reply-btn').show();
            });
            $(document).on('click', '.showReplyBox', function () {
                $('#reply-box').show();
                $('#reply-btn').hide();
            });
            $(document).on('click', '.collapseAllChat', function () {
                $('#show-All-chat').show();
                $('#all-replies,#collapse-all-chat').hide();
            });
            $(document).on('click', '.showAllChat', function () {
                $('#show-All-chat').hide();
                $('#all-replies,#collapse-all-chat').show();
            });
            $('#chatTab').on('click', function (e) {
                $('#chennelmsg-main').empty();
                $('#userLogo').empty();
                $('#msgHeader').text('');
                that.loadAllChats();
            });
            $('#teamTab').on('click', function (e) {
                $('#chennelmsg-main').empty();
                $('#userLogo').empty();
                $('#msgHeader').text('');
                that.loadAllTeams();
            });
            $('#btnSingleChat').on('click', function (e) {
                that.sendSingleUserMsg();
            });
            $(document).on('click', '.chatUser', function () {
                var chatId = $(this).attr('data-id');
                that.loadChatMsgs(chatId);
            });
            $(document).on('click', '.clsteamid', function () {
                var teamid = $(this).attr('data-teamid');
                if (teamid) {
                    $(this).attr('data-teamid', '');
                    that.loadAllChannels(teamid);
                }
            });
            $(document).on('click', '.clschannel', function () {
                var channelid = $(this).attr('data-channelid');
                var teamid = $(this).attr('data-channelteamid');
                var channelName = $(this).attr('channel-name');
                that.loadChannelMsgs(channelid, teamid, channelName);
            });
            $(document).on('click', '.clsviewreplies', function () {
                var channelid = $(this).attr('data-channelid');
                var teamid = $(this).attr('data-teamid');
                var messageid = $(this).attr('data-messageid');
                that.loadChannelMsgReplies(channelid, teamid, messageid);
                $(this).hide();
            });
            $(document).on('click', '.clscollapsecurrent', function () {
                var msgid = $(this).attr('data-msgid');
                $('.clsallreplies' + msgid).hide();
                $('.curcollapse' + msgid).hide();
                $('.viewreply' + msgid).show();
            });
            $(document).on('click', '.sendnewreply', function () {
                var channelid = $(this).attr('data-channelid');
                var teamid = $(this).attr('data-teamid');
                var messageid = $(this).attr('data-messageid');
                var attachmentid = $(this).attr('attachment-id');
                var dataindex = $(this).attr('data-index');
                that.sendNewReply(channelid, teamid, messageid, attachmentid, dataindex);
            });
            $(document).on('click', '#chat-send-btn', function () {
                $('#savemain').show();
                var channelid = $(this).attr('send-channel-msg-channelId');
                var teamid = $(this).attr('send-channel-msg-teamId');
                var channelName = $(this).attr('send-channel-msg-channelName');
                that.sendNewChannelMsg(channelid, teamid, channelName);
            });
            $(document).on('click', '.clsshowreply', function () {
                var msgId = $(this).attr('data-msgid');
                $('.clsreplyblock' + msgId).show();
                $('.showreplybtn' + msgId).hide();
            });
            $(document).on('click', '.clscancelreplyblk', function () {
                var msgId = $(this).attr('data-msgid');
                $('.clsreplyblock' + msgId).hide();
                $('.showreplybtn' + msgId).show();
            });
        });
        this.loadAllTeams();
    };
    ChatAppWebPart.prototype.sendAttachment = function (files, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.attachmentBody = [];
                this.uploadFiles(0, files, callback);
                return [2 /*return*/];
            });
        });
    };
    ChatAppWebPart.prototype.uploadFiles = function (index, files, callback) {
        try {
            var that = this;
            var file = files[index];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    var base64str, arrayBuffer, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                base64str = e.target['result'].split('base64,')[1];
                                arrayBuffer = that.base64ToArrayBuffer(base64str);
                                return [4 /*yield*/, pnp.sp.web
                                        .getFolderByServerRelativeUrl('Shared Documents')
                                        .files.add(file.name, arrayBuffer, true)];
                            case 1:
                                result = _a.sent();
                                result['file'].listItemAllFields.get().then(function (data) {
                                    var filePath = that.context.pageContext.web.absoluteUrl +
                                        '/Shared%20Documents/' +
                                        file.name;
                                    that.attachmentBody.push(filePath);
                                    index++;
                                    if (index < files.length) {
                                        that.uploadFiles(index, files, callback);
                                    }
                                    else {
                                        callback();
                                    }
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
        }
        catch (error) {
            $('#savemain').hide();
            $(this.clsloader).hide();
        }
    };
    ChatAppWebPart.prototype.base64ToArrayBuffer = function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    };
    ChatAppWebPart.prototype.sendNewChannelMsg = function (channelId, teamId, channelName) {
        var channelText = $('#channelMsg').val();
        var that = this;
        var attachment = $('#mainattachment')[0];
        var url = '/teams/' + teamId + '/channels/' + channelId + '/messages';
        if (attachment && attachment['files'] && attachment['files'].length > 0) {
            this.sendAttachment(attachment['files'], function () {
                var msghtml = channelText + '</br>';
                for (var index = 0; index < that.attachmentBody.length; index++) {
                    var attachmentData = that.attachmentBody[index];
                    var slashsplit = attachmentData.split('/');
                    var fileName = slashsplit[slashsplit.length - 1];
                    var aTag = '<a download href="' + attachmentData + '">' + fileName + '</a>';
                    // var splitdata = attachmentData.split('.');
                    // var extension = splitdata[splitdata.length - 1];
                    // if (
                    //   extension.toLowerCase() == 'jpg' ||
                    //   extension.toLowerCase() == 'png'
                    // ) {
                    //   aTag =
                    //     '<div class="img-wrap"><img src="' +
                    //     attachmentData +
                    //     '" class="img-fluid"/></div>';
                    // }
                    msghtml = msghtml + aTag + '</br>';
                }
                var msgbody = {
                    body: {
                        contentType: 'html',
                        content: msghtml
                    }
                };
                that.sendMessage(msgbody, url, function () {
                    that.loadChannelMsgs(channelId, teamId, channelName);
                });
            });
        }
        else if (channelText) {
            var msgbody = {
                body: {
                    contentType: 'text',
                    content: channelText
                }
            };
            that.sendMessage(msgbody, url, function () {
                that.loadChannelMsgs(channelId, teamId, channelName);
            });
        }
    };
    ChatAppWebPart.prototype.sendMessage = function (body, url, callback) {
        var _this = this;
        var that = this;
        this.context.msGraphClientFactory.getClient().then(function (client) {
            client
                .api(url)
                .version('beta')
                .post(body)
                .then(function (content) {
                $('#savemain').hide();
                $(_this.clsloader).hide();
                callback();
            })
                .catch(function (err) {
                console.log('err ', err);
                $('#savemain').hide();
                $(_this.clsloader).hide();
            });
        });
    };
    ChatAppWebPart.prototype.sendNewReply = function (channelId, teamId, messageId, attachmentid, dataindex) {
        this.clsloader = '.clsloader' + dataindex;
        $(this.clsloader).show();
        var replyContent = $('.replytext' + messageId).val();
        $('.replytext' + messageId).val('');
        var that = this;
        var attachment = $('#' + attachmentid)[0];
        var url = '/teams/' +
            teamId +
            '/channels/' +
            channelId +
            '/messages/' +
            messageId +
            '/replies';
        if (attachment && attachment['files'] && attachment['files'].length > 0) {
            this.sendAttachment(attachment['files'], function () {
                var msghtml = replyContent + '</br>';
                for (var index = 0; index < that.attachmentBody.length; index++) {
                    var attachmentData = that.attachmentBody[index];
                    var slashsplit = attachmentData.split('/');
                    var fileName = slashsplit[slashsplit.length - 1];
                    var aTag = '<a download href="' + attachmentData + '">' + fileName + '</a>';
                    // var splitdata = attachmentData.split('.');
                    // var extension = splitdata[splitdata.length - 1];
                    // if (
                    //   extension.toLowerCase() == 'jpg' ||
                    //   extension.toLowerCase() == 'png'
                    // ) {
                    //   aTag =
                    //     '<div class="img-wrap"><img src="' +
                    //     attachmentData +
                    //     '" class="img-fluid"/></div>';
                    // }
                    msghtml = msghtml + aTag + '</br>';
                }
                var msgbody = {
                    body: {
                        contentType: 'html',
                        content: msghtml
                    }
                };
                that.sendMessage(msgbody, url, function () {
                    that.loadChannelMsgReplies(channelId, teamId, messageId);
                });
            });
        }
        else if (replyContent) {
            var msgbody = {
                body: {
                    contentType: 'text',
                    content: replyContent
                }
            };
            that.sendMessage(msgbody, url, function () {
                that.loadChannelMsgReplies(channelId, teamId, messageId);
            });
        }
    };
    ChatAppWebPart.prototype.loadChannelMsgRepliesHtml = function (replyDatas, channelId, teamId, messageId) {
        $('.replycollapse' + messageId).empty();
        var mainhtml = "<span class=\"cursor-p purple-med-txt f-1 clscollapsecurrent curcollapse\" data-msgid=\"replymsgid\" id=\"collapse-all-chat\">\n    <span>Collapse all</span>\n</span>\n<div id=\"all-replies\" class=\"clsallreplies\">\n    <ul class=\"no-list-style\">";
        for (var index = replyDatas.length - 1; index >= 0; index--) {
            var html = "\n        <li\n            class=\"chat-single-list d-flex align-items-center pl-3 pr-3 mb-3 mt-3\">\n            <div class=\"chat-content-logo rounded-circle\">\n                <div class=\"d-flex align-items-center justify-content-center f-1-2 h-100\">\n                    <span>AB</span>\n                </div>\n            </div>\n            <div class=\"chat-single-name\">\n                <div class=\"d-flex flex-column pl-2\">\n                    <div class=\"d-flex\">\n                        <span\n                            class=\"f-1 text-truncate font-weight-bold\">userName</span>\n                        <span\n                            class=\"f-1 text-muted ml-2\">createdDateTime</span>\n                    </div>\n                    <span\n                        class=\"f-1-2 text-truncate\">msgContent</span>\n                </div>\n            </div>\n        </li>";
            html = html.replace('userName', replyDatas[index].from.user.displayName);
            var date = new Date(replyDatas[index].createdDateTime);
            var cdate = date.toString().replace('GMT+0530 (India Standard Time)', '');
            html = html.replace('createdDateTime', cdate);
            if (replyDatas[index].attachments.length > 0) {
                var attachmentData = replyDatas[index].attachments[0].contentUrl;
                var aTag = '<a download href="' + attachmentData + '">Attachments</a>';
                var splitdata = attachmentData.split('.');
                var extension = splitdata[splitdata.length - 1];
                if (extension.toLowerCase() == 'jpg' ||
                    extension.toLowerCase() == 'png') {
                    aTag =
                        '<div class="img-wrap"><img src="' +
                            attachmentData +
                            '" class="img-fluid"/></div>';
                }
                if (replyDatas[index].body.content) {
                    html = html.replace('msgContent', aTag + replyDatas[index].body.content);
                }
                else {
                    html = html.replace('msgContent', aTag);
                }
            }
            else if (replyDatas[index].body.contentType == 'text') {
                html = html.replace('msgContent', replyDatas[index].body.content);
            }
            else if (replyDatas[index].body.contentType == 'html') {
                html = html.replace('msgContent', replyDatas[index].body.content);
            }
            mainhtml = mainhtml + html;
        }
        mainhtml = mainhtml + '</ul></div>';
        mainhtml = mainhtml.replace('clsallreplies', 'clsallreplies' + messageId);
        mainhtml = mainhtml.replace('curcollapse', 'curcollapse' + messageId);
        mainhtml = mainhtml.replace('replymsgid', messageId);
        $('.replycollapse' + messageId).append(mainhtml);
        $('.clsallreplies' + messageId).show();
        $('.curcollapse' + messageId).show();
    };
    ChatAppWebPart.prototype.loadChannelMsgReplies = function (channelId, teamId, messageId) {
        $('#loader').show();
        var that = this;
        this.context.msGraphClientFactory.getClient().then(function (client) {
            client
                .api('/teams/' +
                teamId +
                '/channels/' +
                channelId +
                '/messages/' +
                messageId +
                '/replies')
                .version('beta')
                .get()
                .then(function (content) {
                if (content && content.value) {
                    that.loadChannelMsgRepliesHtml(content.value, channelId, teamId, messageId);
                    $('#loader').hide();
                }
            })
                .catch(function (err) {
                console.log('err ', err);
                $('#loader').hide();
            });
        });
    };
    ChatAppWebPart.prototype.loadCHannelMsgsHtml = function (channelId, teamId, channelName, channelMsgs) {
        $('#chennelmsg-main').empty();
        $('#chennelmsg-main-textarea').empty();
        var colorIndex = 0;
        for (var index = channelMsgs.length - 1; index >= 0; index--) {
            var userName = channelMsgs[index].from.user.displayName;
            var splitData = userName.split(' ');
            var disPlayName = splitData[0][0].toUpperCase() + splitData[0][1].toUpperCase();
            if (splitData.length > 1) {
                disPlayName =
                    splitData[0][0].toUpperCase() + splitData[1][0].toUpperCase();
            }
            var html = "<li class=\"d-flex pl-3 pr-3 flex-row mt-2 mb-3\">\n    <div class=\"chat-content-logo mt-2 rounded-circle\">\n      <div class=\"d-flex align-items-center justify-content-center f-1-2 h-100\">\n        <span>LogoName</span>\n      </div>\n    </div>\n    <div class=\"chat-channel-msg bg-white ml-2 shadow-sm\">\n        <div class=\"d-flex flex-column pl-3 pr-3 pt-3 pb-3\">\n            <div class=\"d-flex\">\n                <span class=\"f-1\">userName</span>\n                <span class=\"f-1 text-muted ml-2\">createdDateTime</span>\n            </div>\n            <div class=\"f-1-2\">msgContent</div>\n        </div>\n        <div class=\"channel-reply\">\n            <div class=\"d-flex flex-column p-2 border-top\">\n                <span class=\"cursor-p pb-2 purple-med-txt f-1 clsviewreplies viewreply\"\n                    id=\"show-All-chat\" data-channelid=\"datachannelid\" data-teamid=\"datateamid\" data-messageid=\"datamessageid\">\n                    <span>View Replies</span>\n                </span>\n                <span class=\"replycollapse\"></span>\n                 \n                <span class=\"cursor-p f-1 clsshowreply showreplybtn\" data-msgid=\"showreplyblock\" id=\"reply-btn\">\n                    <i class=\"fas fa-reply\"></i>\n                    <span>Reply</span>\n                </span>\n            </div>\n            <div class=\"chat-box border-top pl-4 pr-4 pt-3 pb-0 clsreplyblock\" id=\"reply-box\"\n                style=\"display:none\">\n                <textarea class=\"form-control rounded-0 border-0 replytext\"\n                    placeholder=\"Enter your channel message\"></textarea>\n                <div class=\"d-flex chat-btn-grp align-items-center\">\n                    <span class=\"cursor-p clscancelreplyblk\" data-msgid=\"cancelreplyblock\">\n                        Cancel\n                    </span>\n                    <span class=\"cursor-p ml-4\">\n                    <input type=\"file\" class=\"d-none\" multiple id=\"attachmentid\"/>\n                    <i class=\"fas fa-paperclip\" onclick='$(this).prev().click()'></i>\n                    </span>  \n                    <span class=\"ml-auto pr-3 f-1-3 cursor-p sendnewreply\"\n                    data-channelid=\"senddatachannelid\" data-teamid=\"senddatateamid\" data-messageid=\"senddatamessageid\" attachment-id=\"refattachmentid\" data-index=\"dataindex\">\n                        <i class=\"far fa-paper-plane\"></i>\n                    </span>\n      <i class=\"fas fa-sync fa-spin clsallloader clsloader\"></i>\n\n                </div>\n            </div>\n        </div>\n    </div>\n</li>";
            html = html.replace('attachmentid', 'attachmentid' + index);
            html = html.replace('refattachmentid', 'attachmentid' + index);
            html = html.replace('clsloader', 'clsloader' + index);
            html = html.replace('dataindex', '' + index);
            html = html.replace('LogoName', disPlayName);
            html = html.replace('userName', channelMsgs[index].from.user.displayName);
            html = html.replace('datamessageid', channelMsgs[index].id);
            html = html.replace('datachannelid', channelId);
            html = html.replace('datateamid', teamId);
            html = html.replace('uploadsenddatamessageid', channelMsgs[index].id);
            html = html.replace('uploadsenddatachannelid', channelId);
            html = html.replace('uploadsenddatateamid', teamId);
            html = html.replace('senddatamessageid', channelMsgs[index].id);
            html = html.replace('senddatachannelid', channelId);
            html = html.replace('senddatateamid', teamId);
            html = html.replace('replytext', 'replytext' + channelMsgs[index].id);
            html = html.replace('showreplybtn', 'showreplybtn' + channelMsgs[index].id);
            html = html.replace('clsreplyblock', 'clsreplyblock' + channelMsgs[index].id);
            html = html.replace('cancelreplyblock', channelMsgs[index].id);
            html = html.replace('showreplyblock', channelMsgs[index].id);
            html = html.replace('viewreply', 'viewreply' + channelMsgs[index].id);
            html = html.replace('replycollapse', 'replycollapse' + channelMsgs[index].id);
            var date = new Date(channelMsgs[index].createdDateTime);
            var cdate = date.toString().replace('GMT+0530 (India Standard Time)', '');
            html = html.replace('createdDateTime', cdate);
            if (channelMsgs[index].attachments.length > 0) {
                var attachmentData = channelMsgs[index].attachments[0].contentUrl;
                var splitslash = attachmentData.split('/');
                var fileName = splitslash[splitslash.length - 1];
                var aTag = '<a download href="' + attachmentData + '">' + fileName + '</a>';
                var splitdata = attachmentData.split('.');
                var extension = splitdata[splitdata.length - 1];
                if (extension.toLowerCase() == 'jpg' ||
                    extension.toLowerCase() == 'png') {
                    aTag =
                        '<div class="img-wrap"><img src="' +
                            attachmentData +
                            '" class="img-fluid"/></div>';
                }
                if (channelMsgs[index].body.content) {
                    html = html.replace('msgContent', aTag + channelMsgs[index].body.content);
                }
                else {
                    html = html.replace('msgContent', aTag);
                }
            }
            else if (channelMsgs[index].body.contentType == 'text' ||
                channelMsgs[index].body.contentType == 'html') {
                html = html.replace('msgContent', channelMsgs[index].body.content);
            }
            $('#chennelmsg-main').append(html);
        }
        $('.clsallloader').hide();
        var textarea = "<textarea id=\"channelMsg\" class=\"form-control rounded-0 border-0\"\n      placeholder=\"Enter your message........\"></textarea>\n  <div class=\"d-flex chat-btn-grp align-items-center\">\n  <span class=\"cursor-p\">\n  <input type=\"file\" multiple class=\"d-none\" id=\"mainattachment\"/>\n  <i class=\"fas fa-paperclip\" onclick='$(this).prev().click()'></i>\n  </span>  \n      <span class=\"ml-auto pr-3 f-1-3 cursor-p\" id=\"chat-send-btn\" send-channel-msg-teamId=\"sendchannelmsgteamId\" send-channel-msg-channelId=\"sendchannelmsgchannelId\" send-channel-msg-channelName=\"sendchannelmsgchannelName\">\n          <i class=\"far fa-paper-plane\"></i>\n      </span>\n\n      <i id=\"savemain\" class=\"fas fa-sync fa-spin\"></i>\n\n  </div>";
        textarea = textarea.replace('sendchannelmsgteamId', teamId);
        textarea = textarea.replace('sendchannelmsgchannelId', channelId);
        textarea = textarea.replace('sendchannelmsgchannelName', channelName);
        $('#chennelmsg-main-textarea').append(textarea);
        $('#savemain').hide();
    };
    ChatAppWebPart.prototype.loadChannelMsgs = function (channelId, teamId, channelName) {
        $('#loader').show();
        var that = this;
        this.context.msGraphClientFactory.getClient().then(function (client) {
            client
                .api('/teams/' + teamId + '/channels/' + channelId + '/messages')
                .version('beta')
                .get()
                .then(function (content) {
                if (content && content.value) {
                    var userName = channelName;
                    var splitData = userName.split(' ');
                    var disPlayName = splitData[0][0].toUpperCase() + splitData[0][1].toUpperCase();
                    if (splitData.length > 1) {
                        disPlayName =
                            splitData[0][0].toUpperCase() + splitData[1][0].toUpperCase();
                    }
                    $('#userLogo').empty();
                    $('#userLogo').append('<div class="chat-content-logo rounded-circle"><div class="d-flex align-items-center justify-content-center f-1-2 h-100"><span>' +
                        disPlayName +
                        '</span></div></div>');
                    $('#msgHeader').text(channelName);
                    that.loadCHannelMsgsHtml(channelId, teamId, channelName, content.value);
                    $('#loader').hide();
                }
            })
                .catch(function (err) {
                console.log('err ', err);
                $('#loader').hide();
            });
        });
    };
    ChatAppWebPart.prototype.loadChannelsHtml = function (channels, teamId) {
        var html = "<div class=\"d-flex\">\n    <ul class=\"ml-auto no-list-style channel-list\">";
        for (var index = 0; index < channels.length; index++) {
            html =
                html +
                    '<li class="pt-1 pb-1 text-truncate clschannel" channel-name="' +
                    channels[index].displayName +
                    '" data-channelid="' +
                    channels[index].id +
                    '" data-channelteamid="' +
                    teamId +
                    '"="' +
                    channels[index].id +
                    '"><span class="f-1-4 ml-2">' +
                    channels[index].displayName +
                    '</span><a href="javascript:void(0)" class="ml-3 redirect-link" title="View All Conversation in Teams"><i class="fas fa-reply fa-flip-horizontal"></i></a></li>';
        }
        html = html + '</ul></div>';
        $('.' + teamId).append(html);
    };
    ChatAppWebPart.prototype.loadAllChannels = function (teamId) {
        $('#loader').show();
        var that = this;
        this.context.msGraphClientFactory.getClient().then(function (client) {
            client
                .api('/teams/' + teamId + '/channels')
                .version('beta')
                .get()
                .then(function (content) {
                if (content && content.value) {
                    that.loadChannelsHtml(content.value, teamId);
                    $('#loader').hide();
                }
            })
                .catch(function (err) {
                $('#loader').hide();
                console.log('err ', err);
            });
        });
    };
    ChatAppWebPart.prototype.loadTeamsHtml = function (teams) {
        var colorIndex = 0;
        for (var index = 0; index < teams.length; index++) {
            var team = teams[index];
            var userName = team.displayName;
            var splitData = userName.split(' ');
            var disPlayName = splitData[0][0].toUpperCase() + splitData[0][1].toUpperCase();
            if (splitData.length > 1) {
                disPlayName =
                    splitData[0][0].toUpperCase() + splitData[1][0].toUpperCase();
            }
            var html = "<li class=\"pl-4 pr-4 pt-2 pb-2 cursor-p clsteamid datateamid\" data-teamid=\"datateamid\">\n<div class=\"d-flex align-items-center\">\n    <div class=\"chat-single-logo\" style=\"background-color: backgroundcolor;\">\n      <div class=\"d-flex align-items-center justify-content-center f-1-2 h-100\">\n        <span>LogoPic</span>\n      </div>\n    </div>\n    <div class=\"chat-single-name\">\n        <div class=\"d-flex flex-column pl-2\">\n            <div class=\"d-flex\">\n                <span class=\"mr-auto f-1-3 text-truncate ml-2 f-w-6\">TeamsName</span>\n            </div>\n        </div>\n    </div>\n</div>\n</li>";
            if (colorIndex == 4) {
                colorIndex = 0;
            }
            html = html.replace('backgroundcolor', this.colors[colorIndex]);
            html = html.replace('LogoPic', disPlayName);
            html = html.replace('TeamsName', team.displayName);
            html = html.replace('datateamid', team.id);
            html = html.replace('datateamid', team.id);
            $('#channel-list').append(html);
            colorIndex++;
        }
    };
    ChatAppWebPart.prototype.loadAllTeams = function () {
        $('#loader').show();
        $('#channel-list').empty();
        var that = this;
        this.context.msGraphClientFactory.getClient().then(function (client) {
            client
                .api('/me/joinedTeams')
                .version('beta')
                .get()
                .then(function (content) {
                if (content && content.value) {
                    var result = content.value;
                    that.loadTeamsHtml(result);
                    $('#loader').hide();
                }
            })
                .catch(function (err) {
                console.log('err ', err);
                $('#loader').hide();
            });
        });
    };
    ChatAppWebPart.prototype.sendSingleUserMsg = function () {
        var usrMail = this.context.pageContext.user.email;
    };
    ChatAppWebPart.prototype.loadChatMsgs = function (chatId) {
        var _this = this;
        $('#singleUserChat').empty();
        $('#chatMsgs').empty();
        $('#chennelmsg-main').empty();
        var that = this;
        var usrMail = this.context.pageContext.user.email;
        this.getUserId(usrMail).then(function (usrIdResult) {
            _this.context.msGraphClientFactory.getClient().then(function (client) {
                client
                    .api('/users/' + usrIdResult + '/chats/' + chatId + '/messages')
                    .version('beta')
                    .get()
                    .then(function (content) {
                    if (content && content.value) {
                        var result = content.value;
                        for (var index = result.length - 1; index >= 0; index--) {
                            that.loadChatMsgHtml(result[index]);
                        }
                    }
                })
                    .catch(function (err) {
                    console.log('err ', err);
                });
            });
        });
    };
    ChatAppWebPart.prototype.loadChatMsgHtml = function (msgData) {
        var disPlayName = this.context.pageContext.user.displayName;
        var html = "<li class=\"d-flex pl-3 pr-3 flex-row mt-2 mb-3\">\n    <div class=\"chat-content-logo mt-2 rounded-circle\">\n    <div class=\"d-flex align-items-center justify-content-center f-1-2 h-100\">\n    <span>AB</span>\n  </div>\n    </div>\n    <div class=\"chat-single-msg bg-white pl-3 pr-3 pt-2 pb-2 ml-2\">\n        <div class=\"d-flex flex-column pl-2\">\n            <div class=\"d-flex\">\n                <span class=\"f-1\">userName</span>\n                <span class=\"f-1 text-muted ml-2\">createdDateTime</span>\n            </div>\n            <span class=\"f-1-2\">msgContent</span>\n        </div>\n    </div>\n</li>";
        if (disPlayName == msgData.from.user.displayName) {
            html = "<li class=\"d-flex pl-3 pr-3  flex-row-reverse\">\n      <div class=\"chat-single-msg pl-3 pr-3 pt-2 pb-2 ml-2 purple-light-bg\">\n          <div class=\"d-flex flex-column\">\n              <div class=\"d-flex\">\n                  <span class=\"f-1 text-muted\">createdDateTime</span>\n              </div>\n              <span class=\"f-1-2\">msgContent</span>\n          </div>\n      </div>\n  </li>";
        }
        var date = new Date(msgData.createdDateTime);
        var cdate = date.toString().replace('GMT+0530 (India Standard Time)', '');
        html = html.replace('createdDateTime', cdate);
        html = html.replace('userName', msgData.from.user.displayName);
        if (msgData.attachments.length > 0) {
            var aTag = '<a download href="' +
                msgData.attachments[0].contentUrl +
                '">Attachments</a>';
            if (msgData.body.content) {
                html = html.replace('msgContent', aTag + msgData.body.content);
            }
            else {
                html = html.replace('msgContent', aTag);
            }
        }
        else if (msgData.body.contentType == 'text') {
            html = html.replace('msgContent', msgData.body.content);
        }
        else if (msgData.body.contentType == 'html') {
            html = html.replace('msgContent', msgData.body.content);
        }
        $('#singleUserChat').append(html);
        $('#chatMsgs').append(html);
        $('#chennelmsg-main').append(html);
    };
    ChatAppWebPart.prototype.loadChatHtml = function (datas) {
        for (var index = 0; index < datas.length; index++) {
            var chatData = datas[index];
            var html = "<li class=\"chat-single-list d-flex align-items-center pl-4 pr-4 pt-2 pb-2 active cursor-p chatUser\" data-id=\"dataId\">\n                  <div class=\"chat-single-logo\">\n                    <div class=\"d-flex align-items-center justify-content-center f-1-2 h-100\">\n                      <span>AB</span>\n                    </div>\n                  </div>\n                  <div class=\"chat-single-name\">\n                      <div class=\"d-flex flex-column pl-2\">\n                          <div class=\"d-flex\">\n                              <span class=\"mr-auto f-1-1 text-truncate f-w-6 f-w-6\">userName</span>\n                              <span class=\"f-09\"></span>\n                          </div>\n                          <span class=\"f-1 text-truncate\"></span>\n                      </div>\n                  </div>\n              </li>";
            html = html.replace('dataId', chatData.id);
            // html = html.replace('userName', chatData.id);
            html = html.replace('userName', 'User ' + (index + 1));
            $('#user-list').append(html);
        }
    };
    ChatAppWebPart.prototype.loadAllChats = function () {
        var _this = this;
        $('#user-list').empty();
        var that = this;
        var usrMail = this.context.pageContext.user.email;
        this.getUserId(usrMail).then(function (usrIdResult) {
            _this.context.msGraphClientFactory.getClient().then(function (client) {
                client
                    .api('/users/' + usrIdResult + '/chats')
                    .version('beta')
                    .get()
                    .then(function (content) {
                    if (content && content.value) {
                        that.loadChatHtml(content.value);
                    }
                })
                    .catch(function (err) {
                    console.log('err ', err);
                });
            });
        });
    };
    ChatAppWebPart.prototype.getUserId = function (email) {
        return pnp.sp.site.rootWeb.ensureUser(email).then(function (result) {
            return result.data.Id;
        });
    };
    Object.defineProperty(ChatAppWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    ChatAppWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ChatAppWebPart;
}(BaseClientSideWebPart));
export default ChatAppWebPart;
//# sourceMappingURL=ChatAppWebPart.js.map