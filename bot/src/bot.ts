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
  paidList as paidListServ,
  channelMessage as channelMessageServ,
} from './services/services';
import { PaidList as PaidListEntity } from '~/services/paid-list/paid-list.entity';

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
  const channel = await botServ.getChannel(ctx);
  const users = await paidListServ.getUserByChannelPlan(channel.plan);
  users.map((user: PaidListEntity) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    bot.telegram.sendMessage(user.chatId, ctx.channelPost.text);
  });
  channelMessageServ.create({
    channelId: ctx.channelPost.chat.id,
    messageId: ctx.channelPost.message_id,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    message: ctx.channelPost.text,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

bot.on('edited_channel_post', async (ctx) => {
  channelMessageServ.update({
    messageId: ctx.editedChannelPost.message_id,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    message: ctx.editedChannelPost.text,
    updatedAt: new Date(),
  });
});

bot.action(FOREX_SCREEN, async (ctx) => {
  botServ.forexScreen(ctx);
});

bot.action(CRYPTO_SCREEN, async (ctx) => {
  botServ.cryptoScreen(ctx);
});

bot.action(COPY_SIGNALS_SCREEN, async (ctx) => {
  botServ.copySignalsScreen(ctx);
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
