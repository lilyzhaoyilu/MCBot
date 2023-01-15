import { bot } from 'init/client';
import { msMenu } from './commands/ms/ms_menu';
import { streamers } from './commands/ms/streamers';
import { actionFilter } from 'reaction_util';
import dotenv from "dotenv";

dotenv.config();

bot.messageSource.on('message', (ms: any) => {
  // 有在prod需要改的地方
  // console.log("corgi top: ", ms);
  actionFilter(ms, process.env.ENV);
});

bot.addCommands(msMenu);
bot.addAlias(streamers, "主播")

bot.connect();
console.log("bot has been initiated");