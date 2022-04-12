/* eslint-disable no-console */
import { Telegraf, Markup } from 'telegraf';
import Knex from 'knex';
import 'isomorphic-fetch';
import { user as userServ } from './services/services';
import { Model } from 'objection';
import { ENV } from '~/common/enums/enums';
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
    `In order to become a member of premium signals, you need to choose which subscription you need.Daily receipt of 5 to 10 signals!

By purchasing our signals, you get access to trading strategies that are a guaranteed guarantee of your success! If our signals do not bring you profit, we will return the funds!

Choose from the list below 👇`,
    Markup.inlineKeyboard([
      [Markup.button.callback('Forex — 99$/month & 999$/lifetime', 'btn_1')],
      [Markup.button.callback('FAQ', 'btn_2')],
      [Markup.button.callback('👤 Personal Area', 'btn_3')],
    ]),
  );
});

console.log('Bot started');

bot.launch();
