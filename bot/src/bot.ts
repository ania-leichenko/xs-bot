/* eslint-disable no-console */
import { Telegraf } from 'telegraf';
import Knex from 'knex';
import 'isomorphic-fetch';
import { AbstractModel } from './data/models/abstract/abstract.model';
import {
  ENV,
  FOREX_SCREEN,
  CRYPTO_SCREEN,
  FAQ_SCREEN,
  PERSONAL_AREA_SCREEN,
  START_SCREEN,
  COPY_SIGNALS_SCREEN,
  PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX,
  PAYMENT_BY_SCRILL_SCREEN_OF_FOREX,
  PAYMENT_BY_SWIFT_SCREEN_OF_FOREX,
  PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX,
  CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX,
  CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_FOREX,
  CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_FOREX,
  CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX,
  PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO,
  PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO,
  PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO,
  PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO,
  CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO,
  CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO,
  CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO,
  CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO,
  PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS,
  PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS,
  PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS,
  PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
  CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS,
  CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS,
  CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS,
  CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
} from '~/common/enums/enums';
import { knexConfig } from '../knexfile';
import {
  botServ,
  ticket as ticketServ,
  channelMessage as channelMessageServ,
  botMessage as botMessageServ,
  user as userServ,
} from './services/services';

const token = ENV.TELEGRAM_TOKEN;
if (!token) {
  throw Error('Cannot find token');
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
AbstractModel.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

const bot = new Telegraf(token);

bot.start((ctx) => {
  botServ.startBot(ctx);
  botServ.startScreen(ctx);
});

bot.on('channel_post', async (ctx) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (ctx.channelPost.text) {
      const channel = await botServ.getChannel(ctx);
      const users = await ticketServ.getUserByChannelPlan(channel.plan);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const message = ctx.channelPost.text;
      const channelMessage = await channelMessageServ.create({
        channelId: ctx.channelPost.chat.id,
        messageId: ctx.channelPost.message_id,
        message,
      });
      for (const user of users) {
        try {
          const res = await bot.telegram.sendMessage(user.chatId, message);
          botMessageServ.create({
            chatId: user.chatId,
            messageId: res.message_id,
            channelMessageId: channelMessage.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } catch (e) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const user = await userServ.getUserById(e.on.payload.chat_id);
          console.log(`${user?.firstName} @${user?.username}  blocked bot`);
        }
      }
      console.log('Done: ', users.length);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (ctx.update.channel_post.photo) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const photos = ctx.update.channel_post.photo.slice(-1);
      const channel = await botServ.getChannel(ctx);
      const users = await ticketServ.getUserByChannelPlan(channel.plan);
      for (const user of users) {
        for (const photo of photos) {
          try {
            bot.telegram.sendPhoto(user.chatId, photo.file_id);
          } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const user = await userServ.getUserById(e.on.payload.chat_id);
            console.log(`${user?.firstName} @${user?.username}  blocked bot`);
          }
        }
      }
      console.log('Done: ', users.length);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (ctx.update.channel_post.video) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const video = ctx.update.channel_post.video.file_id;
      const channel = await botServ.getChannel(ctx);
      const users = await ticketServ.getUserByChannelPlan(channel.plan);
      for (const user of users) {
        try {
          bot.telegram.sendVideo(user.chatId, video);
        } catch (e) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const user = await userServ.getUserById(e.on.payload.chat_id);
          console.log(`${user?.firstName} @${user?.username}  blocked bot`);
        }
      }
      console.log('Done: ', users.length);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (ctx.update.channel_post.document) {
      const channel = await botServ.getChannel(ctx);
      const users = await ticketServ.getUserByChannelPlan(channel.plan);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const document = ctx.update.channel_post.document.file_id;
      for (const user of users) {
        try {
          bot.telegram.sendDocument(user.chatId, document);
        } catch (e) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const user = await userServ.getUserById(e.on.payload.chat_id);
          console.log(`${user?.firstName} @${user?.username}  blocked bot`);
        }
      }
      console.log('Done: ', users.length);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (ctx.update.channel_post.sticker) {
      const channel = await botServ.getChannel(ctx);
      const users = await ticketServ.getUserByChannelPlan(channel.plan);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const sticker = ctx.update.channel_post.sticker.file_id;
      for (const user of users) {
        try {
          bot.telegram.sendSticker(user.chatId, sticker);
        } catch (e) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const user = await userServ.getUserById(e.on.payload.chat_id);
          console.log(`${user?.firstName} @${user?.username}  blocked bot`);
        }
      }
      console.log('Done: ', users.length);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (ctx.update.channel_post.voice) {
      const channel = await botServ.getChannel(ctx);
      const users = await ticketServ.getUserByChannelPlan(channel.plan);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const voice = ctx.update.channel_post.voice.file_id;
      for (const user of users) {
        try {
          bot.telegram.sendVoice(user.chatId, voice);
        } catch (e) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const user = await userServ.getUserById(e.on.payload.chat_id);
          console.log(`${user?.firstName} @${user?.username}  blocked bot`);
        }
      }
      console.log('Done: ', users.length);
    }
  } catch (e) {
    console.log(e);
  }
});

