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

bot.action('btn_1', async (ctx) => {
  try {
    ctx.replyWithHTML(
      `<b>Forex — 99$/month & 999$/lifetime</b>

Get signals with a return of more than 95%. Signals for the forex market, gold and indices. During the day, 5-10 signals come, and the stop loss does not exceed the profit. The most successful signals for gold, more than 1000 pips per month. In just a month, the goal of 3000 points will always be reached.`,
      Markup.inlineKeyboard([
        [Markup.button.callback('Crypto', 'btn_4')],
        [Markup.button.callback('Scrill', 'btn_5')],
        [Markup.button.callback('SWIFT', 'btn_6')],
        [
          Markup.button.callback(
            'Bank card (Credit & Debit / Visa & MC)',
            'btn_7',
          ),
        ],
        [Markup.button.callback('🔙 Back', 'btn_8')],
      ]),
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action('btn_2', async (ctx) => {
  try {
    ctx.replyWithHTML(
      `<b>Frequently asked questions:</b>

❓ Can I be sure of the authenticity of Premium Signals? Can I get free access for one day to try them out?
✅ All free signals are updated daily in the free channel. You can test free signals at any time.

❓ I want to get a test signal to make sure they work.
✅ Follow a free channel that provides free signals daily.

❓ I have no experience in this area, can I start trading with your signals?
✅ We provide access signals to save you time on learning all the nuances. Experts are always in touch and are ready to provide detailed instructions for opening trades based on signals. For any questions, you can contact the administrator in the chat.

❓ What should I do if I fail to open trades?
✅ All our instructions and training are directly aimed at your guaranteed result, and you can always contact the administrator for any questions.

If you have any questions, please contact the administrator ?@bestsignalsadmin (Due to the extensive amount of work, the administrator's response may take some time.)`,
      Markup.inlineKeyboard([[Markup.button.callback('🔙 Back', 'btn_8')]]),
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action('btn_3', async (ctx) => {
  try {
    ctx.replyWithHTML(
      '<b>Personal Area</b>',
      Markup.inlineKeyboard([[Markup.button.callback('🔙 Back', 'btn_8')]]),
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action('btn_4', async (ctx) => {
  try {
    ctx.replyWithHTML(
      `<b>Crypto</b>

Wallet: USDT
Address: TPXqExfPbXBWjum98PsHuJ916b9EkQKPN2
Network: TRC20

Wallet: BTC
Address: 0x520a98177b6e6cb286c3fc1b19a719daea2b6cf2
Network: Binance Smart Chain

Wallet: BTC
Address: 14R9wSycdWe4GTPVy3qG4d2ih8MZH9W4et
Network: Bitcoin

Wallet: BTC
Address: bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23
Network: Binance Chain (BEP2)
MEMO: 364451047

Binance pay
ID: 383468420
Name: Jexly
No fee.

‼️ Send an amount over 2% than the subscription amount, otherwise the commission will not be covered and the system will not count the payment ‼️`,
      Markup.inlineKeyboard([
        [Markup.button.callback('💲 Confirm payment', 'btn_9')],
        [Markup.button.callback('🔙 Back', 'btn_8')],
      ]),
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action('btn_9', async (ctx) => {
  try {
    ctx.replyWithHTML(
      `‼️ Send payment confirmation in chat. This can be a transaction number, ID, screenshot or video. But first, make sure that you have a telegram nickname, otherwise the system will not be able to give you a subscription. ‼️

Until you respond to this message in this chat, we will not receive payment from you and the system will not be able to process the payment!`,
      Markup.inlineKeyboard([[Markup.button.callback('🔙 Back', 'btn_8')]]),
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action('btn_5', async (ctx) => {
  try {
    ctx.replyWithHTML(
      `<b>Skrill</b>

Send to my mail -> sergeisemenovfx@gmail.com

‼️ Send an amount over 8% than the subscription amount, otherwise the commission will not be covered and the system will not count the payment ‼️`,
      Markup.inlineKeyboard([
        [Markup.button.callback('💲 Confirm payment', 'btn_9')],
        [Markup.button.callback('🔙 Back', 'btn_8')],
      ]),
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action('btn_6', async (ctx) => {
  try {
    ctx.replyWithHTML(
      `<b>SWIFT</b>

You can transfer funds to us using the swift method, but the minimum amount is $600 (payment for half a year in advance). It also depends on your bank and what fees it takes for the transfer. You may have to pay another 50-100 dollars for commissions.

To make a payment, contact the administrator @BestSignalsAdmin`,
      Markup.inlineKeyboard([
        [Markup.button.callback('💲 Confirm payment', 'btn_9')],
        [Markup.button.callback('🔙 Back', 'btn_8')],
      ]),
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action('btn_7', async (ctx) => {
  try {
    ctx.replyWithHTML(
      `<b>Bank card (Credit & Debit / Visa & MC)</b>

To make a payment, contact the administrator @BestSignalsAdmin`,
      Markup.inlineKeyboard([
        [Markup.button.callback('💲 Confirm payment', 'btn_9')],
        [Markup.button.callback('🔙 Back', 'btn_8')],
      ]),
    );
  } catch (e) {
    console.error(e);
  }
});

console.log('Bot started');

bot.launch();
