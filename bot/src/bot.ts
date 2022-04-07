import { Telegraf } from 'telegraf';

const token = '5245583761:AAGViUQUROPfgNNSNLLRXK4_GPQ9nUZ3nVw';

const bot = new Telegraf(token);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
bot.start((ctx: { reply: (arg0: string) => any }) => ctx.reply('Welcome'));

bot.launch();