bot.on('edited_channel_post', async (ctx) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!ctx.editedChannelPost.text) {
      return;
    }
    await channelMessageServ.update({
      messageId: ctx.editedChannelPost.message_id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message: ctx.editedChannelPost.text,
      updatedAt: new Date(),
    });
    const channelMessage = await channelMessageServ.getByChannelMessageId({
      messageId: ctx.editedChannelPost.message_id,
      channelId: ctx.editedChannelPost.chat.id,
    });
    if (!channelMessage) {
      return;
    }
    const botMessages = await botMessageServ.getByMessageId(channelMessage.id);

    botMessages.map((message) => {
      bot.telegram.editMessageText(
        message.chatId,
        message.messageId,
        undefined,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ctx.editedChannelPost.text,
      );
    });
  } catch (e) {
    console.log(e);
  }
});

bot.action(FOREX_SCREEN, async (ctx) => {
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }

  const ticket = await ticketServ.getTicketByStatus({
    chatId: ctx.chat.id,
    plan: 'Forex',
    status: 'Pending',
  });

  if (ticket) {
    botServ.popUpScreen(ctx);
  } else {
    botServ.forexScreen(ctx);
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CRYPTO_SCREEN, async (ctx) => {
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }

  const ticket = await ticketServ.getTicketByStatus({
    chatId: ctx.chat.id,
    plan: 'Crypto',
    status: 'Pending',
  });

  if (ticket) {
    botServ.popUpScreen(ctx);
  } else {
    botServ.cryptoScreen(ctx);
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(COPY_SIGNALS_SCREEN, async (ctx) => {
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }

  const ticket = await ticketServ.getTicketByStatus({
    chatId: ctx.chat.id,
    plan: 'CopySignals',
    status: 'Pending',
  });

  if (ticket) {
    botServ.popUpScreen(ctx);
  } else {
    botServ.copySignalsScreen(ctx);
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(FAQ_SCREEN, async (ctx) => {
  botServ.faqScreen(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PERSONAL_AREA_SCREEN, async (ctx) => {
  botServ.personalAreaScreen(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(START_SCREEN, async (ctx) => {
  botServ.mainScreen(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX, async (ctx) => {
  botServ.paymentByCryptoScreenOfForex(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PAYMENT_BY_SCRILL_SCREEN_OF_FOREX, async (ctx) => {
  botServ.paymentByScrillScreenOfForex(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PAYMENT_BY_SWIFT_SCREEN_OF_FOREX, async (ctx) => {
  botServ.paymentBySwiftScreenOfForex(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX, async (ctx) => {
  botServ.paymentByBankCardScreenOfForex(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX, async (ctx) => {
  botServ.confirmPaymentByCryptoScreenOfForex(ctx);
  botServ.createTicket(ctx, {
    plan: 'Forex',
    paymentMethod: 'Crypto',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_FOREX, async (ctx) => {
  botServ.confirmPaymentByScrillScreenOfForex(ctx);
  botServ.createTicket(ctx, {
    plan: 'Forex',
    paymentMethod: 'Scrill',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_FOREX, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfForex(ctx);
  botServ.createTicket(ctx, {
    plan: 'Forex',
    paymentMethod: 'SWIFT',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX, async (ctx) => {
  botServ.confirmPaymentByBankCardScreenOfForex(ctx);
  botServ.createTicket(ctx, {
    plan: 'Forex',
    paymentMethod: 'BankCard',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});
bot.action(PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.paymentByCryptoScreenOfCrypto(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.paymentByScrillScreenOfCrypto(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.paymentBySwiftScreenOfCrypto(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.paymentByBankCardScreenOfCrypto(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.confirmPaymentByCryptoScreenOfCrypto(ctx);
  botServ.createTicket(ctx, {
    plan: 'Crypto',
    paymentMethod: 'Crypto',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.confirmPaymentByScrillScreenOfCrypto(ctx);
  botServ.createTicket(ctx, {
    plan: 'Crypto',
    paymentMethod: 'Scrill',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfCrypto(ctx);
  botServ.createTicket(ctx, {
    plan: 'Crypto',
    paymentMethod: 'SWIFT',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.confirmPaymentByBankCardScreenOfCrypto(ctx);
  botServ.createTicket(ctx, {
    plan: 'Crypto',
    paymentMethod: 'BankCard',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.paymentByCryptoOfCopySignals(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.paymentByScrillOfCopySignals(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.paymentBySwiftOfCopySignals(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.paymentByBankCardOfCopySignals(ctx);
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.confirmPaymentByCryptoScreenOfCopySignals(ctx);
  botServ.createTicket(ctx, {
    plan: 'CopySignals',
    paymentMethod: 'Crypto',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.confirmPaymentByScillScreenOfCopySignals(ctx);
  botServ.createTicket(ctx, {
    plan: 'CopySignals',
    paymentMethod: 'Scrill',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfCopySignals(ctx);
  botServ.createTicket(ctx, {
    plan: 'CopySignals',
    paymentMethod: 'SWIFT',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

bot.action(CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfCopySignals(ctx);
  botServ.createTicket(ctx, {
    plan: 'CopySignals',
    paymentMethod: 'BankCard',
    status: 'Pending',
  });
  if (!ctx.chat) {
    return 'ctx.chat is undefined';
  }
  userServ.updateLastAction(ctx.chat.id);
});

console.log('Bot started');

bot.launch();
