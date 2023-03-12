import config from './WebIMConfig'; //环信配置
import websdk from "easemob-websdk";
import _ from 'lodash';
import { MessageBox } from 'element-ui'; //element ui提示
import store from '../store'
function ack(receiveMsg){
	var bodyId = receiveMsg.id; // 需要发送已读回执的消息id
	var msg = new WebIM.message('read', WebIM.conn.getUniqueId());
	ackMsg.set({
		id: bodyId,
		to: receiveMsg.from
	});
	WebIM.conn.send(msg.body);
}
//判断消息错误
function onMessageError(err) {
	if (err.type === "error") {
		MessageBox.alert(res.msg,{type: 'error'})
		return false;
	}
	return true;
}
const rtc = {
	// 用来放置本地客户端。
	client: null,
	// 用来放置本地音视频频轨道对象。
	localAudioTrack: null,
	localVideoTrack: null,
};
//消息类型转换
const chatTypes = {
	IMAGE: "img",
	TEXT: "txt",
	LOCATION: "location",
	VIDEO: "video",
	AUDIO: "audio",
	EMOJI: "emoji",
	FILE: "chat"
}
// 初始化IM SDK
let WebIM = {};
WebIM = window.WebIM = websdk;
WebIM.config = config;
WebIM.conn = new WebIM.connection({
	isReport: false,
	appKey: WebIM.config.appkey,
	isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
	https: WebIM.config.https,
	apiURL: WebIM.config.apiURL, //环信请求地址
	isAutoLogin: true,
	// heartBeatWait: WebIM.config.heartBeatWait,
	autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	autoReconnectInterval: WebIM.config.autoReconnectInterval,
	isStropheLog: WebIM.config.isStropheLog,
	delivery: WebIM.config.delivery,
	// 公有云 isHttpDNS 默认配置为true
	isHttpDNS: WebIM.config.isHttpDNS,
	useOwnUploadFun: true,//使用自己的url
});

// 注册监听回调
WebIM.conn.listen({
	onOpened() {
		console.error('环信链接成功')
		store.dispatch('getMsgList') //获取会话记录
	},//链接成功
	onReconnect() {
		console.error('环信重连')
	}, //重连回调
	onSocketConnected() {
		console.log('环信链接socket');
	}, //socket连接成功回调 版本新增，傻逼文档没有
	onClosed() {
		console.error('断开连接');
		WebIM.conn.close();
	}, // 链接关闭回调
	onInviteMessage(message) {

	}, //收到群组邀请回调
	onReadMessage(message) {
		// console.log('已读', message)
	}, //对方已读消息回调
	onContactInvited(msg) {
		console.log('收到好友邀请', msg)
	}, // 收到好友邀请
	onContactDeleted(msg) {
		console.log('被删除时回调此方法', msg)
	}, // 被删除时回调此方法
	onContactAdded(msg) {
		console.log('增加了联系人时回调此方法', msg)
	}, // 增加了联系人时回调此方法
	onContactRefuse(msg) {
		console.log('好友请求被拒绝', msg)
	}, // 好友请求被拒绝
	onContactAgreed(msg) {
		console.log('好友请求被同意', msg)
	}, // 好友请求被同意
	onPresence(message) {

	}, //群聊处理\
	onRoster(message) {
		console.log('收到好友邀请',message)
	}, //收到好友邀请
	onVideoMessage(message) {
		console.log("收到视频消息: ", message);
		if(message) {
			ack(message);
		}
	}, //收到视频消息
	onAudioMessage(message) {
		if (message) {
			ack(message);
		}
	}, //收到音频消息
	onCmdMessage(message) {
		console.log("收到命令消息", message);
	}, //收到命令消息
	onLocationMessage(message){
		console.log("收到位置消息", message);
	},//收到位置消息
	onTextMessage(message) {
		console.log("收到文本消息", message);
		if (message) {
			store.dispatch('handleMessage',message) //处理消息
			// uni.$emit('onMessageGet',{})
			if(message.type==='groupchat') { //群聊消息
				eventBus.$emit('onGroupTextMessage',message)
			}else { //单聊消息
				eventBus.$emit('onTextMessage',message)
			}
			ack(message);
		}
	}, //收到文本消息
	onCustomMessage(message) {
		console.log('收到透传消息',message);
	},  //收到透传消息
	onEmojiMessage(message) {
		console.log("收到表情消息", message);
		if (message) {
			ack(message);
		}
	}, //收到表情消息
	onPictureMessage(message) {
		console.log("收到图片消息", message);
		if (message) {
			store.dispatch('handleMessage',message) //处理消息
			if(message.type==='groupchat') { //群聊图片
				eventBus.$emit('onGroupPictureMessage',message)
			}else { //单聊图片
				eventBus.$emit('onPictureMessage',message)
			}
			ack(message);
		}
	}, //收到图片消息
	onFileMessage(message) {
		console.log("收到文件消息", message);
		if (message) {
			ack(message);
		}
	}, //收到文件消息
	onError(error) { //失败回调
		console.log(error);
		 if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
			 console.log('连接断开');
			 return;
    }
	  if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
			 console.log('异地登录或者多次登录');
			 return;
    }
		if (error.type == WebIM.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
			console.log('用户名或密码错误');
			return;
		}
		if (error.type == WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
			// uni.hideLoading();
			// disp.fire("em.error.tokenErr");
		}
		if (error.type == "socket_error") {
			console.log('网络已断开');
			MessageBox({
				message: '网络已断开',
				type: 'error'
			})
			return;
		}
	},
});

export default WebIM;
