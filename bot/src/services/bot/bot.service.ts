/* eslint-disable no-console */
import { Context, Markup } from 'telegraf';
import { user as userServ } from '../services';
import {
  //ENV,
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
  FOREX_BUTTON_TITLE,
  FAQ_BUTTON_TITLE,
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

type Constructor = {
  userService: typeof userServ;
};

type TButton = {
  id: string;
  title: string;
};
type TButtons = Array<TButton>;

class BotServ {
  #userService: typeof userServ;

  constructor({ userService }: Constructor) {
    this.#userService = userService;
  }
  public async startBot(ctx: Context): Promise<void> {
    if (!ctx.from) {
      throw new Error('ctx.from is undefined');
    }
    const user = userServ.getUserById(ctx.from.id);
    if (!user) {
      userServ.create({
        chat_id: ctx.from.id,
        first_name: ctx.from.first_name,
        //TO DO:
        username: 'string',
        admin: 0,
        joined: new Date(),
        last_action: new Date(),
      });
    }
  }

  public async startScreen(ctx: Context): Promise<void> {
    this.renderScreen(ctx, {
      html: START_TEXT,
      buttons: [
        [{ title: FOREX_BUTTON_TITLE, id: FOREX_SCREEN }],
        [{ title: CRYPTO_BUTTON_TITLE, id: CRYPTO_SCREEN }],
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
}

export { BotServ };
