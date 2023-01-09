import { bot } from 'init/client';
const TARGET_MESSAGE_IDS = ['2a244237-2b9e-44d8-8e6c-ba33a028e7bf']

export const TEST_SERVER_EMOJI_ROLE = new Map<string, string>([
  ['1613997086764422/xTRDfj84Sb09u09o', '8902146'], //pink
  ['1613997086764422/ys24gJDv3I07406x', '8902147'], //blue
  ['1613997086764422/hxjMGadvIy03z03w', '8902151'] //green
])
const TEST_SERVER_MANAGING_ROLES = ['8902146', '8902147', '8902151'];

// emoji_id, role_id
export const MS_SERVER_EMOJI_ROLE = new Map<string, string>([
  ['1898439040142357/7L0yo8VETj07e07e', '8902628'], //深蓝色
  ['1898439040142357/xf9Fow6wF308c08c', '8902133'], //嫩绿色
  ['1898439040142357/pEGYVvX7PN0cx0ch', '8902621'], //浅蓝色
  ['1898439040142357/wAUZ33qiv90cd0cd', '8902623'], //深粉色
  ['1898439040142357/oBrKeZSNJK0bl0bl', '8902625'], //深紫色
  ['1898439040142357/jUrJ2YmFQb08d08d', '8902132'], //粉色
  ['1898439040142357/DOu7DNtySj0a80a8', '8902624'], //浅紫色
  ['1898439040142357/lWsDdOtmH808c08c', '8902626'], //浅青蓝
  ['1898439040142357/0WFiV3MXEi0b50b5', '8902087'], //深绿色
])

const MS_SERVER_MANAGING_ROLES = [
  '8902628',
  '8902133',
  '8902621',
  '8902623',
  '8902625',
  '8902132',
  '8902624',
  '8902626',
  '8902087']


export const actionFilter = async (message: any, env: string = "test") => {
  if (!message.extra?.body?.msg_id || !TARGET_MESSAGE_IDS.includes(message.extra?.body?.msg_id)) {
    return;
  }

  const user_id = message.extra?.body?.user_id;
  const emoji_id: string = message.extra?.body?.emoji?.id.toString();
  const emoji_name: string = message.extra?.body?.emoji?.name.toString();
  const guild_id = message.target_id;
  let role_id: string | undefined = undefined;

  if (env === "test") {
    role_id = TEST_SERVER_EMOJI_ROLE.get(emoji_name)
  } else if (env === "prod") {
    role_id = MS_SERVER_EMOJI_ROLE.get(emoji_id);
  }

  if (role_id === undefined) return;

  // add_reaction
  if (message.extra?.type === 'added_reaction') {
    addRole(guild_id, user_id, role_id, env);
    // add dedup logic
  } else if (message.extra?.type === 'deleted_reaction') {
    deleteRole(guild_id, user_id, role_id);
    // add try delete
  }
}

const addRole = async (guild_id: string, user_id: string, role_id: string | number, env: string = "test") => {
  try {
    const res = await bot.API.guildRole.grant(guild_id, user_id, role_id);
    // dedup
    if (res.roles.length > 1) {
      for (const role of res.roles) {
        if (role == role_id) continue;

        if (env === "test" && TEST_SERVER_MANAGING_ROLES.includes(role.toString())) {
          deleteRole(guild_id, user_id, role)
        }

        if (env === "prod" && MS_SERVER_MANAGING_ROLES.includes(role.toString())) {
          deleteRole(guild_id, user_id, role)
        }
      }
    }
  } catch (err) {
    bot.API.message.create(9, '5909546423817383', `guild: ${guild_id}, user: ${user_id}, role: ${role_id}. Add error: ${err}`);
  }
}

const deleteRole = async (guild_id: string, user_id: string, role_id: string | number) => {
  try {
    const res = await bot.API.guildRole.revoke(guild_id, user_id, role_id);
  } catch (err) {
    bot.API.message.create(9, '5909546423817383', `guild: ${guild_id}, user: ${user_id}, role: ${role_id}. Delete error: ${err}`);
  }
}

