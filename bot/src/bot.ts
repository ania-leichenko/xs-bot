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
  FOREX_BUTTON_TITLE,
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
  START_SCREEN,
  FOREX_SCREEN,
  CRYPTO_SCREEN,
  FAQ_SCREEN,
  PERSONAL_AREA_SCREEN,
  PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX,
  PAYMENT_BY_SCRILL_SCREEN_OF_FOREX,
  PAYMENT_BY_SWIFT_SCREEN_OF_FOREX,
  PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX,
  PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO,
  PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO,
  PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO,
  PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO,
  CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX,
  CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_FOREX,
  CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_FOREX,
  CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX,
  CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO,
  CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO,
  CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO,
  CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO,
} from '~/common/enums/enums';
import { knexConfig } from '../knexfile';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

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

  startScreen(ctx);
});

type TButton = {
  id: string;
  title: string;
};
type TButtons = Array<TButton>;

function startScreen(ctx: {
  replyWithHTML: (
    arg0: string,
    arg1: Markup.Markup<InlineKeyboardMarkup>,
  ) => void;
}): void {
  renderScreen(ctx, {
    html: START_TEXT,
    buttons: [
      [{ title: FOREX_BUTTON_TITLE, id: FOREX_SCREEN }],
      [{ title: CRYPTO_BUTTON_TITLE, id: CRYPTO_SCREEN }],
      [{ title: FAQ_BUTTON_TITLE, id: FAQ_SCREEN }],
      [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
    ],
  });
}

function renderScreen(
  ctx: {
    replyWithHTML: (
      arg0: string,
      arg1: Markup.Markup<InlineKeyboardMarkup>,
    ) => void;
  },
  options: {
    html: string;
    buttons: TButtons[];
  },
): void {
  ctx.replyWithHTML(
    options.html,
    Markup.inlineKeyboard(
      options.buttons.map((arr) => {
        return arr.map((button) =>
          Markup.button.callback(button.title, button.id),
        );
      }),
    ),
  );
}

bot.action(FOREX_SCREEN, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${FOREX_TITLE}</b>

${FOREX_TEXT}`,
      buttons: [
        [{ title: CRYPTO_TITLE, id: PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX }],
        [{ title: SCRILL_TITLE, id: PAYMENT_BY_SCRILL_SCREEN_OF_FOREX }],
        [{ title: SWIFT_TITLE, id: PAYMENT_BY_SWIFT_SCREEN_OF_FOREX }],
        [{ title: BANK_CARD_TITLE, id: PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX }],
        [{ title: BACK, id: START_SCREEN }],
      ],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(CRYPTO_SCREEN, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${CRYPTO_TITLE}</b>

${CRYPTO_BUTTON_TEXT}`,
      buttons: [
        [{ title: CRYPTO_TITLE, id: PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO }],
        [{ title: SCRILL_TITLE, id: PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO }],
        [{ title: SWIFT_TITLE, id: PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO }],
        [{ title: BANK_CARD_TITLE, id: PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO }],
        [{ title: BACK, id: START_SCREEN }],
      ],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(FAQ_SCREEN, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${FAQ_TITLE}</b>${FAQ_TEXT}`,
      buttons: [[{ title: BACK, id: START_SCREEN }]],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(PERSONAL_AREA_SCREEN, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${PERSONAL_AREA_TITLE}</b>${PERSONAL_AREA_TEXT}`,
      buttons: [[{ title: BACK, id: START_SCREEN }]],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(START_SCREEN, async (ctx) => {
  try {
    ctx.deleteMessage();
    startScreen(ctx);
  } catch (e) {
    console.error(e);
  }
});

bot.action(PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${CRYPTO_TITLE}</b>

${CRYPTO_TEXT}`,
      buttons: [
        [
          {
            title: CONFIRM_PAYMENT_TITLE,
            id: CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX,
          },
        ],
        [{ title: BACK, id: FOREX_SCREEN }],
      ],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(PAYMENT_BY_SCRILL_SCREEN_OF_FOREX, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${SCRILL_TITLE}</b>

${SCRILL_TEXT}`,
      buttons: [
        [
          {
            title: CONFIRM_PAYMENT_TITLE,
            id: CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_FOREX,
          },
        ],
        [{ title: BACK, id: FOREX_SCREEN }],
      ],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(PAYMENT_BY_SWIFT_SCREEN_OF_FOREX, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${SWIFT_TITLE}</b>

${SWIFT_TEXT}`,
      buttons: [
        [
          {
            title: CONFIRM_PAYMENT_TITLE,
            id: CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_FOREX,
          },
        ],
        [{ title: BACK, id: FOREX_SCREEN }],
      ],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${BANK_CARD_TITLE}</b>

${BANK_CARD_TEXT}`,
      buttons: [
        [
          {
            title: CONFIRM_PAYMENT_TITLE,
            id: CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX,
          },
        ],
        [{ title: BACK, id: FOREX_SCREEN }],
      ],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${BANK_CARD_TITLE}</b>

${BANK_CARD_TEXT}`,
      buttons: [
        [
          {
            title: CONFIRM_PAYMENT_TITLE,
            id: CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX,
          },
        ],
        [{ title: BACK, id: FOREX_SCREEN }],
      ],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${CONFIRM_PAYMENT_TITLE}</b>

${CONFIRM_PAYMENT_TEXT}`,
      buttons: [[{ title: BACK, id: PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX }]],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_FOREX, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${CONFIRM_PAYMENT_TITLE}</b>

${CONFIRM_PAYMENT_TEXT}`,
      buttons: [[{ title: BACK, id: PAYMENT_BY_SCRILL_SCREEN_OF_FOREX }]],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_FOREX, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${CONFIRM_PAYMENT_TITLE}</b>

${CONFIRM_PAYMENT_TEXT}`,
      buttons: [[{ title: BACK, id: PAYMENT_BY_SWIFT_SCREEN_OF_FOREX }]],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${CONFIRM_PAYMENT_TITLE}</b>

${CONFIRM_PAYMENT_TEXT}`,
      buttons: [[{ title: BACK, id: PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX }]],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${CRYPTO_TITLE}</b>

${CRYPTO_TEXT}`,
      buttons: [
        [
          {
            title: CONFIRM_PAYMENT_TITLE,
            id: CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO,
          },
        ],
        [{ title: BACK, id: CRYPTO_SCREEN }],
      ],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${SCRILL_TITLE}</b>

${SCRILL_TEXT}`,
      buttons: [
        [
          {
            title: CONFIRM_PAYMENT_TITLE,
            id: CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO,
          },
        ],
        [{ title: BACK, id: CRYPTO_SCREEN }],
      ],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${SWIFT_TITLE}</b>

${SWIFT_TEXT}`,
      buttons: [
        [
          {
            title: CONFIRM_PAYMENT_TITLE,
            id: CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO,
          },
        ],
        [{ title: BACK, id: CRYPTO_SCREEN }],
      ],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${BANK_CARD_TITLE}</b>

${BANK_CARD_TEXT}`,
      buttons: [
        [
          {
            title: CONFIRM_PAYMENT_TITLE,
            id: CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO,
          },
        ],
        [{ title: BACK, id: CRYPTO_SCREEN }],
      ],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${CONFIRM_PAYMENT_TITLE}</b>

${CONFIRM_PAYMENT_TEXT}`,
      buttons: [[{ title: BACK, id: PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO }]],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${CONFIRM_PAYMENT_TITLE}</b>

${CONFIRM_PAYMENT_TEXT}`,
      buttons: [[{ title: BACK, id: PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO }]],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${CONFIRM_PAYMENT_TITLE}</b>

${CONFIRM_PAYMENT_TEXT}`,
      buttons: [[{ title: BACK, id: PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO }]],
    });
  } catch (e) {
    console.error(e);
  }
});

bot.action(CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO, async (ctx) => {
  try {
    ctx.deleteMessage();
    renderScreen(ctx, {
      html: `<b>${CONFIRM_PAYMENT_TITLE}</b>

${CONFIRM_PAYMENT_TEXT}`,
      buttons: [[{ title: BACK, id: PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO }]],
    });
  } catch (e) {
    console.error(e);
  }
});

console.log('Bot started');

bot.launch();
