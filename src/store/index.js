import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    website_name: '馨趋势',//网站名称
    token: '',
    userInfo: null, //用户信息
    hxInfo: null, //环信用户信息
    msgList: [],//会话列表
    unReadMessageNum: 0,//未读消息总数
    chatTypes: {
      IMAGE: "img",
      TEXT: "txt",
      LOCATION: "location",
      VIDEO: "video",
      AUDIO: "audio",
      EMOJI: "emoji",
      FILE: "chat"
    },//消息类型
    chatId: '',//当前聊天的会话id
    chatType: 0,//1单聊 2群聊
  },
  // 辅助函数 改变state里面的状态
  mutations: {
    //存入用户信息
    setInfo(state,data) {
      if(data.type===1) { //token
        state.token = data.data
        localStorage.setItem('xwg',data.data)
      }else if(data.type===2) { //userInfo
        state.userInfo = data.data
        localStorage.setItem('xwgInfo',JSON.stringify(data.data))
      }
    },
    //退出登录
    logout(state) {
      state.token = '';state.userInfo = null;state.hxInfo = null;
      localStorage.removeItem('xwg')
      localStorage.removeItem('xwgInfo')
    },
    //设置未读数
    setUnread(state,num) {
      state.unReadMessageNum = num
    },
    //设置会话列表
    setMsgList(state,list) {
      state.msgList = list
    },
    //选择会话
    setChat(state,item) {
      state.chatId = item.id
      state.chatType = item.type
    },
  },
  // action 提交 mutation 从而改变state里面的状态
  actions: {
    async getMsgList({state, commit, dispatch}) { //获取消息列表
      let that = this
      let arr = [] //处理后的回话列表集合
      let uid = state.userInfo.id
      let length = '1107220818110238#chuangyou_'.length  //截取字符串的长度
      let res = await WebIM.conn.getConversationlist()
      //获取所有的回话列表
      let list = res.data.channel_infos //获取到的会话列表
      list.forEach((value,index) => {
        console.log(value.lastMessage);
        let obj = {
          unread: value.unread_num, //未读数
          msg_type: value.lastMessage.type, //消息类型
          time: value.lastMessage.time, //消息时间
        }
        //设置聊天内容
        obj.msg = obj.msg_type=='txt'?value.lastMessage.msg:value.lastMessage.url
        if(value.channel_id.indexOf('@conference.easemob.com')>=0) { //群聊
          obj['type'] = 2
          obj['id'] = value.channel_id.substring(length,value.channel_id.indexOf('@conference.easemob.com')) //群聊id
        }else if(value.channel_id.indexOf('@easemob.com')>=0) { //单聊
          obj['type'] = 1
          obj['id'] = value.channel_id.substring(length,value.channel_id.indexOf('@easemob.com')) //私聊id
          //用户头像和昵称
          try{
            if(uid!=value.lastMessage.ext.myInfo.id) {
              obj['name'] = value.lastMessage.ext.myInfo.username || ''
              obj['avatar'] = value.lastMessage.ext.myInfo.avatar || ''
            }else {
              obj['name'] = value.lastMessage.ext.herInfo.username || ''
              obj['avatar'] = value.lastMessage.ext.herInfo.avatar || ''
            }
          }catch{

          }
        }
        arr.push(obj)
      })
      //群聊处理
      let groupIds = []
      for(let item of arr) {
        if(item.type==2) groupIds.push(item.id)
      }
      let groups = await WebIM.conn.getGroup({limit: 999,});
      if(groupIds.length>0) { //获取群聊信息
        let options = {
          groupId: groupIds.join(',')    // 群组id
        };
        WebIM.conn.getGroupInfo(options).then((group) => {
          arr.forEach((value,index) => {
            for(let item of group.data) {
              if(value.id === item.id) {
                value['name'] = item.name
                value['avatar'] = item.description
              }else {

              }
            }
          })
          dispatch('getUnRead',arr)
        }).catch(err => {
          dispatch('getUnRead',arr)
        })
      }else {
        dispatch('getUnRead',arr)
      }
    },
    clearRead({state, commit, dispatch},args) { //清空未读数
      for(let item of state.msgList) {
        if(item.type==args.type && item.id==args.id) {
          item.unread = 0
        }
      }
      dispatch('getUnRead',state.msgList)
    },
    getUnRead({state, commit, dispatch},list) { //获取未读数  储存消息
      let uid = state.userInfo.id
      let num = 0
      for(let item of list) {num = num + item.unread}
      commit('setUnread',num)
      commit('setMsgList',list)
      let data = {
        id: uid,
        list: list
      }
      localStorage.setItem('msgList',JSON.stringify(data))
      //设置tabbar未读数
      // uni.$emit('updateList',list)
    },
    handleMessage({state, commit, dispatch},message) { //消息处理
      let list = state.msgList
      let uid = state.userInfo.id
      let obj = {
        time: message.time, //时间
        msg_type: state.chatTypes[message.contentsType],//消息类型
        type: message.type==='chat'?1:2,//1单聊 2群聊
      }
      //设置对话id
      obj.id = obj.type==1?message.from:message.to
      //设置聊天内容
      obj.msg = obj.msg_type=='txt'?message.data:message.url
      //判断会话列表中有没有该会话，有修改，没有获取
      let index = list.findIndex(value => {
        return value.type == obj.type && value.id == obj.id
      })
      console.error(index);
      if(index>=0) { //修改消息
        console.error(message.fromuser);
        list[index] = Object.assign(list[index],obj)
        //单聊不是自己发的时候未读数+1
        if(obj.type==1 && message.fromuser!=state.userInfo.id) {
          list[index].unread++
        }
        // 群聊不是自己发的时候未读数+1
        if(obj.type==2 && message.fromuser!=state.userInfo.id) {
          list[index].unread++
        }
        list.unshift(list.splice(index, 1)[0])
        dispatch('getUnRead',list)
      }else { //没有消息，重新获取
        dispatch('getMsgList')
      }
    },
  },
  modules: {}
})
