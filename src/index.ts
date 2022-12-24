import { bot } from 'init/client';
import { msMenu } from './commands/ms/ms_menu';
import { streamers } from './commands/ms/streamers';

bot.messageSource.on('message', (ms) => {
  console.log(ms);
});

bot.addCommands(msMenu);
bot.addAlias(streamers, "主播")

bot.connect();
console.log("bot has been initiated");