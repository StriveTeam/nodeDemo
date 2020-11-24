import { JRTCClient } from '@jd/wyg-jrtc-test'
// import JRTCClient from "../JRTC/JRTCClient.ts";
let JWebrtc = null
class JRTC {
  constructor() {
    this.JRTCRoom = null
    this.JRTCMsg = null
    this.roomId = ''
    this.peerId = ''
    this.nickName = ''
    this.isSubscribe = true
    this.onMsgCallbacks = []
    this.msgs = []
    this.appId = ''
    this.appKey = ''
    this.roomType = 1
    this.JRTC = null
    this.isInit = false
  }
  isInit() {
    return this.isInit
  }
  async init(appId, appKey, userId, userName, nonce, timestamp, temporary, isMsg) {
    this.appId = appId
    this.appKey = appKey
    if (JWebrtc) return JWebrtc
    JWebrtc = await JRTCClient.init({
      appId,
      appKey,
      userId,
      userName,
      nonce,
      timestamp,
      temporary,
      isMsg
    })
    this.JRTCMsg = JWebrtc.JRTCMsg

    if (this.JRTCMsg) {
      this.broadcastMessageListener()
    }
    this.isInit = true
    return JWebrtc
  }

  getRoomInfo(roomId, peerId) {
    return JWebrtc.getRoomInfo(roomId, peerId)
  }
  createRoom(roomInfo) {
    return JWebrtc.createRoom(roomInfo)
  }
  async enterRoom({ roomId, peerId, nickName, subscribeType }) {
    const self = this
    return new Promise((resolve, reject) => {
      JWebrtc.enterRoom({ roomId, peerId, nickName, subscribeType })
        .then(res => {
          console.log('Join room successfully:', res)
          self.JRTCRoom = res
          self.roomId = roomId
          self.peerId = peerId
          self.nickName = nickName
          self.roomMessageListener()
          self.produceIceCandidates = res.produceIceCandidates
          resolve(self.JRTCRoom)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
  // 设置房间消息监听
  roomMessageListener() {
    const self = this
    JWebrtc.on('onError', err => {
      console.log('onError', err)
      if (err.errorCode === 11000) {
        // 重连成功，需要重新进入房间
        self.onMsgHandle(err.message, err.errorCode)
      }
      if (err.errorCode === 10012) {
        // 停止屏幕共享
        self.onMsgHandle(err.message, err.errorCode)
      }
    })

    // const onListens = [
    //   'onStats', 'NickNameUpdated', 'UserJoinedRoom', 'UserLeavedRoom', 'StreamPublished', 'StreamUnpublished', 'StreamSubscribed', 'StreamPaused', 'StreamResumed', 'MessageRecived', 'UserRemoved'
    // ]

    // onListens.forEach(item => {
    //   self.JRTCRoom.on(item, (data) => {
    //     console.log("item", data);
    //     switch (item) {
    //       case 'StreamPublished':
    //         let streamIds = data.map(streamInfo => streamInfo.streamId);
    //         if (self.isSubscribe) {
    //           self.JRTCRoom.subscribeStreams(streamIds);
    //         }
    //         break
    //       default:
    //         self.onMsgHandle(data, item);
    //     }
    //   });
    // })

    self.JRTCRoom.on('onStats', data => {
      // console.log("NickNameUpdated", data);
      self.onMsgHandle(data, 'onStats')
    })

    self.JRTCRoom.on('NickNameUpdated', data => {
      // console.log("NickNameUpdated", data);
      self.onMsgHandle(data, 'NickNameUpdated')
    })

    self.JRTCRoom.on('UserJoinedRoom', data => {
      // console.log("UserJoinedRoom", data);
      self.onMsgHandle(data, 'UserJoinedRoom')
    })
    self.JRTCRoom.on('UserLeavedRoom', data => {
      // console.log("UserLeavedRoom", data);
      self.onMsgHandle(data, 'UserLeavedRoom')
    })
    self.JRTCRoom.on('StreamPublished', streamInfos => {
      // console.log("StreamPublished", streamInfos);
      self.onMsgHandle(streamInfos, 'StreamPublished')
      // let streamIds = streamInfos.map(streamInfo => streamInfo.streamId);
      // if (self.isSubscribe) {
      //   self.JRTCRoom.subscribeStreams(streamIds);
      // }
    })
    self.JRTCRoom.on('StreamUnpublished', peerInfo => {
      // console.log("StreamUnpublished", peerInfo);
      self.onMsgHandle(peerInfo, 'StreamUnpublished')
    })
    self.JRTCRoom.on('StreamSubscribed', ({ peerInfo }) => {
      console.log('StreamSubscribed', peerInfo)
      self.onMsgHandle(peerInfo, 'StreamSubscribed')
    })
    self.JRTCRoom.on('StreamPaused', consumer => {
      // console.log("StreamPaused", consumer);
      self.onMsgHandle(consumer, 'StreamPaused')
    })
    self.JRTCRoom.on('StreamResumed', consumer => {
      // console.log("StreamResumed", consumer);
      self.onMsgHandle(consumer, 'StreamResumed')
    })
    self.JRTCRoom.on('MessageRecived', data => {
      self.onMsgHandle(data, 'MessageRecived')
    })
    self.JRTCRoom.on('FixedAudioTrack', data => {
      self.onMsgHandle(data, 'FixedAudioTrack')
    })
    /* 会控相关 */
    self.JRTCRoom.on('UserRemoved', data => {
      self.onMsgHandle(data, 'UserRemoved')
    })
    self.JRTCRoom.on('RoomAudioMuted', data => {
      self.onMsgHandle(data, 'RoomAudioMuted')
    })
    self.JRTCRoom.on('AudioMuted', data => {
      self.onMsgHandle(data, 'AudioMuted')
    })
    self.JRTCRoom.on('RoomVideoClosed', data => {
      self.onMsgHandle(data, 'RoomVideoClosed')
    })
    self.JRTCRoom.on('VideoClosed', data => {
      self.onMsgHandle(data, 'VideoClosed')
    })
    self.JRTCRoom.on('RoomChatForbidden', data => {
      self.onMsgHandle(data, 'RoomChatForbidden')
    })
    self.JRTCRoom.on('RoomChatUnForbidden', data => {
      self.onMsgHandle(data, 'RoomChatUnForbidden')
    })
    self.JRTCRoom.on('RoomSignalCustom', data => {
      self.onMsgHandle(data, 'RoomSignalCustom')
    })
    self.JRTCRoom.on('signalCustom', data => {
      self.onMsgHandle(data, 'signalCustom')
    })
  }

  // 消息大厅下消息监听
  broadcastMessageListener() {
    const self = this
    self.JRTCMsg.on('BroadcastMessageRecived', data => {
      self.onMsgHandle(data, 'BroadcastMessageRecived')
    })
    self.JRTCMsg.on('BroadcastMessageToPeerRecived', data => {
      self.onMsgHandle(data, 'BroadcastMessageToPeerRecived')
    })
    self.JRTCMsg.on('onError', err => {
      console.log(err)
    })
  }

  async getScreenTrack() {
    return new Promise(async (resolve, reject) => {
      JWebrtc.getScreenTrack()
        .then(track => {
          resolve(track)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  operateScreen(track) {
    const self = this
    return new Promise((resolve, reject) => {
      self.JRTCRoom.publishVideoStream(track).then(({ track, streamId }) => {
        resolve({ track, streamId })
      })
    })
  }

  publishVideoStream() {
    const self = this
    return new Promise((resolve, reject) => {
      JWebrtc.getVideoTrack()
        .then(track => {
          self.JRTCRoom.publishVideoStream(track).then(({ track, streamId }) => {
            resolve({ track, streamId })
          })
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

  publishAudioStream() {
    const self = this
    return new Promise((resolve, reject) => {
      JWebrtc.getAudioTrack()
        .then(track => {
          self.JRTCRoom.publishAudioStream(track).then(({ track, streamId }) => {
            resolve({ track, streamId })
          })
        })
        .catch(reason => {
          console.log('getAudioTrack-err', reason)
        })
    })
  }

  async unPublishStream(streamId) {
    const self = this
    await self.JRTCRoom.unPublishStream(streamId)
  }

  subscribeStreams(streamIds) {
    const self = this
    self.JRTCRoom.subscribeStreams(streamIds)
  }

  unSubscribeStreams(streamIds) {
    const self = this
    self.JRTCRoom.unSubscribeStreams(streamIds)
  }

  pausePublish(streamId) {
    const self = this
    self.JRTCRoom.pausePublish(streamId)
  }

  resumePublish(streamId) {
    const self = this
    self.JRTCRoom.resumePublish(streamId)
  }

  pauseSubscribe(streamId) {
    const self = this
    self.JRTCRoom.pauseSubscribe(streamId)
  }

  resumeSubscribe(streamId) {
    const self = this
    self.JRTCRoom.resumeSubscribe(streamId)
  }

  setVideoEncodingParam(resolution, fps) {
    JWebrtc.setVideoEncodingParam(resolution, fps)
  }

  setAudioStereo(val) {
    JWebrtc.setAudioCodecOptions(val)
  }

  changeNickName(nickName) {
    const self = this
    self.JRTCRoom.changeNickName(nickName)
  }

  sendMsg(msg, peerId) {
    const self = this
    self.JRTCRoom.sendMessage(msg, peerId)
  }

  sengBroadcastMessage(msg, peerId) {
    const self = this
    self.JRTCMsg.sendMessage(msg, peerId)
  }

  destroy() {
    const self = this
    JWebrtc.exitRoom().then(() => {
      console.log('退出房间成功')
      JWebrtc.disconnectAll()
      self.clearMsg()
      JWebrtc = null
    })
  }

  onMsgHandle(message, type) {
    let self = this
    self.msgs.push({ message, type })
    self.onMsgCallbacks.forEach(f => {
      f(message, type)
    })
  }
  onMsg(callback) {
    const self = this
    self.onMsgCallbacks.push(callback)
    if (self.msgs.length) {
      self.msgs.forEach(item => {
        callback(item.msg, item.type)
      })
    }
  }
  clearMsg() {
    const self = this
    self.onMsgCallbacks = []
    self.msgs = []
  }

  getStats(isStat, intervalSec) {
    const self = this
    self.JRTCRoom.enableStreamStat(isStat, intervalSec)
  }

  // 大房间情况下获取consumerList
  async getFixedAudioConsumers() {
    const self = this
    const fixedAudioConsumerList = await self.JRTCRoom.getFixedAudioConsumers().catch(err => {
      console.log(err)
    })
    if (!fixedAudioConsumerList || fixedAudioConsumerList.length < 1) {
      return
    }
    self.JRTCRoom.subscribeStreams(fixedAudioConsumerList.map(item => item.streamId))
    return fixedAudioConsumerList
  }

  /* 会控相关 */
  removePeer(targetPeerId, appData = {}) {
    const self = this
    self.JRTCRoom.removePeer(targetPeerId, appData)
  }
  muteAudio(targetPeerId, appData = {}) {
    const self = this
    self.JRTCRoom.muteAudio(targetPeerId, (appData = {}))
  }
  closeVideo(targetPeerId, appData = {}) {
    const self = this
    self.JRTCRoom.closeVideo(targetPeerId, (appData = {}))
  }
  forbidChat() {
    const self = this
    self.JRTCRoom.forbidChat()
  }
  unForbidChat() {
    const self = this
    self.JRTCRoom.unForbidChat()
  }
  customSignal({ eventName, targetPeerId, appData }) {
    const self = this
    self.JRTCRoom.customSignal({ eventName, appData })
  }
}
export default new JRTC()
