/* eslint-disable no-console */
import { Telegraf } from 'telegraf';
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
  console.log(ctx.message.entities);
  userServ.create({
    chat_id: ctx.from.id,
    first_name: ctx.from.first_name,
    username: 'string',
    admin: 0,
    joined: new Date(),
    last_action: new Date(),
  });
});

console.log('Bot started');

bot.launch();
