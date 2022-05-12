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
} from './services/services';

const token = '5245583761:AAGViUQUROPfgNNSNLLRXK4_GPQ9nUZ3nVw';
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
        const res = await bot.telegram.sendMessage(user.chatId, message);
        botMessageServ.create({
          chatId: user.chatId,
          messageId: res.message_id,
          channelMessageId: channelMessage.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      console.log('Message: ', users.length);
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
          bot.telegram.sendPhoto(user.chatId, photo.file_id);
        }
      }
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
        bot.telegram.sendVideo(user.chatId, video);
      }
      console.log('Message: ', users.length);
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
        bot.telegram.sendDocument(user.chatId, document);
      }
      console.log('Message: ', users.length);
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
        bot.telegram.sendSticker(user.chatId, sticker);
      }
      console.log('Message: ', users.length);
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
        bot.telegram.sendVoice(user.chatId, voice);
      }
      console.log('Message: ', users.length);
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
});

bot.action(FAQ_SCREEN, async (ctx) => {
  botServ.faqScreen(ctx);
});

bot.action(PERSONAL_AREA_SCREEN, async (ctx) => {
  botServ.personalAreaScreen(ctx);
});

bot.action(START_SCREEN, async (ctx) => {
  botServ.mainScreen(ctx);
});

bot.action(PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX, async (ctx) => {
  botServ.paymentByCryptoScreenOfForex(ctx);
});

bot.action(PAYMENT_BY_SCRILL_SCREEN_OF_FOREX, async (ctx) => {
  botServ.paymentByScrillScreenOfForex(ctx);
});

bot.action(PAYMENT_BY_SWIFT_SCREEN_OF_FOREX, async (ctx) => {
  botServ.paymentBySwiftScreenOfForex(ctx);
});

bot.action(PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX, async (ctx) => {
  botServ.paymentByBankCardScreenOfForex(ctx);
});

bot.action(CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX, async (ctx) => {
  botServ.confirmPaymentByCryptoScreenOfForex(ctx);
  botServ.createTicket(ctx, {
    plan: 'Forex',
    paymentMethod: 'Crypto',
    status: 'Pending',
  });
});

bot.action(CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_FOREX, async (ctx) => {
  botServ.confirmPaymentByScrillScreenOfForex(ctx);
  botServ.createTicket(ctx, {
    plan: 'Forex',
    paymentMethod: 'Scrill',
    status: 'Pending',
  });
});

bot.action(CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_FOREX, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfForex(ctx);
  botServ.createTicket(ctx, {
    plan: 'Forex',
    paymentMethod: 'SWIFT',
    status: 'Pending',
  });
});

bot.action(CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX, async (ctx) => {
  botServ.confirmPaymentByBankCardScreenOfForex(ctx);
  botServ.createTicket(ctx, {
    plan: 'Forex',
    paymentMethod: 'BankCard',
    status: 'Pending',
  });
});
bot.action(PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.paymentByCryptoScreenOfCrypto(ctx);
});

bot.action(PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.paymentByScrillScreenOfCrypto(ctx);
});

bot.action(PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.paymentBySwiftScreenOfCrypto(ctx);
});

bot.action(PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.paymentByBankCardScreenOfCrypto(ctx);
});

bot.action(CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.confirmPaymentByCryptoScreenOfCrypto(ctx);
  botServ.createTicket(ctx, {
    plan: 'Crypto',
    paymentMethod: 'Crypto',
    status: 'Pending',
  });
});

bot.action(CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.confirmPaymentByScrillScreenOfCrypto(ctx);
  botServ.createTicket(ctx, {
    plan: 'Crypto',
    paymentMethod: 'Scrill',
    status: 'Pending',
  });
});

bot.action(CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfCrypto(ctx);
  botServ.createTicket(ctx, {
    plan: 'Crypto',
    paymentMethod: 'SWIFT',
    status: 'Pending',
  });
});

bot.action(CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.confirmPaymentByBankCardScreenOfCrypto(ctx);
  botServ.createTicket(ctx, {
    plan: 'Crypto',
    paymentMethod: 'BankCard',
    status: 'Pending',
  });
});

bot.action(PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.paymentByCryptoOfCopySignals(ctx);
});

bot.action(PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.paymentByScrillOfCopySignals(ctx);
});

bot.action(PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.paymentBySwiftOfCopySignals(ctx);
});

bot.action(PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.paymentByBankCardOfCopySignals(ctx);
});

bot.action(CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.confirmPaymentByCryptoScreenOfCopySignals(ctx);
  botServ.createTicket(ctx, {
    plan: 'CopySignals',
    paymentMethod: 'Crypto',
    status: 'Pending',
  });
});

bot.action(CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.confirmPaymentByScillScreenOfCopySignals(ctx);
  botServ.createTicket(ctx, {
    plan: 'CopySignals',
    paymentMethod: 'Scrill',
    status: 'Pending',
  });
});

bot.action(CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfCopySignals(ctx);
  botServ.createTicket(ctx, {
    plan: 'CopySignals',
    paymentMethod: 'SWIFT',
    status: 'Pending',
  });
});

bot.action(CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfCopySignals(ctx);
  botServ.createTicket(ctx, {
    plan: 'CopySignals',
    paymentMethod: 'BankCard',
    status: 'Pending',
  });
});

console.log('Bot started');

bot.launch();
