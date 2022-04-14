/* eslint-disable no-console */
import { Telegraf, Markup } from 'telegraf';
import Knex from 'knex';
import 'isomorphic-fetch';
import { user as userServ } from './services/services';
import { Model } from 'objection';
import {
  ENV,
  START_TEXT,
  FOREX_TEXT,
  FAQ_TEXT,
  PERSONAL_AREA_TEXT,
  CRYPTO_TEXT,
  CRYPTO_BUTTON_TEXT,
  SCRILL_TEXT,
  SWIFT_TEXT,
  BANK_CARD_TEXT,
  CONFIRM_PAYMENT_TEXT,
  FOREX_TITLE,
  FAQ_TITLE,
  FAQ_BUTTON_TITLE,
  PERSONAL_AREA_TITLE,
  PERSONAL_AREA_BUTTON_TITLE,
  CRYPTO_TITLE,
  CRYPTO_BUTTON_TITLE,
  SCRILL_TITLE,
  SWIFT_TITLE,
  BANK_CARD_TITLE,
  CONFIRM_PAYMENT_TITLE,
  BACK,
} from '~/common/enums/enums';
import { knexConfig } from '../knexfile';

const token = '5245583761:AAGViUQUROPfgNNSNLLRXK4_GPQ9nUZ3nVw';
Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

const bot = new Telegraf(token);

bot.start(async (ctx) => {
  userServ.create({
    chat_id: ctx.from.id,
    first_name: ctx.from.first_name,
    username: 'string',
    admin: 0,
    joined: new Date(),
    last_action: new Date(),
  });

  ctx.replyWithHTML(
    START_TEXT,
    Markup.inlineKeyboard([
      [Markup.button.callback(FOREX_TITLE, 'btn_1')],
      [Markup.button.callback(CRYPTO_BUTTON_TITLE, 'btn_2')],
      [Markup.button.callback(FAQ_BUTTON_TITLE, 'btn_3')],
      [Markup.button.callback(PERSONAL_AREA_TITLE, 'btn_4')],
    ]),
  );
});

type Button = {
  id_btn: string;
  title?: string;
  text?: string;
};

const pressBtn = ({ id_btn, title, text }: Button): void => {
  bot.action(id_btn, async (ctx) => {
    ctx.deleteMessage();
    if (id_btn === 'btn_1' || id_btn === 'btn_2') {
      try {
        ctx.replyWithHTML(
          `<b>${title}</b>

${text}`,
          Markup.inlineKeyboard([
            [Markup.button.callback(CRYPTO_TITLE, 'btn_5')],
            [Markup.button.callback(SCRILL_TITLE, 'btn_6')],
            [Markup.button.callback(SWIFT_TITLE, 'btn_7')],
            [Markup.button.callback(BANK_CARD_TITLE, 'btn_8')],
            [Markup.button.callback(BACK, 'btn_9')],
          ]),
        );
      } catch (e) {
        console.error(e);
      }
    }
    if (id_btn === 'btn_3' || id_btn === 'btn_4') {
      try {
        ctx.replyWithHTML(
          `<b>${title}</b>

${text}`,
          Markup.inlineKeyboard([[Markup.button.callback(BACK, 'btn_9')]]),
        );
      } catch (e) {
        console.error(e);
      }
    }
    if (
      id_btn === 'btn_5' ||
      id_btn === 'btn_6' ||
      id_btn === 'btn_7' ||
      id_btn === 'btn_8'
    ) {
      try {
        ctx.replyWithHTML(
          `<b>${title}</b>

${text}`,
          Markup.inlineKeyboard([
            [Markup.button.callback(CONFIRM_PAYMENT_TITLE, 'btn_10')],
            [Markup.button.callback(BACK, 'btn_9')],
          ]),
        );
      } catch (e) {
        console.error(e);
      }
    }
    if (id_btn === 'btn_10') {
      try {
        ctx.replyWithHTML(
          `${text}`,
          Markup.inlineKeyboard([[Markup.button.callback(BACK, 'btn_9')]]),
        );
      } catch (e) {
        console.error(e);
      }
    }
  });
};

pressBtn({
  id_btn: 'btn_1',
  title: FOREX_TITLE,
  text: FOREX_TEXT,
});

pressBtn({
  id_btn: 'btn_2',
  title: CRYPTO_BUTTON_TITLE,
  text: CRYPTO_BUTTON_TEXT,
});

pressBtn({
  id_btn: 'btn_3',
  title: FAQ_TITLE,
  text: FAQ_TEXT,
});

pressBtn({
  id_btn: 'btn_4',
  title: PERSONAL_AREA_BUTTON_TITLE,
  text: PERSONAL_AREA_TEXT,
});

pressBtn({
  id_btn: 'btn_5',
  title: CRYPTO_TITLE,
  text: CRYPTO_TEXT,
});

pressBtn({
  id_btn: 'btn_6',
  title: SCRILL_TITLE,
  text: SCRILL_TEXT,
});

pressBtn({
  id_btn: 'btn_7',
  title: SWIFT_TITLE,
  text: SWIFT_TEXT,
});

pressBtn({
  id_btn: 'btn_8',
  title: BANK_CARD_TITLE,
  text: BANK_CARD_TEXT,
});

pressBtn({
  id_btn: 'btn_10',
  text: CONFIRM_PAYMENT_TEXT,
});

console.log('Bot started');

bot.launch();
