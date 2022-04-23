/* eslint-disable no-console */
import { Context, Markup } from 'telegraf';
import { user as userServ, userMessage as userMessageServ } from '../services';
import {
  START_TEXT,
  FOREX_TEXT,
  COPY_SIGNALS_TEXT,
  FAQ_TEXT,
  PERSONAL_AREA_TEXT,
  CRYPTO_TEXT,
  CRYPTO_BUTTON_TEXT,
  SCRILL_TEXT,
  SWIFT_TEXT,
  BANK_CARD_TEXT,
  CONFIRM_PAYMENT_TEXT,
  FOREX_BUTTON_TITLE,
  FAQ_BUTTON_TITLE,
  PERSONAL_AREA_BUTTON_TITLE,
  CRYPTO_TITLE,
  CRYPTO_BUTTON_TITLE,
  COPY_SIGNALS_TITLE,
  SCRILL_TITLE,
  SWIFT_TITLE,
  BANK_CARD_TITLE,
  CONFIRM_PAYMENT_TITLE,
  BACK,
  START_SCREEN,
  FOREX_SCREEN,
  CRYPTO_SCREEN,
  COPY_SIGNALS_SCREEN,
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
  PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS,
  PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS,
  PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS,
  PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
  CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS,
  CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS,
  CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS,
  CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
} from '~/common/enums/enums';

type Constructor = {
  userService: typeof userServ;
  userMessageService: typeof userMessageServ;
};

type TButton = {
  id: string;
  title: string;
};
type TButtons = Array<TButton>;

class BotServ {
  #userService: typeof userServ;
  #userMessageService: typeof userMessageServ;

  constructor({ userService, userMessageService }: Constructor) {
    this.#userService = userService;
    this.#userMessageService = userMessageService;
  }
  public async startBot(ctx: Context): Promise<void> {
    if (!ctx.from) {
      throw new Error('ctx.from is undefined');
    }
    const user = await userServ.getUserById(ctx.from.id);

    if (!user) {
      userServ.create({
        chatId: ctx.from.id,
        firstName: ctx.from.first_name,
        username: ctx.from.username,
        admin: 0,
        joined: new Date(),
        lastAction: new Date(),
      });
    }
  }

  public async userMessage(
    ctx: Context & { message?: { text?: string } },
  ): Promise<void> {
    if (!ctx.message) {
      throw new Error('ctx.message is undefined');
    }

    userMessageServ.create({
      chat_id: ctx.message.chat.id,
      text: ctx.message.text,
      date: new Date(ctx.message.date),
    });
  }

  public async startScreen(ctx: Context): Promise<void> {
    this.renderScreen(ctx, {
      html: START_TEXT,
      buttons: [
        [{ title: FOREX_BUTTON_TITLE, id: FOREX_SCREEN }],
        [{ title: CRYPTO_BUTTON_TITLE, id: CRYPTO_SCREEN }],
        [{ title: COPY_SIGNALS_TITLE, id: COPY_SIGNALS_SCREEN }],
        [{ title: FAQ_BUTTON_TITLE, id: FAQ_SCREEN }],
        [{ title: PERSONAL_AREA_BUTTON_TITLE, id: PERSONAL_AREA_SCREEN }],
      ],
    });
  }

