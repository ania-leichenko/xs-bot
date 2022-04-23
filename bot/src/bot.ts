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
  MESSAGE_FROM_BOT_TO_USER,
} from '~/common/enums/enums';
import { knexConfig } from '../knexfile';
import { botServ } from './services/services';

const token = '5245583761:AAGViUQUROPfgNNSNLLRXK4_GPQ9nUZ3nVw';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
AbstractModel.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

const bot = new Telegraf(token);

bot.start((ctx) => {
  botServ.startBot(ctx);
  botServ.startScreen(ctx);
});

bot.on('message', (ctx) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  botServ.userMessage(ctx);
  ctx.reply(MESSAGE_FROM_BOT_TO_USER);
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
});

bot.action(CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_FOREX, async (ctx) => {
  botServ.confirmPaymentByScrillScreenOfForex(ctx);
});

bot.action(CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_FOREX, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfForex(ctx);
});

bot.action(CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX, async (ctx) => {
  botServ.confirmPaymentByBankCardScreenOfForex(ctx);
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
});

bot.action(CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.confirmPaymentByScrillScreenOfCrypto(ctx);
});

bot.action(CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfCrypto(ctx);
});

bot.action(CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO, async (ctx) => {
  botServ.confirmPaymentByBankCardScreenOfCrypto(ctx);
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
});

bot.action(CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.confirmPaymentByScillScreenOfCopySignals(ctx);
});

bot.action(CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfCopySignals(ctx);
});

bot.action(CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS, async (ctx) => {
  botServ.confirmPaymentBySwiftScreenOfCopySignals(ctx);
});

console.log('Bot started');

bot.launch();
