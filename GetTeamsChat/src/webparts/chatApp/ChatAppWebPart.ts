// suru@yettobetitled.onmicrosoft.com
// June17@2019
// TestUser@yettobetitled.onmicrosoft.com
// we1c@me27

// LOADER USAGE

// <i class="fas fa-sync fa-spin"></i> - ELEMENT
// $("#loader").hide(); -- FULL PAGE

import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ChatAppWebPart.module.scss';
import * as strings from 'ChatAppWebPartStrings';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { GraphError } from '@microsoft/microsoft-graph-client';
import { SPComponentLoader } from '@microsoft/sp-loader';
import 'jquery';

import pnp from 'sp-pnp-js';

// require('bootstrap');
// import '../../external/brands.min.css';
// import '../../external/fontawesome.min.css';
// import '../../external/regular.min.css';
// import '../../external/solid.min.css';

export interface IChatAppWebPartProps {
  description: string;
}

export default class ChatAppWebPart extends BaseClientSideWebPart<
  IChatAppWebPartProps
> {
  colors = ['#3369FF', '#FF5233', '#E922B6', '#3BE922'];
  attachmentBody = [];

  public render(): void {
    SPComponentLoader.loadCss(
      '/sites/NWTDemo/SiteAssets/Chatapp/CSS/style.css'
    );
    SPComponentLoader.loadCss(
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css'
    );
    SPComponentLoader.loadCss(
      '/sites/NWTDemo/SiteAssets/Chatapp/CSS/bootstrap.min.css'
    );
    SPComponentLoader.loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js'
    );
    SPComponentLoader.loadScript(
      '/sites/NWTDemo/SiteAssets/Chatapp/JS/index.js'
    );

    this.domElement.innerHTML = `<body class="black-txt">
    <div id="loader">
      <div class="loader d-flex h-100 w-100 align-items-center justify-content-center">
          <div>
              <img src="/sites/NWTDemo/SiteAssets/Chatapp/IMG/TeamsLogo.png" class="img-fluid" />
              <p class="saving text-center">Loading<span>.</span><span>.</span><span>.</span></p>
          </div>
      </div>
    </div>
    <div class="d-none d-sm-block h-100 w-100">
        <div class="d-flex h-100 w-100">
            <div class="nav-select purple-bg">
                <ul class="nav-list no-list-style text-white">
                    <li  onclick="showChatList('chat')" id="chatTab">
                        <div class="d-flex flex-column text-center cursor-p">
                            <span class="nav-logo"><i class="fas fa-comment-dots"></i></span>
                            <span class="nav-txt">Chat</span>
                        </div>
                    </li>
                    <li class="active" onclick="showChatList('teams')" id="teamTab">
                        <div class="d-flex flex-column text-center cursor-p">
                            <span class="nav-logo"><i class="fas fa-users"></i></span>
                            <span class="nav-txt">Teams</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="chat-user-list bg-white">
                <!-- singles users -->
                <ul class="no-list-style" id="user-list">
                     
                </ul>
                <ul class="no-list-style" id="channel-list">
                    <li class="pl-4 pr-4 pt-2 pb-2 cursor-p">
                        <div class="d-flex align-items-center">
                            <div class="chat-single-logo">
                                <div class="d-flex align-items-center justify-content-center f-1-2 h-100">
                                  <span>AB</span>
                                </div>
                            </div>
                            <div class="chat-single-name">
                                <div class="d-flex flex-column pl-2">
                                    <div class="d-flex">
                                        <span class="mr-auto f-1- text-truncate ml-2 f-w-6">Channel 1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <ul class="ml-auto no-list-style channel-list">
                                <li class="pt-1 pb-1 text-truncate"><span class="f-1-4 ml-2">Channel 1</span></li>
                                <li class="pt-1 pb-1 text-truncate"><span class="f-1-4 ml-2">Channel 1</span></li>
                                <li class="pt-1 pb-1 text-truncate"><span class="f-1-4 ml-2">Channel 1</span></li>
                            </ul>
                        </div>
                    </li>
                    <li class="chat-single-list d-flex align-items-center pl-4 pr-4 pt-2 pb-2 cursor-p">
                        <div class="chat-single-logo">
                          <div class="d-flex align-items-center justify-content-center f-1-2 h-100">
                            <span>AB</span>
                          </div>
                        </div>
                        <div class="chat-single-name">
                            <div class="d-flex flex-column pl-2">
                                <div class="d-flex">
                                    <span class="mr-auto f-1-3 text-truncate ml-2 f-w-6">Channel 2</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="chat-content-wrap bg-light">
                <div class="chat-head d-flex align-items-center ml-3 mr-3 pt-2 pb-2 border-bottom">
                    <span  id="userLogo"></span>
                    <div class="chat-title-name">
                        <div class="d-flex flex-column pl-2">
                            <div class="d-flex">
                                <span class="mr-auto f-1-4 font-weight-bold text-truncate ml-2" id="msgHeader"></span>
                                <span class="text-secondary cursor-p close-chat f-1-4"><i
                                        class=""></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container chat-content-list">
                    <div class="row h-100">
                        <div class="col-md-10 offset-md-1 col-sm-12 h-100">
                            <div class="d-flex flex-column h-100">
                                <div class="mt-3 mb-3 chat-content-height">
                                    <!-- single user conversation -->
                                    <ul class="no-list-style" style="display:none">
                                        <li class="d-flex pl-3 pr-3 flex-row mt-2 mb-3">
                                            <div class="chat-content-logo rounded-circle mt-2">
                                                <div class="d-flex align-items-center justify-content-center f-1-2 h-100">
                                                <span>AB</span>
                                              </div>
                                            </div>
                                            <div class="chat-single-msg bg-white pl-3 pr-3 pt-2 pb-2 ml-2">
                                                <div class="d-flex flex-column pl-2">
                                                    <div class="d-flex">
                                                        <span class="f-1">John Doe</span>
                                                        <span class="f-1 text-muted ml-2">30-05-2019 05:00 AM</span>
                                                    </div>
                                                    <span class="f-1-2">123131</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="d-flex pl-3 pr-3 flex-row-reverse">
                                            <div class="chat-single-msg pl-3 pr-3 pt-2 pb-2 ml-2 purple-light-bg">
                                                <div class="d-flex flex-column">
                                                    <div class="d-flex">
                                                        <span class="f-1 text-muted">30-05-2019 05:00 AM</span>
                                                    </div>
                                                    <span class="f-1-2">312</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <!-- channel list -->
                                    <ul class="no-list-style" id="chennelmsg-main">
                                        
                                    </ul>
                                </div>
                                <div class="mt-auto chat-box border-top pl-4 pr-4 pt-3 pb-2" id="chennelmsg-main-textarea">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="d-block d-sm-none h-100 w-100">
        <div class="d-flex flex-column h-100 w-100">
            <div class="m-chat d-flex flex-column">
                <div class="h-100 bg-white" style="display:none">
                    <ul class="no-list-style">
                         
                    </ul>
                </div>
                <div class="h-100 bg-light">
                    
                    <div class="container chat-content-list">
                        <div class="row h-100">
                            <div class="col-sm-12 h-100">
                                <div class="d-flex flex-column h-100">
                                    <div class="mt-3 mb-3">
                                        <!-- single user conversation -->
                                        <ul class="no-list-style" style="display:none">
                                            
                                        </ul>
                                        <!-- channel list -->
                                        <ul>
                                            
                                        </ul>
                                    </div>
                                    <div class="mt-auto chat-box border-top pl-4 pr-4 pt-3 pb-2">
                                        <textarea class="form-control rounded-0 border-0"
                                            placeholder="Enter your single chat message"></textarea>
                                        <div class="d-flex chat-btn-grp align-items-center" id="btnSingleChat">                                        
                                        <span class="cursor-p">
                                        <input type="file" class="d-none" />
                                        <i class="fas fa-paperclip" onclick='$(this).prev().click()'></i>
                                        </span>  
                                            <span class="ml-auto pr-3 f-1-3 cursor-p" id="chat-send-btn">
                                                <i class="far fa-paper-plane"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-nav-select purple-bg">
                <ul class="m-nav-list no-list-style text-white h-100 d-flex">
                    <li class="active w-50">
                        <div class="d-flex flex-column text-center p-rel h-100">
                            <span class="nav-logo"><i class="fas fa-comment-dots"></i></span>
                            <span class="nav-txt">Chat</span>
                        </div>
                    </li>
                    <li class="w-50">
                        <div class="d-flex flex-column text-center p-rel h-100">
                            <span class="nav-logo"><i class="fas fa-users"></i></span>
                            <span class="nav-txt">Teams</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</body>`;
    let usrMail = this.context.pageContext.user.email;
    var that = this;
    let usrPrincipalName = this.context.pageContext.user.loginName;
    let foobar: any = {
      securityEnabledOnly: false
    };
    this.getUserId(usrMail).then(usrIdResult => {
      this.context.msGraphClientFactory.getClient().then(
        (client: MSGraphClient): void => {
          client
            .api('/teams/d07d72d5-2b43-45fc-92c7-58bb32d1f315/channels')
            .version('beta')
            .get()
            .then((content: any) => {
              // console.log('Teams ', content);
            })
            .catch(err => {
              //  console.log('err ', err);
            });
        }
      );
    });

    $(document).ready(function(e) {
      $(document).on('click', '.clschatTab', function() {
        $('.nav-select li:first-of-type').addClass('active');
        $('#channel-list').hide();
        $('#user-list').show();
      });

      $(document).on('click', '.clsteamTab', function() {
        $('.nav-select li:last-of-type').addClass('active');
        $('#user-list').hide();
        $('#channel-list').show();
      });

      $(document).on('click', '.cancelReplyBox', function() {
        $('#reply-box').hide();
        $('#reply-btn').show();
      });

      $(document).on('click', '.showReplyBox', function() {
        $('#reply-box').show();
        $('#reply-btn').hide();
      });

      $(document).on('click', '.collapseAllChat', function() {
        $('#show-All-chat').show();
        $('#all-replies,#collapse-all-chat').hide();
      });

      $(document).on('click', '.showAllChat', function() {
        $('#show-All-chat').hide();
        $('#all-replies,#collapse-all-chat').show();
      });

      $('#chatTab').on('click', function(e) {
        $('#chennelmsg-main').empty();
        $('#userLogo').empty();
        $('#msgHeader').text('');
        that.loadAllChats();
      });

      $('#teamTab').on('click', function(e) {
        $('#chennelmsg-main').empty();
        $('#userLogo').empty();
        $('#msgHeader').text('');
        that.loadAllTeams();
      });

      $('#btnSingleChat').on('click', function(e) {
        that.sendSingleUserMsg();
      });

      $(document).on('click', '.chatUser', function() {
        var chatId = $(this).attr('data-id');
        that.loadChatMsgs(chatId);
      });

      $(document).on('click', '.clsteamid', function() {
        var teamid = $(this).attr('data-teamid');
        if (teamid) {
          $(this).attr('data-teamid', '');
          that.loadAllChannels(teamid);
        }
      });

      $(document).on('click', '.clschannel', function() {
        var channelid = $(this).attr('data-channelid');
        var teamid = $(this).attr('data-channelteamid');
        var channelName = $(this).attr('channel-name');
        that.loadChannelMsgs(channelid, teamid, channelName);
      });

      $(document).on('click', '.clsviewreplies', function() {
        var channelid = $(this).attr('data-channelid');
        var teamid = $(this).attr('data-teamid');
        var messageid = $(this).attr('data-messageid');
        that.loadChannelMsgReplies(channelid, teamid, messageid);
        $(this).hide();
      });

      $(document).on('click', '.clscollapsecurrent', function() {
        var msgid = $(this).attr('data-msgid');
        $('.clsallreplies' + msgid).hide();
        $('.curcollapse' + msgid).hide();
        $('.viewreply' + msgid).show();
      });

      $(document).on('click', '.sendnewreply', function() {
        var channelid = $(this).attr('data-channelid');
        var teamid = $(this).attr('data-teamid');
        var messageid = $(this).attr('data-messageid');
        var attachmentid = $(this).attr('attachment-id');
        var dataindex = $(this).attr('data-index');
        that.sendNewReply(
          channelid,
          teamid,
          messageid,
          attachmentid,
          dataindex
        );
      });

      $(document).on('click', '#chat-send-btn', function() {
        $('#savemain').show();
        var channelid = $(this).attr('send-channel-msg-channelId');
        var teamid = $(this).attr('send-channel-msg-teamId');
        var channelName = $(this).attr('send-channel-msg-channelName');
        that.sendNewChannelMsg(channelid, teamid, channelName);
      });

      $(document).on('click', '.clsshowreply', function() {
        var msgId = $(this).attr('data-msgid');
        $('.clsreplyblock' + msgId).show();
        $('.showreplybtn' + msgId).hide();
      });

      $(document).on('click', '.clscancelreplyblk', function() {
        var msgId = $(this).attr('data-msgid');
        $('.clsreplyblock' + msgId).hide();
        $('.showreplybtn' + msgId).show();
      });
    });

    this.loadAllTeams();
  }

  async sendAttachment(files, callback) {
    this.attachmentBody = [];
    this.uploadFiles(0, files, callback);
  }

  public uploadFiles(index, files, callback) {
    try {
      var that = this;
      var file = files[index];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async function(e) {
        var base64str = e.target['result'].split('base64,')[1];
        var arrayBuffer = that.base64ToArrayBuffer(base64str);
        var result = await pnp.sp.web
          .getFolderByServerRelativeUrl('Shared Documents')
          .files.add(file.name, arrayBuffer, true);
        result['file'].listItemAllFields.get().then(function(data) {
          var filePath =
            that.context.pageContext.web.absoluteUrl +
            '/Shared%20Documents/' +
            file.name;
          that.attachmentBody.push(filePath);
          index++;
          if (index < files.length) {
            that.uploadFiles(index, files, callback);
          } else {
            callback();
          }
        });
      };
    } catch (error) {
      $('#savemain').hide();
      $(this.clsloader).hide();
    }
  }

  public base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  public sendNewChannelMsg(channelId, teamId, channelName) {
    var channelText = $('#channelMsg').val();
    var that = this;
    var attachment = $('#mainattachment')[0];
    var url = '/teams/' + teamId + '/channels/' + channelId + '/messages';

    if (attachment && attachment['files'] && attachment['files'].length > 0) {
      this.sendAttachment(attachment['files'], function() {
        var msghtml = channelText + '</br>';
        for (let index = 0; index < that.attachmentBody.length; index++) {
          var attachmentData = that.attachmentBody[index];
          var slashsplit = attachmentData.split('/');
          var fileName = slashsplit[slashsplit.length - 1];
          var aTag =
            '<a download href="' + attachmentData + '">' + fileName + '</a>';

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
        that.sendMessage(msgbody, url, function() {
          that.loadChannelMsgs(channelId, teamId, channelName);
        });
      });
    } else if (channelText) {
      var msgbody = {
        body: {
          contentType: 'text',
          content: channelText
        }
      };
      that.sendMessage(msgbody, url, function() {
        that.loadChannelMsgs(channelId, teamId, channelName);
      });
    }
  }

  public sendMessage(body, url, callback) {
    var that = this;
    this.context.msGraphClientFactory.getClient().then(
      (client: MSGraphClient): void => {
        client
          .api(url)
          .version('beta')
          .post(body)
          .then((content: any) => {
            $('#savemain').hide();
            $(this.clsloader).hide();
            callback();
          })
          .catch(err => {
            console.log('err ', err);
            $('#savemain').hide();
            $(this.clsloader).hide();
          });
      }
    );
  }
  clsloader = '';
  public sendNewReply(channelId, teamId, messageId, attachmentid, dataindex) {
    this.clsloader = '.clsloader' + dataindex;
    $(this.clsloader).show();
    var replyContent = $('.replytext' + messageId).val();
    $('.replytext' + messageId).val('');
    var that = this;
    var attachment = $('#' + attachmentid)[0];
    var url =
      '/teams/' +
      teamId +
      '/channels/' +
      channelId +
      '/messages/' +
      messageId +
      '/replies';
    if (attachment && attachment['files'] && attachment['files'].length > 0) {
      this.sendAttachment(attachment['files'], function() {
        var msghtml = replyContent + '</br>';
        for (let index = 0; index < that.attachmentBody.length; index++) {
          var attachmentData = that.attachmentBody[index];
          var slashsplit = attachmentData.split('/');
          var fileName = slashsplit[slashsplit.length - 1];
          var aTag =
            '<a download href="' + attachmentData + '">' + fileName + '</a>';

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
        that.sendMessage(msgbody, url, function() {
          that.loadChannelMsgReplies(channelId, teamId, messageId);
        });
      });
    } else if (replyContent) {
      var msgbody = {
        body: {
          contentType: 'text',
          content: replyContent
        }
      };
      that.sendMessage(msgbody, url, function() {
        that.loadChannelMsgReplies(channelId, teamId, messageId);
      });
    }
  }

  public loadChannelMsgRepliesHtml(replyDatas, channelId, teamId, messageId) {
    $('.replycollapse' + messageId).empty();
    var mainhtml = `<span class="cursor-p purple-med-txt f-1 clscollapsecurrent curcollapse" data-msgid="replymsgid" id="collapse-all-chat">
    <span>Collapse all</span>
</span>
<div id="all-replies" class="clsallreplies">
    <ul class="no-list-style">`;
    for (let index = replyDatas.length - 1; index >= 0; index--) {
      var html = `
        <li
            class="chat-single-list d-flex align-items-center pl-3 pr-3 mb-3 mt-3">
            <div class="chat-content-logo rounded-circle">
                <div class="d-flex align-items-center justify-content-center f-1-2 h-100">
                    <span>AB</span>
                </div>
            </div>
            <div class="chat-single-name">
                <div class="d-flex flex-column pl-2">
                    <div class="d-flex">
                        <span
                            class="f-1 text-truncate font-weight-bold">userName</span>
                        <span
                            class="f-1 text-muted ml-2">createdDateTime</span>
                    </div>
                    <span
                        class="f-1-2 text-truncate">msgContent</span>
                </div>
            </div>
        </li>`;
      html = html.replace('userName', replyDatas[index].from.user.displayName);

      var date = new Date(replyDatas[index].createdDateTime);
      var cdate = date.toString().replace('GMT+0530 (India Standard Time)', '');
      html = html.replace('createdDateTime', cdate);

      if (replyDatas[index].attachments.length > 0) {
        var attachmentData = replyDatas[index].attachments[0].contentUrl;
        var aTag = '<a download href="' + attachmentData + '">Attachments</a>';

        var splitdata = attachmentData.split('.');
        var extension = splitdata[splitdata.length - 1];
        if (
          extension.toLowerCase() == 'jpg' ||
          extension.toLowerCase() == 'png'
        ) {
          aTag =
            '<div class="img-wrap"><img src="' +
            attachmentData +
            '" class="img-fluid"/></div>';
        }

        if (replyDatas[index].body.content) {
          html = html.replace(
            'msgContent',
            aTag + replyDatas[index].body.content
          );
        } else {
          html = html.replace('msgContent', aTag);
        }
      } else if (replyDatas[index].body.contentType == 'text') {
        html = html.replace('msgContent', replyDatas[index].body.content);
      } else if (replyDatas[index].body.contentType == 'html') {
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
  }

  public loadChannelMsgReplies(channelId, teamId, messageId) {
    $('#loader').show();

    var that = this;
    this.context.msGraphClientFactory.getClient().then(
      (client: MSGraphClient): void => {
        client
          .api(
            '/teams/' +
              teamId +
              '/channels/' +
              channelId +
              '/messages/' +
              messageId +
              '/replies'
          )
          .version('beta')
          .get()
          .then((content: any) => {
            if (content && content.value) {
              that.loadChannelMsgRepliesHtml(
                content.value,
                channelId,
                teamId,
                messageId
              );
              $('#loader').hide();
            }
          })
          .catch(err => {
            console.log('err ', err);
            $('#loader').hide();
          });
      }
    );
  }

  public loadCHannelMsgsHtml(channelId, teamId, channelName, channelMsgs) {
    $('#chennelmsg-main').empty();
    $('#chennelmsg-main-textarea').empty();
    var colorIndex = 0;
    for (let index = channelMsgs.length - 1; index >= 0; index--) {
      var userName = channelMsgs[index].from.user.displayName;
      var splitData = userName.split(' ');
      var disPlayName =
        splitData[0][0].toUpperCase() + splitData[0][1].toUpperCase();
      if (splitData.length > 1) {
        disPlayName =
          splitData[0][0].toUpperCase() + splitData[1][0].toUpperCase();
      }

      var html = `<li class="d-flex pl-3 pr-3 flex-row mt-2 mb-3">
    <div class="chat-content-logo mt-2 rounded-circle">
      <div class="d-flex align-items-center justify-content-center f-1-2 h-100">
        <span>LogoName</span>
      </div>
    </div>
    <div class="chat-channel-msg bg-white ml-2 shadow-sm">
        <div class="d-flex flex-column pl-3 pr-3 pt-3 pb-3">
            <div class="d-flex">
                <span class="f-1">userName</span>
                <span class="f-1 text-muted ml-2">createdDateTime</span>
            </div>
            <div class="f-1-2">msgContent</div>
        </div>
        <div class="channel-reply">
            <div class="d-flex flex-column p-2 border-top">
                <span class="cursor-p pb-2 purple-med-txt f-1 clsviewreplies viewreply"
                    id="show-All-chat" data-channelid="datachannelid" data-teamid="datateamid" data-messageid="datamessageid">
                    <span>View Replies</span>
                </span>
                <span class="replycollapse"></span>
                 
                <span class="cursor-p f-1 clsshowreply showreplybtn" data-msgid="showreplyblock" id="reply-btn">
                    <i class="fas fa-reply"></i>
                    <span>Reply</span>
                </span>
            </div>
            <div class="chat-box border-top pl-4 pr-4 pt-3 pb-0 clsreplyblock" id="reply-box"
                style="display:none">
                <textarea class="form-control rounded-0 border-0 replytext"
                    placeholder="Enter your channel message"></textarea>
                <div class="d-flex chat-btn-grp align-items-center">
                    <span class="cursor-p clscancelreplyblk" data-msgid="cancelreplyblock">
                        Cancel
                    </span>
                    <span class="cursor-p ml-4">
                    <input type="file" class="d-none" multiple id="attachmentid"/>
                    <i class="fas fa-paperclip" onclick='$(this).prev().click()'></i>
                    </span>  
                    <span class="ml-auto pr-3 f-1-3 cursor-p sendnewreply"
                    data-channelid="senddatachannelid" data-teamid="senddatateamid" data-messageid="senddatamessageid" attachment-id="refattachmentid" data-index="dataindex">
                        <i class="far fa-paper-plane"></i>
                    </span>
      <i class="fas fa-sync fa-spin clsallloader clsloader"></i>

                </div>
            </div>
        </div>
    </div>
</li>`;

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

      html = html.replace(
        'showreplybtn',
        'showreplybtn' + channelMsgs[index].id
      );
      html = html.replace(
        'clsreplyblock',
        'clsreplyblock' + channelMsgs[index].id
      );
      html = html.replace('cancelreplyblock', channelMsgs[index].id);
      html = html.replace('showreplyblock', channelMsgs[index].id);

      html = html.replace('viewreply', 'viewreply' + channelMsgs[index].id);

      html = html.replace(
        'replycollapse',
        'replycollapse' + channelMsgs[index].id
      );

      var date = new Date(channelMsgs[index].createdDateTime);
      var cdate = date.toString().replace('GMT+0530 (India Standard Time)', '');

      html = html.replace('createdDateTime', cdate);

      if (channelMsgs[index].attachments.length > 0) {
        var attachmentData = channelMsgs[index].attachments[0].contentUrl;

        var splitslash = attachmentData.split('/');
        var fileName = splitslash[splitslash.length - 1];

        var aTag =
          '<a download href="' + attachmentData + '">' + fileName + '</a>';

        var splitdata = attachmentData.split('.');
        var extension = splitdata[splitdata.length - 1];
        if (
          extension.toLowerCase() == 'jpg' ||
          extension.toLowerCase() == 'png'
        ) {
          aTag =
            '<div class="img-wrap"><img src="' +
            attachmentData +
            '" class="img-fluid"/></div>';
        }
        if (channelMsgs[index].body.content) {
          html = html.replace(
            'msgContent',
            aTag + channelMsgs[index].body.content
          );
        } else {
          html = html.replace('msgContent', aTag);
        }
      } else if (
        channelMsgs[index].body.contentType == 'text' ||
        channelMsgs[index].body.contentType == 'html'
      ) {
        html = html.replace('msgContent', channelMsgs[index].body.content);
      }
      $('#chennelmsg-main').append(html);
    }
    $('.clsallloader').hide();

    var textarea = `<textarea id="channelMsg" class="form-control rounded-0 border-0"
      placeholder="Enter your message........"></textarea>
  <div class="d-flex chat-btn-grp align-items-center">
  <span class="cursor-p">
  <input type="file" multiple class="d-none" id="mainattachment"/>
  <i class="fas fa-paperclip" onclick='$(this).prev().click()'></i>
  </span>  
      <span class="ml-auto pr-3 f-1-3 cursor-p" id="chat-send-btn" send-channel-msg-teamId="sendchannelmsgteamId" send-channel-msg-channelId="sendchannelmsgchannelId" send-channel-msg-channelName="sendchannelmsgchannelName">
          <i class="far fa-paper-plane"></i>
      </span>

      <i id="savemain" class="fas fa-sync fa-spin"></i>

  </div>`;

    textarea = textarea.replace('sendchannelmsgteamId', teamId);
    textarea = textarea.replace('sendchannelmsgchannelId', channelId);
    textarea = textarea.replace('sendchannelmsgchannelName', channelName);

    $('#chennelmsg-main-textarea').append(textarea);
    $('#savemain').hide();
  }

  public loadChannelMsgs(channelId, teamId, channelName) {
    $('#loader').show();
    var that = this;
    this.context.msGraphClientFactory.getClient().then(
      (client: MSGraphClient): void => {
        client
          .api('/teams/' + teamId + '/channels/' + channelId + '/messages')
          .version('beta')
          .get()
          .then((content: any) => {
            if (content && content.value) {
              var userName = channelName;
              var splitData = userName.split(' ');
              var disPlayName =
                splitData[0][0].toUpperCase() + splitData[0][1].toUpperCase();
              if (splitData.length > 1) {
                disPlayName =
                  splitData[0][0].toUpperCase() + splitData[1][0].toUpperCase();
              }

              $('#userLogo').empty();

              $('#userLogo').append(
                '<div class="chat-content-logo rounded-circle"><div class="d-flex align-items-center justify-content-center f-1-2 h-100"><span>' +
                  disPlayName +
                  '</span></div></div>'
              );
              $('#msgHeader').text(channelName);

              that.loadCHannelMsgsHtml(
                channelId,
                teamId,
                channelName,
                content.value
              );
              $('#loader').hide();
            }
          })
          .catch(err => {
            console.log('err ', err);
            $('#loader').hide();
          });
      }
    );
  }

  public loadChannelsHtml(channels, teamId) {
    var html = `<div class="d-flex">
    <ul class="ml-auto no-list-style channel-list">`;
    for (let index = 0; index < channels.length; index++) {
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
        '</span><a href="https://teams.microsoft.com/_" class="ml-3 redirect-link" title="View All Conversation in Teams"><i class="fas fa-reply fa-flip-horizontal"></i></a></li>';
    }
    html = html + '</ul></div>';
    $('.' + teamId).append(html);
  }

  public loadAllChannels(teamId) {
    $('#loader').show();
    var that = this;
    this.context.msGraphClientFactory.getClient().then(
      (client: MSGraphClient): void => {
        client
          .api('/teams/' + teamId + '/channels')
          .version('beta')
          .get()
          .then((content: any) => {
            if (content && content.value) {
              that.loadChannelsHtml(content.value, teamId);
              $('#loader').hide();
            }
          })
          .catch(err => {
            $('#loader').hide();
            console.log('err ', err);
          });
      }
    );
  }

  public loadTeamsHtml(teams) {
    var colorIndex = 0;
    for (let index = 0; index < teams.length; index++) {
      var team = teams[index];
      var userName = team.displayName;
      var splitData = userName.split(' ');
      var disPlayName =
        splitData[0][0].toUpperCase() + splitData[0][1].toUpperCase();
      if (splitData.length > 1) {
        disPlayName =
          splitData[0][0].toUpperCase() + splitData[1][0].toUpperCase();
      }

      var html = `<li class="pl-4 pr-4 pt-2 pb-2 cursor-p clsteamid datateamid" data-teamid="datateamid">
<div class="d-flex align-items-center">
    <div class="chat-single-logo" style="background-color: backgroundcolor;">
      <div class="d-flex align-items-center justify-content-center f-1-2 h-100">
        <span>LogoPic</span>
      </div>
    </div>
    <div class="chat-single-name">
        <div class="d-flex flex-column pl-2">
            <div class="d-flex">
                <span class="mr-auto f-1-3 text-truncate ml-2 f-w-6">TeamsName</span>
            </div>
        </div>
    </div>
</div>
</li>`;
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
  }

  public loadAllTeams() {
    $('#loader').show();
    $('#channel-list').empty();
    var that = this;
    this.context.msGraphClientFactory.getClient().then(
      (client: MSGraphClient): void => {
        client
          .api('/me/joinedTeams')
          .version('beta')
          .get()
          .then((content: any) => {
            if (content && content.value) {
              var result = content.value;
              that.loadTeamsHtml(result);
              $('#loader').hide();
            }
          })
          .catch(err => {
            console.log('err ', err);
            $('#loader').hide();
          });
      }
    );
  }

  public sendSingleUserMsg() {
    let usrMail = this.context.pageContext.user.email;
  }

  public loadChatMsgs(chatId) {
    $('#singleUserChat').empty();
    $('#chatMsgs').empty();
    $('#chennelmsg-main').empty();

    var that = this;
    let usrMail = this.context.pageContext.user.email;
    this.getUserId(usrMail).then(usrIdResult => {
      this.context.msGraphClientFactory.getClient().then(
        (client: MSGraphClient): void => {
          client
            .api('/users/' + usrIdResult + '/chats/' + chatId + '/messages')
            .version('beta')
            .get()
            .then((content: any) => {
              if (content && content.value) {
                var result = content.value;
                for (let index = result.length - 1; index >= 0; index--) {
                  that.loadChatMsgHtml(result[index]);
                }
              }
            })
            .catch(err => {
              console.log('err ', err);
            });
        }
      );
    });
  }

  public loadChatMsgHtml(msgData) {
    let disPlayName = this.context.pageContext.user.displayName;
    var html = `<li class="d-flex pl-3 pr-3 flex-row mt-2 mb-3">
    <div class="chat-content-logo mt-2 rounded-circle">
    <div class="d-flex align-items-center justify-content-center f-1-2 h-100">
    <span>AB</span>
  </div>
    </div>
    <div class="chat-single-msg bg-white pl-3 pr-3 pt-2 pb-2 ml-2">
        <div class="d-flex flex-column pl-2">
            <div class="d-flex">
                <span class="f-1">userName</span>
                <span class="f-1 text-muted ml-2">createdDateTime</span>
            </div>
            <span class="f-1-2">msgContent</span>
        </div>
    </div>
</li>`;
    if (disPlayName == msgData.from.user.displayName) {
      html = `<li class="d-flex pl-3 pr-3  flex-row-reverse">
      <div class="chat-single-msg pl-3 pr-3 pt-2 pb-2 ml-2 purple-light-bg">
          <div class="d-flex flex-column">
              <div class="d-flex">
                  <span class="f-1 text-muted">createdDateTime</span>
              </div>
              <span class="f-1-2">msgContent</span>
          </div>
      </div>
  </li>`;
    }

    var date = new Date(msgData.createdDateTime);
    var cdate = date.toString().replace('GMT+0530 (India Standard Time)', '');
    html = html.replace('createdDateTime', cdate);

    html = html.replace('userName', msgData.from.user.displayName);
    if (msgData.attachments.length > 0) {
      var aTag =
        '<a download href="' +
        msgData.attachments[0].contentUrl +
        '">Attachments</a>';
      if (msgData.body.content) {
        html = html.replace('msgContent', aTag + msgData.body.content);
      } else {
        html = html.replace('msgContent', aTag);
      }
    } else if (msgData.body.contentType == 'text') {
      html = html.replace('msgContent', msgData.body.content);
    } else if (msgData.body.contentType == 'html') {
      html = html.replace('msgContent', msgData.body.content);
    }
    $('#singleUserChat').append(html);
    $('#chatMsgs').append(html);
    $('#chennelmsg-main').append(html);
  }

  public loadChatHtml(datas) {
    for (let index = 0; index < datas.length; index++) {
      var chatData = datas[index];
      var html = `<li class="chat-single-list d-flex align-items-center pl-4 pr-4 pt-2 pb-2 active cursor-p chatUser" data-id="dataId">
                  <div class="chat-single-logo">
                    <div class="d-flex align-items-center justify-content-center f-1-2 h-100">
                      <span>AB</span>
                    </div>
                  </div>
                  <div class="chat-single-name">
                      <div class="d-flex flex-column pl-2">
                          <div class="d-flex">
                              <span class="mr-auto f-1-1 text-truncate f-w-6 f-w-6">userName</span>
                              <span class="f-09"></span>
                          </div>
                          <span class="f-1 text-truncate"></span>
                      </div>
                  </div>
              </li>`;
      html = html.replace('dataId', chatData.id);
      // html = html.replace('userName', chatData.id);
      html = html.replace('userName', 'User ' + (index + 1));
      $('#user-list').append(html);
    }
  }

  public loadAllChats() {
    $('#user-list').empty();
    var that = this;
    let usrMail = this.context.pageContext.user.email;
    this.getUserId(usrMail).then(usrIdResult => {
      this.context.msGraphClientFactory.getClient().then(
        (client: MSGraphClient): void => {
          client
            .api('/users/' + usrIdResult + '/chats')
            .version('beta')
            .get()
            .then((content: any) => {
              if (content && content.value) {
                that.loadChatHtml(content.value);
              }
            })
            .catch(err => {
              console.log('err ', err);
            });
        }
      );
    });
  }

  public getUserId(email: string): Promise<number> {
    return pnp.sp.site.rootWeb.ensureUser(email).then(result => {
      return result.data.Id;
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }
}