  public renderScreen(
    ctx: Context,
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

  public async forexScreen(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${FOREX_TEXT}`,
        buttons: [
          [{ title: CRYPTO_TITLE, id: PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX }],
          [{ title: SCRILL_TITLE, id: PAYMENT_BY_SCRILL_SCREEN_OF_FOREX }],
          [{ title: SWIFT_TITLE, id: PAYMENT_BY_SWIFT_SCREEN_OF_FOREX }],
          [
            {
              title: BANK_CARD_TITLE,
              id: PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX,
            },
          ],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async cryptoScreen(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CRYPTO_BUTTON_TEXT}`,
        buttons: [
          [{ title: CRYPTO_TITLE, id: PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO }],
          [{ title: SCRILL_TITLE, id: PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO }],
          [{ title: SWIFT_TITLE, id: PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO }],
          [
            {
              title: BANK_CARD_TITLE,
              id: PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO,
            },
          ],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async copySignalsScreen(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${COPY_SIGNALS_TEXT}`,
        buttons: [
          [
            {
              title: CRYPTO_TITLE,
              id: PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [
            {
              title: SCRILL_TITLE,
              id: PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [{ title: SWIFT_TITLE, id: PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS }],
          [
            {
              title: BANK_CARD_TITLE,
              id: PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [{ title: BACK, id: START_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async faqScreen(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${FAQ_TEXT}`,
        buttons: [[{ title: BACK, id: START_SCREEN }]],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async personalAreaScreen(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${PERSONAL_AREA_TEXT}`,
        buttons: [[{ title: BACK, id: START_SCREEN }]],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async mainScreen(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.startScreen(ctx);
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByCryptoScreenOfForex(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CRYPTO_TEXT}`,
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
  }

  public async paymentByScrillScreenOfForex(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${SCRILL_TEXT}`,
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
  }

  public async paymentBySwiftScreenOfForex(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${SWIFT_TEXT}`,
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
  }

  public async paymentByBankCardScreenOfForex(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${BANK_CARD_TEXT}`,
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
  }

  public async confirmPaymentByCryptoScreenOfForex(
    ctx: Context,
  ): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [[{ title: BACK, id: PAYMENT_BY_CRYPTO_SCREEN_OF_FOREX }]],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByScrillScreenOfForex(
    ctx: Context,
  ): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [[{ title: BACK, id: PAYMENT_BY_SCRILL_SCREEN_OF_FOREX }]],
      });
    } catch (e) {
      console.error(e);
    }
  }
  public async confirmPaymentBySwiftScreenOfForex(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [[{ title: BACK, id: PAYMENT_BY_SWIFT_SCREEN_OF_FOREX }]],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByBankCardScreenOfForex(
    ctx: Context,
  ): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [[{ title: BACK, id: PAYMENT_BY_BANK_CARD_SCREEN_OF_FOREX }]],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByCryptoScreenOfCrypto(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CRYPTO_TEXT}`,
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
  }

  public async paymentByScrillScreenOfCrypto(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${SCRILL_TEXT}`,
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
  }

  public async paymentBySwiftScreenOfCrypto(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${SWIFT_TEXT}`,
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
  }

  public async paymentByBankCardScreenOfCrypto(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${BANK_CARD_TEXT}`,
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
  }

  public async confirmPaymentByCryptoScreenOfCrypto(
    ctx: Context,
  ): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [[{ title: BACK, id: PAYMENT_BY_CRYPTO_SCREEN_OF_CRYPTO }]],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByScrillScreenOfCrypto(
    ctx: Context,
  ): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [[{ title: BACK, id: PAYMENT_BY_SCRILL_SCREEN_OF_CRYPTO }]],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentBySwiftScreenOfCrypto(
    ctx: Context,
  ): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [[{ title: BACK, id: PAYMENT_BY_SWIFT_SCREEN_OF_CRYPTO }]],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByBankCardScreenOfCrypto(
    ctx: Context,
  ): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [[{ title: BACK, id: PAYMENT_BY_BANK_CARD_SCREEN_OF_CRYPTO }]],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByCryptoOfCopySignals(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CRYPTO_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [{ title: BACK, id: COPY_SIGNALS_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByScrillOfCopySignals(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${SCRILL_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [{ title: BACK, id: COPY_SIGNALS_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentBySwiftOfCopySignals(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${SWIFT_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [{ title: BACK, id: COPY_SIGNALS_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async paymentByBankCardOfCopySignals(ctx: Context): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${BANK_CARD_TEXT}`,
        buttons: [
          [
            {
              title: CONFIRM_PAYMENT_TITLE,
              id: CONFIRM_PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS,
            },
          ],
          [{ title: BACK, id: COPY_SIGNALS_SCREEN }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByCryptoScreenOfCopySignals(
    ctx: Context,
  ): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: BACK, id: PAYMENT_BY_CRYPTO_SCREEN_OF_COPY_SIGNALS }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByScillScreenOfCopySignals(
    ctx: Context,
  ): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [
            {
              title: BACK,
              id: PAYMENT_BY_SCRILL_SCREEN_OF_COPY_SIGNALS,
            },
          ],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentBySwiftScreenOfCopySignals(
    ctx: Context,
  ): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: BACK, id: PAYMENT_BY_SWIFT_SCREEN_OF_COPY_SIGNALS }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async confirmPaymentByBankCardScreenOfCopySignals(
    ctx: Context,
  ): Promise<void> {
    try {
      ctx.deleteMessage();
      this.renderScreen(ctx, {
        html: `${CONFIRM_PAYMENT_TEXT}`,
        buttons: [
          [{ title: BACK, id: PAYMENT_BY_BANK_CARD_SCREEN_OF_COPY_SIGNALS }],
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export { BotServ };
