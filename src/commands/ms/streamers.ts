import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';
const axios = require('axios');

class Streamers extends AppCommand {
  code = 'streamers'; // 只是用作标记
  trigger = 'streamers'; // 用于触发的文字
  help = '`查询所有MS主播的直播间链接`'; // 帮助文字
  intro = '复读你所说的文字, 并用kmarkdown格式返回。';
  func: AppFunc<BaseSession> = async (session) => {
    const card = await constructCard(streamersList);
    return session.sendCard(card);
  };
}

export const streamers = new Streamers();

// {roomNumber : isDouyu}
const streamersList = {
  '5684726': true, // 皮特174
  '1667826': true, // 一口三明治3Mz
  '10722927': true, // Roieee百弟DF
  '6490082': true, // Jackyar
  '11123690': true, // 波靈BoLin
  '26161543': false, // QQ
}

interface LiveData {
  streamerName: string,
  roomName: string,
  url: string,
  isStreaming: boolean,
  avatar: string,
  roomThumb: string,
}

const getDouyuLiveData = async (roomNumber: string) => {
  const response = await axios.get(`http://open.douyucdn.cn/api/RoomApi/room/${roomNumber}`)
  const data = response.data.data;
  const res: LiveData = { streamerName: data.owner_name, roomName: data.room_name, url: `https://www.douyu.com/${roomNumber}`, isStreaming: data.online !== 0, avatar: data.avatar, roomThumb: data.room_thumb }
  return res
}

// hard coding
const getBiliBiliLiveData = async (roomNumber: string) => {
  const response = await axios.get(`http://api.live.bilibili.com/room/v1/Room/get_info?room_id=${roomNumber}`)
  const data = response.data.data;
  // Bilibili has 2 for broadcasting recording
  const isStreaming = data.live_status !== 0 ? true : false;
  const res: LiveData = { streamerName: 'QQ', roomName: data.title, url: `https://live.bilibili.com/${roomNumber}`, isStreaming: isStreaming, avatar: 'https://i1.hdslb.com/bfs/face/ac2c6d3112c9e97db9459ed89019c09b9b1bf431.jpg', roomThumb: data.user_cover }
  return res
}

const buildStreamersCardSection = async (streamerRoomNumber: string, isDouyuStreamer = true) => {
  const res = isDouyuStreamer ? await getDouyuLiveData(streamerRoomNumber) : await getBiliBiliLiveData(streamerRoomNumber);
  const streamingText = res.isStreaming ? "*直播中*" : "";

  const regularCard = `{
    "type": "section",
    "text": {
      "type": "kmarkdown",
      "content": "[${res.streamerName}](${res.url})  ${streamingText}"
    },
    "mode": "left",
    "accessory": {
      "type": "image",
      "src": "${res.avatar}",
      "size": "lg"
    }
  }`

  let liveCard = '';
  if (res.isStreaming) {
    // 有承接的逗号，结尾没有逗号
    liveCard = `,{
      "type": "section",
      "text": {
        "type": "kmarkdown",
        "content": "${res.roomName}"
      }
    },
    {
      "type": "container",
      "elements": [
        {
          "type": "image",
          "src": "${res.roomThumb}"
        }
      ]
    }`
  }

  return { cardText: regularCard + liveCard, isStreaming: res.isStreaming };

}


const constructCard = async (streamersList: Object) => {

  let card = `[
    {
      "type": "card",
      "theme": "secondary",
      "size": "lg",
      "modules": [
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": " MS 主播一览"
          }
        },
        {
          "type": "divider"
        },`

  let laterPartCard = '';
  const cardTail = `]}]`
  for (const [roomNumber, isDouyu] of Object.entries(streamersList)) {
    const res = await buildStreamersCardSection(roomNumber, isDouyu);
    if (res.isStreaming) {
      card += res.cardText;
      card += ','
    } else {
      laterPartCard += res.cardText;
      laterPartCard += ','
    }
  }

  laterPartCard = laterPartCard.slice(0, -1);

  return card + laterPartCard + cardTail;
}