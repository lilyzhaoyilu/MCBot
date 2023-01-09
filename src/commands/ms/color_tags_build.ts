import { Card, AppCommand, AppFunc, BaseSession } from 'kbotify';
import { bot } from 'init/client';
const axios = require('axios');
import { TEST_SERVER_EMOJI_ROLE, MS_SERVER_EMOJI_ROLE } from '../../reaction_util';

class ColorTagsBuild extends AppCommand {
  code = 'colortags'; // 只是用作标记
  trigger = 'colortagsbuild'; // 用于触发的文字
  help = ''; // 帮助文字
  intro = '';
  func: AppFunc<BaseSession> = async (session) => {
    if (session.args.length != 1) {
      return session.quote('输入的指令有误。需要加上 message id');
    }

    const message_id = session.args[0];

    for (const emoji_id of TEST_SERVER_EMOJI_ROLE.keys()) {
      console.log("emoji ids: ", emoji_id);
      try {
        await session.client.API.message.addReaction(message_id, emoji_id);
      } catch (err) {
        bot.API.message.create(9, '5909546423817383', `color tags build error: ${err}`);
      }
    }

  };
}

export const colorTagsBuild = new ColorTagsBuild();

// 有在prod需要改的地方