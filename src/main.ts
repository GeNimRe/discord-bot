import { Intents } from 'discord.js';
import DiscordFactory from './common/core';
import { RatingMessage } from './event/messages/rating.message';
import { ValidMessage } from './event/messages/valid.message';
import { MESSAGE } from './event/messages/constant';

async function bootStrap() {
  const app = new DiscordFactory(
    [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.DIRECT_MESSAGES,
    ],
    ['MESSAGE', 'CHANNEL'],
  );

  await app.init();

  app.on('messageCreate', async (message) => {
    const content = message.content;
    const target = content.split(' ');

    switch (target[0]) {
      case '!레이팅':
        const validMessage = new ValidMessage(message);
        await validMessage.replyInputInValidMessage(
          content,
          async (username: string) => {
            await message.reply(MESSAGE.LOAD_RATING);

            const ratingMessage = new RatingMessage(message);
            await ratingMessage.replyDefaultRatingMessage(username);
          },
        );
    }
  });
}

bootStrap();
