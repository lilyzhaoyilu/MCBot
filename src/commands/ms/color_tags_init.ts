import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';
const axios = require('axios');

class ColorTagsInit extends AppCommand {
  code = 'colortags'; // 只是用作标记
  trigger = 'colortagsinit'; // 用于触发的文字
  help = ''; // 帮助文字
  intro = '';
  func: AppFunc<BaseSession> = async (session) => {
    session.sendCard(constructCard());
  };
}

export const colorTagsInit = new ColorTagsInit();


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
            "content": "Mountain & Sea 颜色领取"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "(font)点击对应的回应领取颜色(font)[success] "
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "(font)一个人只能领一个角色(font)[purple]"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "(font)领取之后需要切换频道或者等一会才能看到(font)[warning]"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "(font)领取新的颜色会自动删除旧的颜色(font)[pink]"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "颜色建议和使用问题请@BigBosss或者@半夏"
          }
        }
      ]
    }
  ]`
}