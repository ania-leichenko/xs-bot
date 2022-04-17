/* eslint-disable no-console */
import { Telegraf } from 'telegraf';
import Knex from 'knex';
import 'isomorphic-fetch';
import { Model } from 'objection';
import {
  ENV,
  FOREX_SCREEN,
  CRYPTO_SCREEN,
  FAQ_SCREEN,
  PERSONAL_AREA_SCREEN,
  START_SCREEN,
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
} from '~/common/enums/enums';
import { knexConfig } from '../knexfile';
import { botServ } from './services/services';

const token = '5245583761:AAGViUQUROPfgNNSNLLRXK4_GPQ9nUZ3nVw';
Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

const bot = new Telegraf(token);

bot.start((ctx) => {
  botServ.startBot(ctx);
  botServ.startScreen(ctx);
});

bot.on('message', (ctx) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  botServ.confirmPayment(ctx);
});

bot.action(FOREX_SCREEN, async (ctx) => {
  botServ.forexScreen(ctx);
});

bot.action(CRYPTO_SCREEN, async (ctx) => {
  botServ.cryptoScreen(ctx);
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
  botServ.confirmPayment(ctx);
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

console.log('Bot started');

bot.launch();
