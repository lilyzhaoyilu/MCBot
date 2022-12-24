import { AppCommand, AppFunc, BaseSession } from 'kbotify';

class Streamers extends AppCommand {
  code = 'streamers'; // 只是用作标记
  trigger = 'streamers'; // 用于触发的文字
  help = '`查询所有MS主播的直播间链接`'; // 帮助文字
  intro = '复读你所说的文字, 并用kmarkdown格式返回。';
  func: AppFunc<BaseSession> = async (session) => {
    return session.sendCard(constructCard());
  };
}

export const streamers = new Streamers();


const constructCard = () => {
  return `[
        {
          "type": "card",
          "theme": "secondary",
          "size": "lg",
          "modules": [
            {
              "type": "header",
              "text": {
                "type": "plain-text",
                "content": "MS 主播直播间一览"
              }
            },
            {
              "type": "divider"
            },
            {
              "type": "section",
              "text": {
                "type": "kmarkdown",
                "content": "[皮特174的直播间](https://www.douyu.com/5684726)"
              },
              "mode": "left",
              "accessory": {
                "type": "image",
                "src": "https://apic.douyucdn.cn/upload/avatar_v3/202107/573dc76d4d7e4994b6b55e1df28d72b0_big.jpg",
                "size": "lg"
              }
            },
            {
              "type": "section",
              "text": {
                "type": "kmarkdown",
                "content": "[一口三明治3Mz的直播间](https://www.douyu.com/1667826)"
              },
              "mode": "left",
              "accessory": {
                "type": "image",
                "src": "https://apic.douyucdn.cn/upload/avatar_v3/202209/d5b9d408f15f44129094fe2c8d51e7ee_big.jpg",
                "size": "lg"
              }
            },
            {
              "type": "section",
              "text": {
                "type": "kmarkdown",
                "content": "[Roieee百弟DF的直播间](https://www.douyu.com/10722927)"
              },
              "mode": "left",
              "accessory": {
                "type": "image",
                "src": "https://apic.douyucdn.cn/upload/avatar_v3/202203/f08daf1b788643b791954ee6b5af50c7_big.jpg",
                "size": "lg"
              }
            },
            {
              "type": "section",
              "text": {
                "type": "kmarkdown",
                "content": "[Jackyar的直播间](https://www.douyu.com/6490082)"
              },
              "mode": "left",
              "accessory": {
                "type": "image",
                "src": "https://apic.douyucdn.cn/upload/avatar_v3/202107/e3170c90309547b5bb0bc38b8cae0a16_big.jpg",
                "size": "lg"
              }
            },
            {
              "type": "section",
              "text": {
                "type": "kmarkdown",
                "content": "[波靈BoLin的直播间](https://www.douyu.com/11123690)"
              },
              "mode": "left",
              "accessory": {
                "type": "image",
                "src": "https://apic.douyucdn.cn/upload/avatar_v3/202209/2886039f798749f8b08ac32306eb67ee_big.jpg",
                "size": "lg"
              }
            },{
              "type": "section",
              "text": {
                "type": "kmarkdown",
                "content": "[QQ的直播间](https://live.bilibili.com/26161543)"
              },
              "mode": "left",
              "accessory": {
                "type": "image",
                "src": "https://i1.hdslb.com/bfs/face/ac2c6d3112c9e97db9459ed89019c09b9b1bf431.jpg",
                "size": "lg"
              }
            }
          ]
        }
      ]`
}