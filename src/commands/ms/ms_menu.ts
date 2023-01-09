import { Card, MenuCommand } from 'kbotify';
import { streamers } from './streamers';
import { colorTagsInit } from './color_tags_init';
import { colorTagsBuild } from './color_tags_build';

class MSMenu extends MenuCommand {
  code = 'ms';
  trigger = 'ms';
  help = '';
  intro = '菜单';
  menu = mainMenu;
  useCardMenu = true; // 使用卡片菜单
}


const mainMenu = `[
    {
      "type": "card",
      "theme": "secondary",
      "size": "lg",
      "modules": [
        {
          "type": "header",
          "text": {
            "type": "plain-text",
            "content": "MS Bot 指令菜单"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": "\`.ms streamers\` 或者 \`.主播\` 查看所有MS主播直播间"
          }
        }
      ]
    }
  ]`


export const msMenu = new MSMenu(streamers, colorTagsInit, colorTagsBuild);